import React from 'react';
import renderer from 'react-test-renderer';
import ForecastSearch from '../../components/ForecastSearch';


it('renders without crashing', () => {
  const rendered = renderer.create(<ForecastSearch />).toJSON();
  expect(rendered).toBeTruthy();
});

it('test against snapshot', () => {
  const tree = renderer.create(<ForecastSearch />).toJSON();
  expect(tree).toMatchSnapshot();
});