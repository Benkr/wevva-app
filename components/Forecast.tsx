import React, { useState, useEffect } from 'react';
import { View, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ConditionsState, Location } from '../lib/interfaces';
import { styles } from '../styles/styles';
// import { Current, Days, Hourly, SevenDay, Conditions, AirPollution, Loading, Map } from '@components';
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

export default function Forecast(locationObject: Location) {
  const { systemName } = useApp();
  // const [onecallData, setOnecallData] = useState<any>(null);
  // const [isLoaded, setIsLoaded] = useState<boolean>(false);
  // const [icon, setIcon] = useState<any>(null);

  const [state, setState] = useState<ConditionsState>({
    onecallData: null,
    isLoaded: false,
    icon: null,
  })

  const { lat, lon, liveLocation } = locationObject;

  // API call retrieves forecast data for location based on long/lat from Open Weather Map (live or
  // saved location)
  useEffect(() => {
    fetch(
      `${baseUrl}data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${weatherAPI}&units=${systemName}&exclude=current,minutely`
    )
      .then((response: any) => response.json())
      .then((data: any) => {
        setState({ onecallData: data, isLoaded: true, icon: data.hourly[0].weather[0].icon });
        // setIcon(data.hourly[0].weather[0].icon);
        // setIsLoaded(true);
      });
  }, [systemName]);
  return (
    <>
      {state.isLoaded ? (
        <ImageBackground
          source={
            // Sets background colour based on whether it is night or daytime at location
            state.icon[2] === 'd' ? require('../assets/background-light.png') : require('../assets/background-dark.png')
          }
          style={styles.background}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.appContainer}>
              <View style={styles.forecastContainer}>
                <Current lat={lat} lon={lon} liveLocation={liveLocation} />
                <Days data={state.onecallData} />
                <Hourly data={state.onecallData} />
                <SevenDay data={state.onecallData} />
                <Conditions data={state.onecallData} lat={lat} lon={lon} />
                <Map lat={lat} lon={lon} timeOfDay={state.icon[2]} />
                <AirPollution lat={lat} lon={lon} />
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