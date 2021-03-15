import React from 'react';
import renderer from 'react-test-renderer';
import AirPollution from '../../components/AirPollution';

beforeEach(() => {
  fetch.resetMocks();
});

it('renders without crashing', () => {
  const rendered = renderer.create(<AirPollution />).toJSON();
  expect(rendered).toBeTruthy();
});

it('test against snapshot', () => {
  const tree = renderer.create(<AirPollution />).toJSON();
  expect(tree).toMatchSnapshot();
});