import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubscriptionContext = createContext();

const SUBSCRIPTION_KEY = 'isSubscribed';

export const SubscriptionProvider = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    try {
      const value = await AsyncStorage.getItem(SUBSCRIPTION_KEY);
      setIsSubscribed(value === 'true');
    } catch (error) {
      console.error('Error checking subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribe = async () => {
    try {
      await AsyncStorage.setItem(SUBSCRIPTION_KEY, 'true');
      setIsSubscribed(true);
    } catch (error) {
      console.error('Error saving subscription:', error);
    }
  };

  const resetSubscription = async () => {
    try {
      await AsyncStorage.removeItem(SUBSCRIPTION_KEY);
      setIsSubscribed(false);
    } catch (error) {
      console.error('Error resetting subscription:', error);
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        isSubscribed,
        isLoading,
        subscribe,
        resetSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};
