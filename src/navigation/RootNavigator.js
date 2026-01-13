import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useSubscription } from '../context/SubscriptionContext';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const RootNavigator = () => {
  const { isSubscribed, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366F1" />
      </View>
    );
  }

  return isSubscribed ? <MainStack /> : <AuthStack />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default RootNavigator;
