import { format } from 'date-fns';

enum Compass {
  N = 'N',
  NE = 'NE',
  E = 'E',
  SE = 'SE',
  S = 'S',
  SW = 'SW',
  W = 'W',
  NW = 'NW',
}

enum Levels {
  LOW = 'Low',
  MODERATE = 'Moderate',
  HIGH = 'High',
  VERY_HIGH = "Very High",
  EXTREME = 'Extreme',
}

// Capitalises the first letter of the headline
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Calculates the date 2 days from now and returns the name of the day
export const tomorrowPlusOne = () => {
  const twoDaysFromNow: number = new Date().getTime() + 86400000 * 2;
  return format(new Date(twoDaysFromNow), 'eeee');
};

// Converts wind direction in degrees to letter format - i.e. 5km/h NE (North-East)
export const degToCard = (deg: number) => {
  const directions: string[] = [Compass.N, Compass.NE, Compass.E, Compass.SE, Compass.S, Compass.SW, Compass.W, Compass.NW];
  let degrees: number = (deg * 8) / 360;
  degrees = Math.round(degrees);
  degrees = (degrees + 8) % 8;
  return directions[degrees];
};

// Converts UV Index to a string based on extremity
export const measureUVI = (num: number) => {
  if (num <= 2) {
    return Levels.LOW;
  } else if (num <= 5) {
    return Levels.MODERATE;
  } else if (num <= 7) {
    return Levels.HIGH;
  } else if (num <= 10) {
    return Levels.VERY_HIGH;
  } else {
    return Levels.EXTREME;
  }
};

// Converts CO level to a string based on extremity
export const measureCO = (num: number) => {
  if (num <= 1000) {
    return Levels.LOW;
  } else if (num <= 10000) {
    return Levels.MODERATE;
  } else if (num <= 17000) {
    return Levels.HIGH;
  } else if (num <= 34000) {
    return Levels.VERY_HIGH;
  } else {
    return Levels.EXTREME;
  }
};

// Converts NO & NO2 level to a string based on extremity
export const measureNO2 = (num: number) => {
  if (num <= 40) {
    return Levels.LOW;
  } else if (num <= 80) {
    return Levels.MODERATE;
  } else if (num <= 200) {
    return Levels.HIGH;
  } else if (num <= 400) {
    return Levels.VERY_HIGH;
  } else {
    return Levels.EXTREME;
  }
};

// Converts O3 level to a string based on extremity
export const measureO3 = (num: number) => {
  if (num <= 20) {
    return Levels.LOW;
  } else if (num <= 40) {
    return Levels.MODERATE;
  } else if (num <= 160) {
    return Levels.HIGH;
  } else if (num <= 240) {
    return Levels.VERY_HIGH;
  } else {
    return Levels.EXTREME;
  }
};

// Converts SO2 level to a string based on extremity
export const measureSO2 = (num: number) => {
  if (num <= 20) {
    return Levels.LOW;
  } else if (num <= 125) {
    return Levels.MODERATE;
  } else if (num <= 350) {
    return Levels.HIGH;
  } else if (num <= 500) {
    return Levels.VERY_HIGH;
  } else {
    return Levels.EXTREME;
  }
};

// Converts NH3 level to a string based on extremity
export const measureNH3 = (num: number) => {
  if (num <= 400) {
    return Levels.LOW;
  } else if (num <= 800) {
    return Levels.MODERATE;
  } else if (num <= 1200) {
    return Levels.HIGH;
  } else if (num <= 1800) {
    return Levels.VERY_HIGH;
  } else {
    return Levels.EXTREME;
  }
};

// Converts PM2.5 level to a string based on extremity
export const measurePM25 = (num: number) => {
  if (num <= 10) {
    return Levels.LOW;
  } else if (num <= 25) {
    return Levels.MODERATE;
  } else if (num <= 50) {
    return Levels.HIGH;
  } else if (num <= 100) {
    return Levels.VERY_HIGH;
  } else {
    return Levels.EXTREME;
  }
};

// Converts PM10 level to a string based on extremity
export const measurePM10 = (num: number) => {
  if (num <= 20) {
    return Levels.LOW;
  } else if (num <= 50) {
    return Levels.MODERATE;
  } else if (num <= 80) {
    return Levels.HIGH;
  } else if (num <= 160) {
    return Levels.VERY_HIGH;
  } else {
    return Levels.EXTREME;
  }
};

export const measurementSystem = (systemName: string) => {
  if (systemName === 'metric') return '°C';
  else return '°F';
}