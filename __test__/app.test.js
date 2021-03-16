import React from 'react';
import renderer from 'react-test-renderer';
import AppProvider from '../AppContext';

it('should render', () => {
  const tree = renderer.create(<AppProvider />).toJSON();
  expect(tree).toMatchSnapshot();
})