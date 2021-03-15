import React from 'react';
import renderer from 'react-test-renderer';
import SearchScreen from '../../components/SearchScreen';

it('renders without crashing', () => {
  const rendered = renderer.create(<SearchScreen />).toJSON();
  expect(rendered).toBeTruthy();
});

it('test against snapshot', () => {
  const tree = renderer.create(<SearchScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});