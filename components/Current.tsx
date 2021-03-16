import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { Icon } from 'galio-framework';
import { Location } from '../lib/interfaces';
import Images from '../assets/index.js';
import { styles } from '../styles/styles';
import { Capitalize } from '../helpers';
import { EXPO_API_KEY_OWM as weatherAPI, BASE_URL as baseUrl } from '@env';
import { useApp } from '../AppContext';

// interface conditionsInterface {
//   lat: number,
//   lon: number,
//   liveLocation?: boolean
// }

export default function Current(locationObject: Location) {
  const { measureSystem, setMeasureSystem, unitPreference } = useApp();
  const [city, setCity] = useState<any>(null);
  const [icon, setIcon] = useState<any>(null);
  const [headline, setHeadline] = useState<any>(null);
  const [temp, setTemp] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<any>(false);

  const { lat, lon, liveLocation } = locationObject;
  // Second API call - required to obtain current conditions which are not part of the OneCall API
  // fetched in Forecast
  useEffect(() => {
    fetch(
      `${baseUrl}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPI}&units=${measureSystem}`
    )
      .then((response: any) => response.json())
      .then((data: any) => {
        setCity(data.name);
        setHeadline(Capitalize(data.weather[0].description));
        setTemp(Math.round(data.main.temp));
        setIcon(data.weather[0].icon);
        setIsLoaded(true);
      });
  }, [measureSystem]);
  
  
  // Renders location-pin icon which only displays when forecast page is based on the user's live
  // location
  const locationIcon = (
    <Icon name="location-pin" family="Entypo" color="white" size={30} />
  );
  const changeTempScale = () => {
    if (measureSystem === 'metric') {
      setMeasureSystem('imperial');
      unitPreference('imperial');
    } else {
      setMeasureSystem('metric');
      unitPreference('metric');
    }
  }

  return (
    <>
      {isLoaded ? (
        <View style={styles.currentContainer}>
          <LottieView
            style={{ height: 200, width: 200 }}
            source={Images[icon]}
            autoPlay
            loop
          />
          {city.length < 15 ? (
            <Text style={styles.cityText}>
              {liveLocation ? locationIcon : null}
              {city}
            </Text>
          ) : (
            <Text style={styles.cityTextLong}>
              {liveLocation ? locationIcon : null}
              {city}
            </Text>
          )}
          <TouchableOpacity
            onPress={changeTempScale}>
            <Text style={styles.headlineText}>
              {headline} {temp}{measureSystem === 'metric' ? '°C' : '°F'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#fff" />
      )}
    </>
  );
}
