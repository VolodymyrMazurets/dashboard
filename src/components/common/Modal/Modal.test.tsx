import React from 'react';
import { shallow, mount } from 'enzyme';
import { Modal } from './index';

describe('Modal', () => {
  test('render Modal', () => {
    const wrapper = shallow(<Modal />);

    expect(wrapper.length).toBe(1);
  });

  test('render Modal with custom class', () => {
    const testClass = 'test-class';
    const wrapper = shallow(<Modal className={testClass} />);

    expect(wrapper.is(`.${testClass}`)).toBeTruthy();
  });

  test('render Modal with title', () => {
    const title = 'test-title';
    const wrapper = mount(<Modal title={title} visible={true} />);

    expect(wrapper.html()).toMatch(title);
  });

  test('render Modal with content', () => {
    const content = 'Test Content';
    const wrapper = mount(
      <Modal visible>
        <p>{content}</p>
      </Modal>
    );

    expect(wrapper.html()).toMatch(content);
  });

  test('render Modal with custom name primary button', () => {
    const name = 'Test-Apply';
    const wrapper = mount(<Modal visible okText={name} />);

    expect(wrapper.html()).toMatch(name);
  });

  test('render Modal with custom name secondary button', () => {
    const name = 'Test-Cancel';
    const wrapper = mount(<Modal visible cancelText={name} />);

    expect(wrapper.html()).toMatch(name);
  });

  test('should execute “click” handler on primary button click', () => {
    const clickSpy = jest.fn();
    const wrapper = mount(<Modal visible onOk={clickSpy} />);

    wrapper.find('button.ant-btn-primary').simulate('click');
    expect(clickSpy).toHaveBeenCalled();
  });

  test('should execute “cancel” handler on close button click', () => {
    const clickSpy = jest.fn();
    const wrapper = mount(<Modal visible onCancel={clickSpy} />);

    wrapper.find('button[aria-label="Close"]').simulate('click');
    expect(clickSpy).toHaveBeenCalled();
  });

  test('should execute “cancel” handler on secondary button click', () => {
    const clickSpy = jest.fn();
    const wrapper = mount(<Modal visible onCancel={clickSpy} />);

    wrapper.find('button.ant-btn').first().simulate('click');
    expect(clickSpy).toHaveBeenCalled();
  });
});
