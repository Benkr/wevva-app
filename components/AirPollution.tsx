import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Location } from '../lib/interfaces';
import { styles } from '../styles/styles';
import { EXPO_API_KEY_OWM as weatherAPI, BASE_URL as baseUrl } from '@env';

import {
  measureCO,
  measureNO2,
  measureO3,
  measureSO2,
  measureNH3,
  measurePM25,
  measurePM10,
} from '../helpers';

// interface CoordinateInterface {
//   lat: number;
//   lon: number;
// }

export default function AirPollution(locationObject: Location) {
  const [airPollution, setAirPollution] = useState<any>(null);

  const { lat, lon } = locationObject;

  useEffect(() => {
    fetch(
      `${baseUrl}data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${weatherAPI}`
    )
      .then((response: any) => response.json())
      .then((data: any) => {
        setAirPollution(data.list[0]);
      });
  }, [lat, lon]);

  return (
    <View>
      {airPollution ? (
        <>
          <Text style={styles.titleText}>Air Pollution</Text>
          <View style={styles.conditionsContainer}>
            <View style={{ flex: 1 }}>
              <View style={styles.conditionsPair}>
                <Text style={styles.conditionsTextTitle}>
                  Carbon monoxide (CO)
                </Text>
                <Text style={styles.conditionsTextResult}>
                  {measureCO(airPollution.components.co)}
                </Text>
              </View>
              <View style={styles.conditionsPair}>
                <Text style={styles.conditionsTextTitle}>
                  Nitrogen monoxide (NO)
                </Text>
                <Text style={styles.conditionsTextResult}>
                  {measureNO2(airPollution.components.no)}
                </Text>
              </View>
              <View style={styles.conditionsPair}>
                <Text style={styles.conditionsTextTitle}>
                  Nitrogen dioxide (NO2)
                </Text>
                <Text style={styles.conditionsTextResult}>
                  {measureNO2(airPollution.components.no2)}
                </Text>
              </View>
              <View style={styles.conditionsPair}>
                <Text style={styles.conditionsTextTitle}>Ozone (O3)</Text>
                <Text style={styles.conditionsTextResult}>
                  {measureO3(airPollution.components.o3)}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.conditionsPair}>
                <Text style={styles.conditionsTextTitle}>
                  Sulphur dioxide (SO2)
                </Text>
                <Text style={styles.conditionsTextResult}>
                  {measureSO2(airPollution.components.so2)}
                </Text>
              </View>
              <View style={styles.conditionsPair}>
                <Text style={styles.conditionsTextTitle}>Ammonia (NH3)</Text>
                <Text style={styles.conditionsTextResult}>
                  {measureNH3(airPollution.components.nh3)}
                </Text>
              </View>
              <View style={styles.conditionsPair}>
                <Text style={styles.conditionsTextTitle}>
                  Particulate PM2.5
                </Text>
                <Text style={styles.conditionsTextResult}>
                  {measurePM25(airPollution.components.pm2_5)}
                </Text>
              </View>
              <View style={styles.conditionsPair}>
                <Text style={styles.conditionsTextTitle}>Particulate PM10</Text>
                <Text style={styles.conditionsTextResult}>
                  {measurePM10(airPollution.components.pm10)}
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <></>
      )}
    </View>
  );
}
