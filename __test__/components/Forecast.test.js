import React from 'react';
import renderer from 'react-test-renderer';
import Forecast from '../../components/Forecast';


it('renders without crashing', () => {
  const rendered = renderer.create(<Forecast key={43} lat="54" lon={28} liveLocation={true}/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('test against snapshot', () => {
  const tree = renderer.create(<Forecast key={43} lat="54" lon={28} liveLocation={true}/>).toJSON();
  expect(tree).toMatchSnapshot();
});