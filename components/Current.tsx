import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { Icon } from 'galio-framework';
import { Location, ConditionsState } from '../lib/interfaces';
import Images from '../assets/index.js';
import { styles } from '../styles/styles';
import { capitalize, measurementSystem } from '../helpers';
import { EXPO_API_KEY_OWM as weatherAPI, BASE_URL as baseUrl } from '@env';
import { useApp } from '../AppContext';


export default function Current(locationObject: Location) {
  const { systemName, setSystemName, unitPreference } = useApp();

  const [state, setState] = useState<ConditionsState>({
    name: null,
    icon: null,
    headline: null,
    temp: null,
    isLoaded: false,
  })

  const { lat, lon, liveLocation } = locationObject;
  // Second API call - required to obtain current conditions which are not part of the OneCall API
  // fetched in Forecast
  useEffect(() => {
    fetch(
      `${baseUrl}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherAPI}&units=${systemName}`
    )
      .then((response: any) => response.json())
      .then((data: any) => {
        setState({
          name: data.name,
          headline: capitalize(data.weather[0].description),
          temp: Math.round(data.main.temp),
          icon: data.weather[0].icon,
          isLoaded: true,
        });
      })
      .catch((err) => console.log('Current.tsx, Line 40', err));
  }, [systemName]);

  // Renders location-pin icon which only displays when forecast page is based on the user's live
  // location
  const locationIcon = (
    <Icon name="location-pin" family="Entypo" color="white" size={30} />
  );
  const changeTempScale = () => {
    if (systemName === 'metric') {
      setSystemName('imperial');
      unitPreference('imperial');
    } else {
      setSystemName('metric');
      unitPreference('metric');
    }
  }

  return (
    <>
      {state.isLoaded ? (
        <View style={styles.currentContainer}>
          <LottieView
            style={{ height: 200, width: 200 }}
            source={Images[state.icon]}
            autoPlay
            loop
          />
          {state.name.length < 15 ? (
            <Text style={styles.cityText}>
              {liveLocation ? locationIcon : null}
              {state.name}
            </Text>
          ) : (
            <Text style={styles.cityTextLong}>
              {liveLocation ? locationIcon : null}
              {state.name}
            </Text>
          )}
          <TouchableOpacity
            onPress={changeTempScale}>
            <Text style={styles.headlineText}>
              {state.headline} {state.temp}{measurementSystem(systemName)}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ActivityIndicator size="large" color="#fff" />
      )}
    </>
  );
}
