import React from 'react';
import renderer from 'react-test-renderer';
import Days from '../../components/Days';


it('renders without crashing', () => {
  const rendered = renderer.create(<Days />).toJSON();
  expect(rendered).toBeTruthy();
});

it('test against snapshot', () => {
  const tree = renderer.create(<Days />).toJSON();
  expect(tree).toMatchSnapshot();
});