import React from 'react';
import { View, ImageBackground, ActivityIndicator, Text } from 'react-native';
import { styles } from '../styles/styles';
interface loadingInterface {
  text?: any;
}

export default function Loading(loadingInterface: loadingInterface) {
  return (
    <ImageBackground
      source={require('../assets/background-light.png')}
      style={styles.background}
    >
      <View style={styles.appContainer}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.forecastText}>{loadingInterface.text}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}
