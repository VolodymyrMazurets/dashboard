import './DropdownSelect.scss';

import { Divider, Select } from 'antd';

import { FC } from 'react';
import Icon from '../Icon';
import React from 'react';
import { SelectProps } from 'antd/lib/select';
import classNames from 'classnames';

const { Option } = Select;

interface OptionType {
  label?: string;
  value?: string;
}

interface Props extends SelectProps<OptionType['value']> {
  data?: OptionType[];
}

export const DropdownSelect: FC<Props> = (props) => {
  const { className, placeholder, data = [] } = props;
  return (
    <Select
      {...props}
      suffixIcon={<Icon name="angle-down" size={22} />}
      bordered={false}
      dropdownMatchSelectWidth={220}
      menuItemSelectedIcon={<Icon name="check" size={18} />}
      dropdownClassName="DropdownSelect__dropdown"
      className={classNames('DropdownSelect', className)}
      placeholder={placeholder}
      dropdownRender={(menu) => (
        <div>
          <header className="DropdownSelect__header">header</header>
          <Divider type="horizontal" className="_marginless" />
          {menu}
        </div>
      )}
      getPopupContainer={() => document.getElementById('mainApp') as HTMLElement}
    >
      {data.map(({ label, value }) => (
        <Option value={value || ''} key={value}>
          {label}
        </Option>
      ))}
    </Select>
  );
};
