import * as React from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import PeopleTable from './PeopleTable';
import { peopleOne, peopleTwo } from '.././data';

import pageReducer from '.././reducers/page';
import peopleReducer from '.././reducers/people';
import personReducer from '.././reducers/person';

describe('PeopleTable', () => {
  let httpMock;
  let store;
  
  const initialState = {
    people: {
      fetching: false,
      data: [],
      cache: {},
      count: 4
    },
    page: {
      index: 1,
      perPage: 2
    }
  };
  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    store = createStore(
      combineReducers({
        page: pageReducer,
        people: peopleReducer,
        person: personReducer
      }),
      initialState,
      applyMiddleware(thunk)
    );
  });

  it('should show the loader when fetching and cache/paginate correctly', async () => {
    httpMock.onGet('https://swapi.co/api/people/?page=1').reply(200, {
      status: 'success',
      results: peopleOne,
      count: 4
    });

    httpMock.onGet('https://swapi.co/api/people/?page=2').reply(200, {
      status: 'success',
      results: peopleTwo,
      count: 4
    });

    const wrapper = mount(<Provider store={store}><PeopleTable/></Provider>);
    expect(wrapper.exists()).toBe(true);

    let spinnerContainer, spinnerText;

    spinnerContainer = wrapper.find('div.spinner-container');
    expect(spinnerContainer.exists()).toBe(true);

    spinnerText = spinnerContainer.find('span.spinner-text');
    expect(spinnerText.exists()).toBe(true);
    expect(spinnerText.text()).toBe('Loading...');

    await flushAllPromises();
    wrapper.update();

    let personRow, name, height, hairColor, skinColor, eyeColor;

    // Person 1
    personRow = wrapper.find('tr.person-row0');
    expect(personRow.exists()).toBe(true);

    name = personRow.find('td.name0');
    expect(name.text()).toBe('Foo Man');

    height = personRow.find('td.height0');
    expect(height.text()).toBe('100');

    hairColor = personRow.find('td.hair-color0');
    expect(hairColor.text()).toBe('blue');

    skinColor = personRow.find('td.skin-color0');
    expect(skinColor.text()).toBe('blue');

    eyeColor = personRow.find('td.eye-color0');
    expect(eyeColor.text()).toBe('blue');

    // Person 2
    personRow = wrapper.find('tr.person-row1');
    expect(personRow.exists()).toBe(true);

    name = personRow.find('td.name1');
    expect(name.text()).toBe('The Mannest of Foo Men');

    height = personRow.find('td.height1');
    expect(height.text()).toBe('200');

    hairColor = personRow.find('td.hair-color1');
    expect(hairColor.text()).toBe('red');

    skinColor = personRow.find('td.skin-color1');
    expect(skinColor.text()).toBe('blue');

    eyeColor = personRow.find('td.eye-color1');
    expect(eyeColor.text()).toBe('red');

    // Page Forward
    wrapper.find('button.next-page').simulate('click');

    spinnerContainer = wrapper.find('div.spinner-container');
    expect(spinnerContainer.exists()).toBe(true);

    spinnerText = spinnerContainer.find('span.spinner-text');
    expect(spinnerText.exists()).toBe(true);
    expect(spinnerText.text()).toBe('Loading...');

    await flushAllPromises();
    wrapper.update();

    // Person 3
    personRow = wrapper.find('tr.person-row0');
    expect(personRow.exists()).toBe(true);

    name = personRow.find('td.name0');
    expect(name.text()).toBe('The Last Foo of All');

    height = personRow.find('td.height0');
    expect(height.text()).toBe('80');

    hairColor = personRow.find('td.hair-color0');
    expect(hairColor.text()).toBe('blue');

    skinColor = personRow.find('td.skin-color0');
    expect(skinColor.text()).toBe('yellow');

    eyeColor = personRow.find('td.eye-color0');
    expect(eyeColor.text()).toBe('blue');

    // Person 4
    personRow = wrapper.find('tr.person-row1');
    expect(personRow.exists()).toBe(true);

    name = personRow.find('td.name1');
    expect(name.text()).toBe('Fooest');

    height = personRow.find('td.height1');
    expect(height.text()).toBe('800');

    hairColor = personRow.find('td.hair-color1');
    expect(hairColor.text()).toBe('bluest');

    skinColor = personRow.find('td.skin-color1');
    expect(skinColor.text()).toBe('bluest');

    eyeColor = personRow.find('td.eye-color1');
    expect(eyeColor.text()).toBe('bluest');

    // Page Back
    // We should hit the cache and not trigger the loader
    wrapper.find('button.previous-page').simulate('click');

    spinnerContainer = wrapper.find('div.spinner-container');
    expect(spinnerContainer.exists()).toBe(false);

    // Person 1
    personRow = wrapper.find('tr.person-row0');
    expect(personRow.exists()).toBe(true);

    name = personRow.find('td.name0');
    expect(name.text()).toBe('Foo Man');

    height = personRow.find('td.height0');
    expect(height.text()).toBe('100');

    hairColor = personRow.find('td.hair-color0');
    expect(hairColor.text()).toBe('blue');

    skinColor = personRow.find('td.skin-color0');
    expect(skinColor.text()).toBe('blue');

    eyeColor = personRow.find('td.eye-color0');
    expect(eyeColor.text()).toBe('blue');

    // Person 2
    personRow = wrapper.find('tr.person-row1');
    expect(personRow.exists()).toBe(true);

    name = personRow.find('td.name1');
    expect(name.text()).toBe('The Mannest of Foo Men');

    height = personRow.find('td.height1');
    expect(height.text()).toBe('200');

    hairColor = personRow.find('td.hair-color1');
    expect(hairColor.text()).toBe('red');

    skinColor = personRow.find('td.skin-color1');
    expect(skinColor.text()).toBe('blue');

    eyeColor = personRow.find('td.eye-color1');
    expect(eyeColor.text()).toBe('red');
  });
});