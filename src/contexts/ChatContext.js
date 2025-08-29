import React, { createContext, useContext, useState, useEffect } from 'react';
import { getWebhookUrl, makeSecureRequest } from '../config/env';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState(() => {
    // Load chats from localStorage or create initial chat
    const savedChats = localStorage.getItem('roast16z_chats');
    if (savedChats) {
      try {
        const parsedChats = JSON.parse(savedChats);
        // Convert timestamp strings back to Date objects
        return parsedChats.map(chat => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          updatedAt: new Date(chat.updatedAt),
          messages: chat.messages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
      } catch (error) {
        console.error('Error parsing saved chats:', error);
      }
    }
    
    // Create initial chat if no saved chats
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const initialChatId = `${timestamp}-${random}`;
    
    return [{
      id: initialChatId,
      title: 'New conversation',
      messages: [
        {
          id: `${timestamp}-${random}-msg`,
          text: "✨ Welcome to your personal Roast16z Assistant ✨ \nI'm here to help you explore token details with ease.\nSimply share a contract address to get started. What token are you curious about today?",
          sender: 'ai',
          timestamp: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }];
  });
  
  const [currentChatId, setCurrentChatId] = useState(() => {
    // Load current chat ID from localStorage
    const savedCurrentChatId = localStorage.getItem('roast16z_current_chat_id');
    if (savedCurrentChatId) {
      return savedCurrentChatId;
    }
    return '';
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('roast16z_chats', JSON.stringify(chats));
  }, [chats]);

  // Save current chat ID to localStorage whenever it changes
  useEffect(() => {
    if (currentChatId) {
      localStorage.setItem('roast16z_current_chat_id', currentChatId);
    }
  }, [currentChatId]);

  // Set initial chat ID when component mounts
  useEffect(() => {
    if (chats.length > 0 && !currentChatId) {
      setCurrentChatId(chats[0].id);
    }
  }, [chats, currentChatId]);

  const currentChat = chats.find(chat => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  const addMessage = (text, sender = 'user') => {
    // Generate unique message ID
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const messageId = `${timestamp}-${random}`;
    
    const newMessage = {
      id: messageId,
      text,
      sender,
      timestamp: new Date()
    };
    
    setChats(prev => prev.map(chat => 
      chat.id === currentChatId 
        ? {
            ...chat,
            messages: [...chat.messages, newMessage],
            updatedAt: new Date(),
            title: chat.title === 'New conversation' && sender === 'user' 
              ? text.slice(0, 30) + (text.length > 30 ? '...' : '')
              : chat.title
          }
        : chat
    ));
  };

  const sendMessage = async (text) => {
    // Add user message
    addMessage(text, 'user');
    
    // Show loading
    setIsLoading(true);

    try {
      // Call webhook with chat ID and user message
      const webhookUrl = getWebhookUrl();
      
      const webhookData = {
        chatId: currentChatId,
        message: text,
        timestamp: new Date().toISOString(),
        type: 'user_message'
      };
      
      console.log('🔍 Current chat ID being sent:', currentChatId);
      console.log('🔍 Webhook data being sent:', webhookData);
      
      const response = await makeSecureRequest(webhookUrl, {
        body: JSON.stringify(webhookData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Webhook response:', data);
        
        // Display whatever the webhook returns
        if (data && typeof data === 'object') {
          let message = '';
          
          // Handle array response (like [{"text": "message"}])
          if (Array.isArray(data) && data.length > 0) {
            const firstItem = data[0];
            if (firstItem && typeof firstItem === 'object') {
              // Handle your specific webhook response format
              if (firstItem.originalMessage && firstItem.found !== undefined) {
                // This is your webhook response format
                if (firstItem.found) {
                  if (firstItem.extractedAddresses && firstItem.extractedAddresses.length > 0) {
                    const address = firstItem.extractedAddresses[0];
                    if (address.great) {
                      message = `✅ Great! I found a valid address: ${address.address}`;
                    } else {
                      message = `✅ I found an address: ${address.address}`;
                    }
                  } else {
                    message = `✅ I found something in your message: "${firstItem.originalMessage}"`;
                  }
                } else {
                  message = `❌ I couldn't find what you're looking for in: "${firstItem.originalMessage}"`;
                }
              } else if (firstItem.output) {
                // Handle new response format with output field
                try {
                  const outputData = JSON.parse(firstItem.output);
                  if (outputData.message) {
                    message = outputData.message;
                  } else {
                    message = firstItem.output;
                  }
                } catch (parseError) {
                  // If JSON parsing fails, use the output as-is
                  message = firstItem.output;
                }
              } else {
                // Fallback to other common fields
                message = firstItem.text || firstItem.message || firstItem.response || firstItem.content || firstItem.originalMessage || JSON.stringify(firstItem);
              }
            } else {
              message = firstItem.toString();
            }
          } else {
            // Handle regular object response
            message = data.response || data.message || data.text || data.content || data.ai_message || data.reply || JSON.stringify(data);
          }
          
          addMessage(message, 'ai');
        } else if (data) {
          // If it's a string or other type, use it directly
          addMessage(data.toString(), 'ai');
        } else {
          addMessage("I've received your message and I'm processing it. How can I help you further?", 'ai');
        }
      } else {
        addMessage("I'm having trouble connecting right now. Please try again in a moment.", 'ai');
      }
    } catch (error) {
      console.error('Webhook error:', error);
      // Fallback response if webhook throws error
      addMessage("I encountered an error while processing your request. Please try again.", 'ai');
    } finally {
      setIsLoading(false);
    }
  };

  const createNewChat = async () => {
    // Generate a more robust chat ID using timestamp + random number
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const newChatId = `${timestamp}-${random}`;
    
    const newChat = {
      id: newChatId,
      title: 'New conversation',
      messages: [
        {
          id: `${timestamp}-${random}-msg`,
          text: "✨ Welcome to your personal Roast16z Assistant ✨ \nI'm here to help you explore token details with ease. \nSimply share a contract address to get started. What token are you curious about today?",
          sender: 'ai',
          timestamp: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChatId);

    // Notify webhook about new chat session
    try {
      const webhookUrl = getWebhookUrl();
      
      await makeSecureRequest(webhookUrl, {
        body: JSON.stringify({
          chatId: newChatId,
          type: 'new_chat',
          timestamp: new Date().toISOString(),
          message: 'New chat session started'
        })
      });
    } catch (error) {
      console.error('Failed to notify webhook about new chat:', error);
    }
  };

  const switchChat = (chatId) => {
    setCurrentChatId(chatId);
    
    // Send chat context to webhook when switching
    const currentChat = chats.find(chat => chat.id === chatId);
    if (currentChat && currentChat.messages.length > 1) {
      const webhookUrl = getWebhookUrl();
      
      // Use secure request with proper error handling
      makeSecureRequest(webhookUrl, {
        body: JSON.stringify({
          chatId: chatId,
          type: 'chat_context',
          timestamp: new Date().toISOString(),
          messageCount: currentChat.messages.length,
          lastMessage: currentChat.messages[currentChat.messages.length - 1]?.text || ''
        })
      })
      .catch(error => {
        console.error('Failed to send chat context to webhook:', error);
      });
    }
  };

  const deleteChat = (chatId) => {
    setChats(prev => {
      const newChats = prev.filter(chat => chat.id !== chatId);
      // Update localStorage
      localStorage.setItem('roast16z_chats', JSON.stringify(newChats));
      return newChats;
    });
    
    if (currentChatId === chatId && chats.length > 1) {
      setCurrentChatId(chats[0].id);
    }
  };

  const clearAllChats = () => {
    setChats([]);
    setCurrentChatId('');
    localStorage.removeItem('roast16z_chats');
    localStorage.removeItem('roast16z_current_chat_id');
  };

  const renameChat = (chatId, newTitle) => {
    setChats(prev => prev.map(chat =>
      chat.id === chatId
        ? { ...chat, title: newTitle, updatedAt: new Date() }
        : chat
    ));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };



  return (
    <ChatContext.Provider value={{
      chats,
      currentChatId,
      messages,
      isLoading,
      sidebarOpen,
      addMessage,
      sendMessage,
      createNewChat,
      switchChat,
      renameChat,
      deleteChat,
      clearAllChats,
      toggleSidebar,
      setSidebarOpen
    }}>
      {children}
    </ChatContext.Provider>
  );
};

