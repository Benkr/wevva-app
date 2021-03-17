import {
  capitalize,
  degToCard,
  measureCO,
  measurementSystem,
  measureNH3,
  measureNO2,
  measureO3,
  measurePM10,
  measurePM25,
  measureSO2,
  measureUVI,
} from '../helpers';

describe('Helper functions', () => {
  it('should capitalize first letter of a string', () => {
    expect(capitalize('citytown')).toBe('Citytown');
  });

  it('should display the correct compass direction per deg-azimuth', () => {
    expect(degToCard(0)).toBe('N');
    expect(degToCard(45)).toBe('NE');
    expect(degToCard(90)).toBe('E');
    expect(degToCard(135)).toBe('SE');
    expect(degToCard(180)).toBe('S');
    expect(degToCard(225)).toBe('SW');
    expect(degToCard(270)).toBe('W');
    expect(degToCard(315)).toBe('NW');
  });

  it('should display the correct UVI levels', () => {
    expect(measureUVI(0)).toBe('Low');
    expect(measureUVI(2)).toBe('Low');
    expect(measureUVI(3)).toBe('Moderate');
    expect(measureUVI(5)).toBe('Moderate');
    expect(measureUVI(6)).toBe('High');
    expect(measureUVI(7)).toBe('High');
    expect(measureUVI(8)).toBe('Very High');
    expect(measureUVI(10)).toBe('Very High');
    expect(measureUVI(11)).toBe('Extreme');
  });

  it('should display the correct CO levels', () => {
    expect(measureCO(0)).toBe('Low');
    expect(measureCO(1000)).toBe('Low');
    expect(measureCO(1001)).toBe('Moderate');
    expect(measureCO(10000)).toBe('Moderate');
    expect(measureCO(10001)).toBe('High');
    expect(measureCO(17000)).toBe('High');
    expect(measureCO(17001)).toBe('Very High');
    expect(measureCO(34000)).toBe('Very High');
    expect(measureCO(34001)).toBe('Extreme');
  });

  it('should display the correct NO2 levels', () => {
    expect(measureNO2(0)).toBe('Low');
    expect(measureNO2(40)).toBe('Low');
    expect(measureNO2(41)).toBe('Moderate');
    expect(measureNO2(80)).toBe('Moderate');
    expect(measureNO2(81)).toBe('High');
    expect(measureNO2(200)).toBe('High');
    expect(measureNO2(201)).toBe('Very High');
    expect(measureNO2(400)).toBe('Very High');
    expect(measureNO2(401)).toBe('Extreme');
  });

  it('should display the correct O3 levels', () => {
    expect(measureO3(0)).toBe('Low');
    expect(measureO3(20)).toBe('Low');
    expect(measureO3(21)).toBe('Moderate');
    expect(measureO3(40)).toBe('Moderate');
    expect(measureO3(41)).toBe('High');
    expect(measureO3(160)).toBe('High');
    expect(measureO3(161)).toBe('Very High');
    expect(measureO3(240)).toBe('Very High');
    expect(measureO3(241)).toBe('Extreme');
  });

  it('should display the correct SO2 levels', () => {
    expect(measureSO2(0)).toBe('Low');
    expect(measureSO2(20)).toBe('Low');
    expect(measureSO2(21)).toBe('Moderate');
    expect(measureSO2(125)).toBe('Moderate');
    expect(measureSO2(126)).toBe('High');
    expect(measureSO2(350)).toBe('High');
    expect(measureSO2(351)).toBe('Very High');
    expect(measureSO2(500)).toBe('Very High');
    expect(measureSO2(501)).toBe('Extreme');
  });

  it('should display the correct NH3 levels', () => {
    expect(measureNH3(0)).toBe('Low');
    expect(measureNH3(400)).toBe('Low');
    expect(measureNH3(401)).toBe('Moderate');
    expect(measureNH3(800)).toBe('Moderate');
    expect(measureNH3(801)).toBe('High');
    expect(measureNH3(1200)).toBe('High');
    expect(measureNH3(1201)).toBe('Very High');
    expect(measureNH3(1800)).toBe('Very High');
    expect(measureNH3(1801)).toBe('Extreme');
  });

  it('should display the correct PM25 levels', () => {
    expect(measurePM25(0)).toBe('Low');
    expect(measurePM25(10)).toBe('Low');
    expect(measurePM25(11)).toBe('Moderate');
    expect(measurePM25(25)).toBe('Moderate');
    expect(measurePM25(26)).toBe('High');
    expect(measurePM25(50)).toBe('High');
    expect(measurePM25(51)).toBe('Very High');
    expect(measurePM25(100)).toBe('Very High');
    expect(measurePM25(101)).toBe('Extreme');
  });

  it('should display the correct PM10 levels', () => {
    expect(measurePM10(0)).toBe('Low');
    expect(measurePM10(20)).toBe('Low');
    expect(measurePM10(21)).toBe('Moderate');
    expect(measurePM10(50)).toBe('Moderate');
    expect(measurePM10(51)).toBe('High');
    expect(measurePM10(80)).toBe('High');
    expect(measurePM10(81)).toBe('Very High');
    expect(measurePM10(160)).toBe('Very High');
    expect(measurePM10(161)).toBe('Extreme');
  });

  it('should display the metric measurements when set to metric', () => {
    expect(measurementSystem('metric')).toBe('°C')
    expect(measurementSystem('imperial').toBe('°F'))
  });
});