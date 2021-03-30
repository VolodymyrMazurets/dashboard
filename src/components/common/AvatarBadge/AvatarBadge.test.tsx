import React from 'react';
import { shallow } from 'enzyme';
import { AvatarBadge } from './index';
import Icon from '../Icon';

describe('AvatarBadge', () => {
  test('render AvatarBadge', () => {
    const wrapper = shallow(<AvatarBadge />);

    expect(wrapper.length).toBe(1);
    expect(wrapper.is('.AvatarBadge')).toBeTruthy();
  });

  test('render AvatarBadge with custom class', () => {
    const testClass = 'test-class';
    const wrapper = shallow(<AvatarBadge className={testClass} />);

    expect(wrapper.is(`.${testClass}`)).toBeTruthy();
  });

  test('render AvatarBadge with name', () => {
    const name = 'test-name';
    const wrapper = shallow(<AvatarBadge name={name} />);

    expect(wrapper.html()).toMatch(name);
  });

  test('render AvatarBadge with children image', () => {
    const wrapper = shallow(
      <AvatarBadge>
        <Icon name="app" />
      </AvatarBadge>
    );

    expect(wrapper.html()).toMatch('.svg');
  });

  test('render AvatarBadge with size prop', () => {
    const size = 32;
    const wrapper = shallow(<AvatarBadge size={size} />);

    expect(wrapper.html()).toMatch(`width:${size}px`);
    expect(wrapper.html()).toMatch(`height:${size}px`);
  });

  test('render AvatarBadge with font-size prop', () => {
    const fontSize = 32;
    const wrapper = shallow(<AvatarBadge fontSize={fontSize} />);

    expect(wrapper.html()).toMatch(`font-size:${fontSize}px`);
  });

  test('render AvatarBadge with font-weight prop', () => {
    const fontWeight = 500;
    const wrapper = shallow(<AvatarBadge fontWeight={fontWeight} />);

    expect(wrapper.html()).toMatch(`font-weight:${fontWeight}`);
  });

  test('render AvatarBadge with vertical prop', () => {
    const wrapper = shallow(<AvatarBadge vertical />);

    expect(wrapper.is('._vertical')).toBeTruthy();
  });

  test('should execute “click” handler on AvatarBadge click', () => {
    const clickSpy = jest.fn();
    const wrapper = shallow(<AvatarBadge onClick={clickSpy} />);

    wrapper.simulate('click');
    expect(clickSpy).toHaveBeenCalled();
  });

  test('should not execute “click” handler on disabled AvatarBadge click', () => {
    const clickSpy = jest.fn();
    const wrapper = shallow(<AvatarBadge disabled onClick={clickSpy} />);

    wrapper.simulate('click');
    expect(clickSpy).not.toHaveBeenCalled();
    expect(wrapper.find('[disabled]').length).toBe(1);
  });
});
