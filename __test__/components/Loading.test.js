import React from 'react';
import renderer from 'react-test-renderer';
import Loading from '../../components/Loading';


it('renders without crashing', () => {
  const rendered = renderer.create(<Loading />).toJSON();
  expect(rendered).toBeTruthy();
});

it('test against snapshot', () => {
  const tree = renderer.create(<Loading />).toJSON();
  expect(tree).toMatchSnapshot();
});