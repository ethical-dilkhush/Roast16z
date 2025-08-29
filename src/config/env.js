// Environment Configuration
export const config = {
  // Webhook Configuration
  webhookUrl: process.env.REACT_APP_WEBHOOK_URL,
  
  // API Configuration
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || '',
  apiKey: process.env.REACT_APP_API_KEY || '',
  
  // App Configuration
  appName: process.env.REACT_APP_NAME || 'Roast16z',
  appVersion: process.env.REACT_APP_VERSION || '1.0.0',
  
  // Development Settings
  debug: process.env.REACT_APP_DEBUG === 'true',
  
  // Default fetch options for API calls
  defaultFetchOptions: {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // Add CORS headers if needed
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    mode: 'cors',
  }
};

// Utility function to get webhook URL with validation
export const getWebhookUrl = () => {
  const url = config.webhookUrl;
  if (!url) {
    console.error('🚨 CRITICAL: Webhook URL not configured! Please set REACT_APP_WEBHOOK_URL in your .env file');
    throw new Error('Webhook URL is required but not configured. Please set REACT_APP_WEBHOOK_URL environment variable.');
  }
  return url;
};

// Utility function to make secure API calls
export const makeSecureRequest = async (url, options = {}) => {
  const mergedOptions = {
    ...config.defaultFetchOptions,
    ...options,
    headers: {
      ...config.defaultFetchOptions.headers,
      ...options.headers,
    }
  };

  try {
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response;
  } catch (error) {
    console.error('🚨 API Request failed:', error);
    throw error;
  }
};

// Validate critical configuration on load
if (!config.webhookUrl) {
  console.error('🚨 CRITICAL ERROR: Webhook URL is not configured!');
  console.error('📋 To fix this:');
  console.error('1. Create a .env file in your project root');
  console.error('2. Add: REACT_APP_WEBHOOK_URL=your_actual_webhook_url');
  console.error('3. Restart the development server');
}
