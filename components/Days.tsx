import React from 'react';
import { View } from 'react-native';
import { Location } from '../lib/interfaces';
import { styles } from '../styles/styles';
import { tomorrowPlusOne, capitalize } from '../helpers';
import Day from './Day';

export default function Days(locationObject: Location) {
  const { daily } = locationObject.data;
  
  return (
    <>
      {daily ? (
        <View style={styles.daysContainer}>
          <Day
            name="Today"
            icon={daily[0].weather[0].icon}
            headline={capitalize(daily[0].weather[0].description)}
            minTemp={Math.round(daily[0].temp.min)}
            maxTemp={Math.round(daily[0].temp.max)}
          />
          <Day
            name="Tomorrow"
            icon={daily[1].weather[0].icon}
            headline={capitalize(daily[1].weather[0].description)}
            minTemp={Math.round(daily[1].temp.min)}
            maxTemp={Math.round(daily[1].temp.max)}
          />
          <Day
            name={tomorrowPlusOne()}
            icon={daily[2].weather[0].icon}
            headline={capitalize(daily[2].weather[0].description)}
            minTemp={Math.round(daily[2].temp.min)}
            maxTemp={Math.round(daily[2].temp.max)}
          />
        </View>
      ) : null}
    </>
  );
}
