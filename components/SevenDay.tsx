import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Location } from '../lib/interfaces';
import { styles } from '../styles/styles';
import { format } from 'date-fns';
import fromUnixTime from 'date-fns/fromUnixTime';
import Images from '../assets/index.js';
import LottieView from 'lottie-react-native';
import { useApp } from '../AppContext';
import { measurementSystem } from '../helpers';

export default function SevenDay(locationObject: Location) {
  const { systemName } = useApp();

  const { data } = locationObject;
  const daily: any[] = data.daily.slice(1, 8);
  
  return (
    <>
      <Text style={styles.titleText}>7 Day Forecast</Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <View style={styles.sevenDayContainer}>
          {daily.map((day: any, idx: number) => (
            <View style={styles.sevenDayComponent} key={idx}>
              <View>
                <Text style={styles.sevenDayText}>
                  {format(fromUnixTime(day.dt), 'eee')}
                </Text>
              </View>
              <View>
                <LottieView
                  style={{ height: 50, width: 50 }}
                  source={Images[day.weather[0].icon]}
                  autoPlay
                  loop
                />
              </View>
              <View>
                <Text style={styles.sevenDayText}>
                  {Math.round(day.temp.day)}{measurementSystem(systemName)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
