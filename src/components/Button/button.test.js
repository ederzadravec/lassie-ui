/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';

import { Button, Theme } from '../';

describe('Test Button', () => {
  it('is rendering', () => {
    const component = shallow(
      <Theme>
        <Button>CLIQUE AQUI</Button>
      </Theme>
    );

    expect(
      component
        .render()
        .find('text')
        .text()
    ).toEqual('CLIQUE AQUI');
  });

  it('is clickable', () => {
    let test = 0;

    const onPress = () => (test = 1);

    const component = shallow(
      <Theme>
        <Button disabled onPress={onPress}>
          CLIQUE AQUI
        </Button>
      </Theme>
    );

    component.find('Button').simulate('press');

    expect(test).toEqual(1);
  });
});
