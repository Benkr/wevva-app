import React from 'react';
import renderer from 'react-test-renderer';
import SevenDay from '../../components/SevenDay';
import mockData from '../__mocks__/__onecallData__';


it('renders without crashing', () => {
  const rendered = renderer.create(<SevenDay data={mockData}/>).toJSON();
  expect(rendered).toBeTruthy();
});

it('test against snapshot', () => {
  const tree = renderer.create(<SevenDay data={mockData}/>).toJSON();
  expect(tree).toMatchSnapshot();
});