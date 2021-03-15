import React from 'react';
import renderer from 'react-test-renderer';
import Search from '../../components/Search';


it('renders without crashing', () => {
  const rendered = renderer.create(<Search key="0"/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('test against snapshot', () => {
  const tree = renderer.create(<Search key="0"/>).toJSON();
  expect(tree).toMatchSnapshot();
});