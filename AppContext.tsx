import React, { useState, useEffect, useContext } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const AppContext = React.createContext(null);

export function useApp() {
  return useContext(AppContext);
}

export default function AppProvider({ children }) {
  const [savedCityList, setSavedCityList] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [measureSystem, setMeasureSystem] = useState('metric');

  // Saves list of saved cities in to local phone storage, which will be persisted in memory
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@wevva-app', JSON.stringify(value));
    } catch (e) {
      Alert.alert(e);
    }
  };

  // Get users location when the app first renders, this will be saved in phone settings and only request
  // the first time they start the app
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: 6,
      });
      setLatitude(currentLocation.coords.latitude);
      setLongitude(currentLocation.coords.longitude);
    })();

    // Update state with saved cities from local storage
    (async () => {
      try {
        const value = await AsyncStorage.getItem('@wevva-app');
        if (value !== null) {
          setSavedCityList(JSON.parse(value));
        }
      } catch (e) {
        Alert.alert(e);
      }
    })();
  }, []);

  // Saved cities are always stored in state and persisted in local storage
  const addCity = (newCity) => {
    const newCityList = [...savedCityList, newCity];
    storeData(newCityList);
    setSavedCityList(newCityList);
  };
  const removeCity = (deleteCity) => {
    let newCityList = [...savedCityList];
    newCityList = newCityList.filter((city) => city !== deleteCity);
    storeData(newCityList);
    setSavedCityList(newCityList);
  };

  return (
    <AppContext.Provider
      value={{
        savedCityList: savedCityList,
        latitude: latitude,
        longitude: longitude,
        measureSystem: measureSystem,
        setMeasureSystem: setMeasureSystem,
        addCity: addCity,
        removeCity: removeCity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
