import React from 'react';
import renderer from 'react-test-renderer';
import Day from '../../components/Day';


it('renders without crashing', () => {
  const rendered = renderer.create(<Day />).toJSON();
  expect(rendered).toBeTruthy();
});

it('test against snapshot', () => {
  const tree = renderer.create(<Day />).toJSON();
  expect(tree).toMatchSnapshot();
});