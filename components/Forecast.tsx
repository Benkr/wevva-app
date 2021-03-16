import React, { useState, useEffect } from 'react';
import { View, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../styles/styles';
import Current from './Current';
import Days from './Days';
import Hourly from './Hourly';
import SevenDay from './SevenDay';
import Conditions, { conditionsInterface } from './Conditions';
import AirPollution from './AirPollution';
import Loading from './Loading';
import Map from './Map';
import { EXPO_API_KEY_OWM as weatherAPI } from '@env';
import { useApp } from '../AppContext';

export default function Forecast( conditionsObject: conditionsInterface ) {
  const { measureSystem } = useApp();
  const [onecallData, setOnecallData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [icon, setIcon] = useState<any>(null);

  // API call retrieves forecast data for location based on long/lat from Open Weather Map (live or
  // saved location)
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${conditionsObject.lat}&lon=${conditionsObject.lon}&appid=${weatherAPI}&units=${measureSystem}&exclude=current,minutely`
    )
      .then(response => response.json())
      .then(data => {
        setOnecallData(data);
        setIcon(data.hourly[0].weather[0].icon);
        setIsLoaded(true);
      });
  }, [measureSystem]);
  return (
    <>
      {isLoaded ? (
        <ImageBackground
          source={
            // Sets background colour based on whether it is night or daytime at location
            icon[2] === 'd' ? require('../assets/background-light.png') : require('../assets/background-dark.png')
          }
          style={styles.background}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.appContainer}>
              <View style={styles.forecastContainer}>
                <Current lat={conditionsObject.lat} lon={conditionsObject.lon} liveLocation={conditionsObject.liveLocation} />
                <Days data={onecallData} />
                <Hourly data={onecallData} />
                <SevenDay data={onecallData} />
                <Conditions data={onecallData} lat={conditionsObject.lat} lon={conditionsObject.lon} />
                <Map lat={conditionsObject.lat} lon={conditionsObject.lon} timeOfDay={icon[2]} />
                <AirPollution lat={conditionsObject.lat} lon={conditionsObject.lon} />
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      ) : (
        <Loading text={'Loading weather data...'} />
      )}
    </>
  );
}