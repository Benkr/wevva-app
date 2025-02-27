import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import Images from '../assets/index.js';
import LottieView from 'lottie-react-native';
import { styles } from '../styles/styles';
import { useApp } from '../AppContext';

export default function Day({ name, icon, headline, minTemp, maxTemp }) {
  const { measureSystem } = useApp();
  return (
    <View style={styles.forecastList}>
      <View style={styles.forecastListLeft}>
        {icon ? (
          <LottieView
            style={{ height: 50, width: 50, marginRight: 10 }}
            source={Images[icon]}
            autoPlay
            loop
          />
        ) : (
          <ActivityIndicator size="small" color="#fff" />
        )}
        <Text style={styles.forecastText}>
          {name} - {headline}
        </Text>
      </View>
      <View style={styles.forecastListRight}>
        <Text style={styles.forecastText}>
          {minTemp} / {maxTemp}{measureSystem === 'metric' ? '°C' : '°F'}
        </Text>
      </View>
    </View>
  );
}
