import React from 'react';
import renderer from 'react-test-renderer';
import Conditions from '../../components/Conditions';


it('renders without crashing', () => {
  const rendered = renderer.create(<Conditions />).toJSON();
  expect(rendered).toBeTruthy();
});

it('test against snapshot', () => {
  const tree = renderer.create(<Conditions />).toJSON();
  expect(tree).toMatchSnapshot();
});