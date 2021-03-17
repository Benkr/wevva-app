import React, { useState, useEffect, useContext } from 'react';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const AppContext = React.createContext(null);

export function useApp() {
  return useContext(AppContext);
}

export default function AppProvider ({ children }) {
  const [savedCityList, setSavedCityList] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [systemName, setSystemName] = useState('metric');

  // Saves list of saved cities in to local phone storage, which will be persisted in memory
  const storeData: any = async (value: any) => {
    try {
      await AsyncStorage.setItem('@wevva-app', JSON.stringify(value));
    } catch (e) {
      Alert.alert(e);
    }
  };

  const unitPreference: any = async (value: string) => {
    try {
      await AsyncStorage.setItem('@wevva-app/unit', JSON.stringify(value));
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
        const value: any = await AsyncStorage.getItem('@wevva-app');
        const units: string = await AsyncStorage.getItem('@wevva-app/unit');
        if (value) {
          setSavedCityList(JSON.parse(value));
        }
        if (units !== null) {
          setSystemName(JSON.parse(units));
        }
      } catch (e) {
        Alert.alert(e);
      }
    })();
  }, []);

  // Saved cities are always stored in state and persisted in local storage
  const addCity: any = (newCity: any) => {
    const newCityList: any[] = [...savedCityList, newCity];
    storeData(newCityList);
    setSavedCityList(newCityList);
  };
  
  const removeCity: any = (deleteCity: any) => {
    let newCityList: any[] = [...savedCityList];
    newCityList = newCityList.filter((city: any) => city !== deleteCity);
    storeData(newCityList);
    setSavedCityList(newCityList);
  };

  return (
    <AppContext.Provider
      value={{
        savedCityList,
        latitude,
        longitude,
        systemName,
        setSystemName,
        addCity,
        removeCity,
        unitPreference,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}