import React, { useState, useEffect } from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'galio-framework';
import { styles } from '../styles/styles';
import Current from './Current';
import Days from './Days';
import Hourly from './Hourly';
import SevenDay from './SevenDay';
import Conditions from './Conditions';
import AirPollution from './AirPollution';
import Loading from './Loading';
import Map from './Map';
import { EXPO_API_KEY_OWM as weatherAPI, BASE_URL as baseUrl } from '@env';
import { useApp } from '../AppContext';

// Seperate Forecast component created specifically for searched cities, as a stack navigator passes
// data as props.route.params instead of just props. Also layout requires a back button. Potential
// to refactor Forecast component to compensate for both cases in future.

export default function ForecastSearch(props) {
  const { measureSystem } = useApp();
  const [onecallData, setOnecallData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [icon, setIcon] = useState(null);
  const { lat, lon, liveLocation } = props.route.params;
  const goBack = props.navigation.goBack;

  // API call retrieves forecast data for searched location based on long/lat from Open Weather Map
  useEffect(() => {
    fetch(
      `${baseUrl}data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherAPI}&units=${measureSystem}&exclude=current,minutely`
    )
      .then((response) => response.json())
      .then((data) => {
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
            icon[2] === 'd'
              ? require('../assets/background-light.png')
              : require('../assets/background-dark.png')
          }
          style={styles.background}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.appContainer}>
              <View style={styles.forecastContainer}>
                <View style={styles.backButtonView}>
                  <TouchableOpacity
                    onPress={() => {
                      // Go back to search page
                      goBack();
                    }}
                  >
                    <Icon
                      name="chevron-left"
                      family="Entypo"
                      color="#fff"
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
                <Current lat={lat} lon={lon} liveLocation={liveLocation} />
                <Days data={onecallData} />
                <Hourly data={onecallData} />
                <SevenDay data={onecallData} />
                <Conditions data={onecallData} lat={lat} lon={lon} />
                <Map lat={lat} lon={lon} timeOfDay={icon[2]} />
                <AirPollution lat={lat} lon={lon} />
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      ) : (
        <Loading />
      )}
    </>
  );
}
