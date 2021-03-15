import React from 'react';
import renderer from 'react-test-renderer';
import Current from '../../components/Current';


it('renders without crashing', () => {
  const rendered = renderer.create(<Current />).toJSON();
  expect(rendered).toBeTruthy();
});

it('test against snapshot', () => {
  const tree = renderer.create(<Current />).toJSON();
  expect(tree).toMatchSnapshot();
});