import React from 'react';
import { View, ImageBackground, ActivityIndicator, Text } from 'react-native';
import { styles } from '../styles/styles';

interface LoadingInterface {
  text?: any;
}

export default function Loading(loading: LoadingInterface) {
  return (
    <ImageBackground
      source={require('../assets/background-light.png')}
      style={styles.background}
    >
      <View style={styles.appContainer}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.forecastText}>{loading.text}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}
