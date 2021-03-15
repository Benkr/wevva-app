import React from 'react';
import renderer from 'react-test-renderer';
import Map from '../../components/Map';


it('renders without crashing', () => {
  const rendered = renderer.create(<Map />).toJSON();
  expect(rendered).toBeTruthy();
});

it('test against snapshot', () => {
  const tree = renderer.create(<Map />).toJSON();
  expect(tree).toMatchSnapshot();
});