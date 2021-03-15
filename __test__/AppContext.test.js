import React from 'react';
import renderer from 'react-test-renderer';
import AppProvider, { addCity, savedCityList, setSavedCityList } from '../AppContext';

it('renders without crashing', () => {
  const rendered = renderer.create(<AppProvider />).toJSON();
  expect(rendered).toBeTruthy();
});

it('test against snapshot', () => {
  const tree = renderer.create(<AppProvider />).toJSON();
  expect(tree).toMatchSnapshot();
});