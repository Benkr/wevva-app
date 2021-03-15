import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/styles';
const EXPO_API_KEY_OWM = '57311a90a3e7cbf52c5f885c10d6c755';
import {
  measureCO,
  measureNO2,
  measureO3,
  measureSO2,
  measureNH3,
  measurePM25,
  measurePM10,
} from '../helpers';

interface CoordinateInterface {
  lat: number;
  lon: number;
}

export default function AirPollution(coordinates: CoordinateInterface) {
  const [airPollution, setAirPollution] = useState(null);
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${EXPO_API_KEY_OWM}`
    )
      .then((response: any) => response.json())
      .then((data: any) => {
        setAirPollution(data.list[0]);
      });
  }, []);

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
