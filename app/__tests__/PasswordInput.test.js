import React from 'react';
import { shallow } from 'enzyme';
import './setup';
import PasswordValidator from '../containers/PasswordValidator';

describe('testing password input', () => {
  const validatorComponent = shallow(<PasswordValidator />);
  const input = validatorComponent.find('PasswordInput');

  test('it properly updates password state', () => {
    const password = 'supercoolPassword';
    input.prop('onChange')(password);
    validatorComponent.update();
    expect(validatorComponent.state('password')).toEqual(password);
  });

  test('notifies if password is wrong length', () => {
    const shortPassword = 'smol';
    input.prop('onChange')(shortPassword);
    input.prop('validatePassword')(shortPassword);
    validatorComponent.update();
    expect(validatorComponent.state('messages')).toContain('Password must be between 8 and 64 characters.');
  });

  test('notifies is password is non ascii', () => {
    const nonAscii = 'ÐÐÐ';
    input.prop('onChange')(nonAscii);
    input.prop('validatePassword')(nonAscii);
    validatorComponent.update();
    expect(validatorComponent.state('messages')).toContain('Password must contain only ASCII characters.');
  });

  // Todo: add mocks so this passes
  test('notifies if password is not unique', () => {
    const lazyPassword = 'test';
    input.prop('onChange')(lazyPassword);
    input.prop('validatePassword')(lazyPassword);
    validatorComponent.update();
    expect(validatorComponent.state('messages')).toContain('Please choose a more unique password.');
  });
});
