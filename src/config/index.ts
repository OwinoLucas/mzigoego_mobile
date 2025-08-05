// Centralized configuration using environment variables

export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || 'https://mzigoego.com/api',
    timeout: 30000, // 30 seconds
  },

  // App Information
  app: {
    name: process.env.EXPO_PUBLIC_APP_NAME || 'MzigoEgo',
    version: process.env.EXPO_PUBLIC_APP_VERSION || '1.0.0',
    scheme: process.env.EXPO_PUBLIC_APP_SCHEME || 'mzigoego',
    bundleId: {
      ios: process.env.EXPO_PUBLIC_IOS_BUNDLE_ID || 'com.mzigoego.mobile',
      android: process.env.EXPO_PUBLIC_ANDROID_PACKAGE || 'com.mzigoego.mobile',
    },
  },

  // Authentication
  auth: {
    tokenKeys: {
      access: process.env.EXPO_PUBLIC_AUTH_TOKEN_KEY || 'access_token',
      refresh: process.env.EXPO_PUBLIC_REFRESH_TOKEN_KEY || 'refresh_token',
    },
  },

  // Storage
  storage: {
    prefix: process.env.EXPO_PUBLIC_STORAGE_PREFIX || 'mzigoego_',
    cacheVersion: process.env.EXPO_PUBLIC_CACHE_VERSION || '1.0.0',
  },

  // Feature Flags
  features: {
    enableDevTools: process.env.EXPO_PUBLIC_ENABLE_DEV_TOOLS === 'true',
    enableAnalytics: process.env.EXPO_PUBLIC_ENABLE_ANALYTICS === 'true',
    enableCrashReporting: process.env.EXPO_PUBLIC_ENABLE_CRASH_REPORTING === 'true',
    enableNetworkLogs: process.env.EXPO_PUBLIC_ENABLE_NETWORK_LOGS === 'true',
  },

  // Development
  dev: {
    logLevel: process.env.EXPO_PUBLIC_LOG_LEVEL || 'debug',
    isDev: __DEV__,
  },

  // Third-party Services
  services: {
    googleMapsApiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
    pushNotificationKey: process.env.EXPO_PUBLIC_PUSH_NOTIFICATION_KEY,
    sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    analyticsKey: process.env.EXPO_PUBLIC_ANALYTICS_KEY,
    socketUrl: process.env.EXPO_PUBLIC_SOCKET_URL,
    socketPath: process.env.EXPO_PUBLIC_SOCKET_PATH || '/socket.io',
  },
} as const;

// Helper functions
export const isProduction = () => !__DEV__;
export const isDevelopment = () => __DEV__;

// Validation function to check required environment variables
export const validateConfig = () => {
  const requiredVars = [
    'EXPO_PUBLIC_API_BASE_URL',
  ];

  const missing = requiredVars.filter(varName => !process.env[varName]);

  if (missing.length > 0) {
    console.warn(
      `Missing environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }

  return missing.length === 0;
};

export default config;
