// src/NewCardForm.test.js
import React from 'react';
import NewCardForm from './NewCardForm';
import {shallow } from 'enzyme';

describe('NewCardForm', () => {
  test('that it matches an existing snapshot', () => {

    const newCardForm = shallow( <NewCardForm addCardCallback={() => {} } />);


    expect(newCardForm).toMatchSnapshot();

    newCardForm.unmount();
  });

  test('Invokes callback on form submission', () => {
    const callback = jest.fn();
    const cardForm = shallow(
      <NewCardForm addCardCallback={callback} />
    );
    cardForm.find('form').simulate('submit', {
      preventDefault: () => {}    })
    expect(callback).toHaveBeenCalled();
    expect(callback.mock.calls[0][0]).toEqual(
      {
        "emoji": "",
        "text": ""}
      )
  });
});
