import React from 'react';
import renderer from 'react-test-renderer';
import Hourly from '../../components/Hourly';


it('renders without crashing', () => {
  const rendered = renderer.create(<Hourly />).toJSON();
  expect(rendered).toBeTruthy();
});

it('test against snapshot', () => {
  const tree = renderer.create(<Hourly />).toJSON();
  expect(tree).toMatchSnapshot();
});