import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Location } from '../lib/interfaces';
import { styles } from '../styles/styles';
import { degToCard, measurementSystem, measureUVI } from '../helpers';
import { useApp } from '../AppContext';
// import { EXPO_API_KEY_AMBEE } from '@env';

// interface conditionsInterface {
//   data?: any;
//   lat?: any;
//   lon?: any;
//   liveLocation?: any;
// }

type Levels = 'Low' | 'Moderate' | 'High';

export default function Conditions(locationObject: Location) {
  const { systemName } = useApp();
  const [grassPollen] = useState<Levels>('Low');
  const [treePollen] = useState<Levels>('Moderate');
  const [weedPollen] = useState<Levels>('Low');  

  const hourlyConditions: any = locationObject.data.hourly[0];

  // Was using Ambee API to obtain pollen count information but API is very slow and they blocked me, therefore
  // pollen count is using mock data at the moment.

  // useEffect(() => {
  //   fetch(
  //     `https://api.ambeedata.com/latest/pollen/by-lat-lng?lat=${lat}&lng=${lon}`,
  //     {
  //       headers: {
  //         'x-api-key': EXPO_API_KEY_AMBEE,
  //         'Content-type': 'application/json',
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then(({ data }) => {
  //       setPollenData(data);
  //       console.log(data);
  //     });
  // }, []);

  return (
    <>
      <View>
        <Text style={styles.titleText}>Conditions</Text>
        <View style={styles.conditionsContainer}>
          <View style={{ flex: 1 }}>
            <View style={styles.conditionsPair}>
              <Text style={styles.conditionsTextTitle}>Feels like</Text>
              <Text style={styles.conditionsTextResult}>
                {Math.round(hourlyConditions.feels_like)}{measurementSystem(systemName)}
              </Text>
            </View>
            <View style={styles.conditionsPair}>
              <Text style={styles.conditionsTextTitle}>Humidity</Text>
              <Text style={styles.conditionsTextResult}>
                {hourlyConditions.humidity}%
              </Text>
            </View>
            <View style={styles.conditionsPair}>
              <Text style={styles.conditionsTextTitle}>Wind</Text>
              <Text style={styles.conditionsTextResult}>
                {Math.round(hourlyConditions.wind_speed)}{measurementSystem(systemName) === '°C' ? 'Km/h' : 'Mi/h'}{' - '}
                {degToCard(hourlyConditions.wind_deg)}
              </Text>
            </View>
            <View style={styles.conditionsPair}>
              <Text style={styles.conditionsTextTitle}>Precipitation</Text>
              <Text style={styles.conditionsTextResult}>
                {Math.round(hourlyConditions.pop)}%
              </Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.conditionsPair}>
              <Text style={styles.conditionsTextTitle}>UV Index</Text>
              <Text style={styles.conditionsTextResult}>
                {Math.round(hourlyConditions.uvi)} -{' '}
                {measureUVI(Math.round(hourlyConditions.uvi))}
              </Text>
            </View>
            <View style={styles.conditionsPair}>
              <Text style={styles.conditionsTextTitle}>Grass Pollen</Text>
              <Text style={styles.conditionsTextResult}>{grassPollen}</Text>
            </View>
            <View style={styles.conditionsPair}>
              <Text style={styles.conditionsTextTitle}>Tree Pollen</Text>
              <Text style={styles.conditionsTextResult}>{treePollen}</Text>
            </View>
            <View style={styles.conditionsPair}>
              <Text style={styles.conditionsTextTitle}>Weed Pollen</Text>
              <Text style={styles.conditionsTextResult}>{weedPollen}</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
