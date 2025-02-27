import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Flag from 'react-native-flags';
import { StatusBar } from 'expo-status-bar';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { Icon } from 'galio-framework';
import { EXPO_API_KEY_OWM as weatherAPI, BASE_URL as baseUrl } from '@env';
import { styles } from '../styles/styles';
import { useApp } from '../AppContext';

export default function SearchScreen({ navigation }) {
  const [searchResult, setSearchResult] = useState([]);
  const [searchString, setSearchString] = useState('');
  const { addCity, removeCity, savedCityList } = useApp();

  // User search string is stored in state variable searchString and call to API is debounced by 1 second
  // to avoid too many API calls
  useEffect(() => {
    debounceSearch(searchString);
  }, [searchString]);

  const handleChange: any = (textValue: string) => {
    setSearchString(textValue);
  };

  const debounceSearch: any = useCallback(
    AwesomeDebouncePromise((searchString: string) => fetchCities(searchString), 1000),
    []
  );

  const fetchCities: any = (cityName: string) => {
    fetch(
      `${baseUrl}geo/1.0/direct?q=${cityName}&appid=${weatherAPI}&limit=25`
    )
      .then((response) => response.json())
      .then((data) => {
        setSearchResult(data);
      });
  };

  return (
    <>
      {savedCityList && addCity && removeCity ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
        >
          <StatusBar style="auto" />
          <View style={styles.searchContainer}>
            <SearchBar
              lightTheme
              placeholder="Find a city..."
              onChangeText={handleChange}
              value={searchString}
              containerStyle={styles.searchInputContainerContainer}
              inputContainerStyle={styles.searchInputContainer}
              inputStyle={styles.searchInput}
            />
            {searchResult.length
              ? searchResult.map((city: any) => {
                  return (
                    <TouchableOpacity
                      key={`${city.name}${city.lat}${city.lon}`}
                      width="85%"
                      height={60}
                      style={styles.searchResultCard}
                      onPress={() =>
                        navigation.navigate('Forecast', {
                          lat: city.lat,
                          lon: city.lon,
                          liveLocation: false,
                        })
                      }
                    >
                      <Text style={styles.searchResultText}>
                        <Flag code={city.country} size={32} /> {city.name}
                        {city.state ? ', ' + city.state : null}
                      </Text>
                      {savedCityList.indexOf(JSON.stringify(city)) == -1 ? (
                        <TouchableOpacity
                          color="#fff"
                          size={5}
                          width="20%"
                          style={{ position: 'absolute', right: 20 }}
                          onPress={() => {
                            addCity(JSON.stringify(city));
                            setSearchString('');
                            setSearchResult([]);
                          }}
                        >
                          <Icon
                            name="plus"
                            family="Entypo"
                            color="#4d4d4d"
                            size={25}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          color="#fff"
                          size={5}
                          width="20%"
                          style={{ position: 'absolute', right: 20 }}
                          onPress={() => {
                            removeCity(JSON.stringify(city));
                          }}
                        >
                          <Icon
                            name="star"
                            family="Entypo"
                            color="#4d4d4d"
                            size={25}
                          />
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  );
                })
              : savedCityList
                  .map((city: any) => (city = JSON.parse(city)))
                  .map((city: any) => {
                    return (
                      <TouchableOpacity
                        key={`${city.lat}${city.lon}`}
                        width="85%"
                        height={60}
                        style={styles.searchResultCard}
                        onPress={() =>
                          navigation.navigate('Forecast', {
                            lat: city.lat,
                            lon: city.lon,
                            liveLocation: false,
                          })
                        }
                      >
                        <Text style={styles.searchResultText}>
                          <Flag code={city.country} size={32} /> {city.name}
                          {city.state ? ', ' + city.state : null}
                        </Text>
                        {savedCityList.indexOf(JSON.stringify(city)) == -1 ? (
                          <TouchableOpacity
                            color="#fff"
                            size={5}
                            style={{ position: 'absolute', right: 20 }}
                            onPress={() => {
                              addCity(JSON.stringify(city));
                            }}
                          >
                            <Icon
                              name="plus"
                              family="Entypo"
                              color="#4d4d4d"
                              size={25}
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            color="#fff"
                            size={5}
                            style={{ position: 'absolute', right: 20 }}
                            onPress={() => {
                              removeCity(JSON.stringify(city));
                            }}
                          >
                            <Icon
                              name="star"
                              family="Entypo"
                              color="#4d4d4d"
                              size={25}
                            />
                          </TouchableOpacity>
                        )}
                      </TouchableOpacity>
                    );
                  })}
          </View>
        </ScrollView>
      ) : (
        <></>
      )}
    </>
  );
}
