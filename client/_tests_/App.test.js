/**
* created by Hemadri Dasari on 01/05/2018
*/

import NewsData from '../src/NewsData/components/NewsData';
import React from 'react';
import {shallow} from "enzyme";
import toJson from "enzyme-to-json";
import renderer from 'react-test-renderer';
import newsData from '../public/newsData.json';

describe('NewsData component renders a list of news data', () => {
  
	it('should match its empty snapshot', () => {
	    const tree = renderer.create(
	      <NewsData />
	    ).toJSON();

	    expect(tree).toMatchSnapshot();
	  });

	it('should match its snapshot with items', () => {
	  const tree = renderer.create(
	    <NewsData newsData={newsData} />
	   ).toJSON();

	  expect(tree).toMatchSnapshot();
	});
});