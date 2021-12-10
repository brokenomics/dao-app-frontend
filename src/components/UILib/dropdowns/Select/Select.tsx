import React from 'react';

import { Dropdown } from '../Dropdown';
import { SelectParent } from '../SelectParent';
import { SimpleDropdownList } from '../SimpleDropdownList';

import { BaseDropdownProps, onChangeType, OptionProps } from '../types';

export interface SelectProps extends BaseDropdownProps {
  className?: string;
  label?: React.ReactNode;
  value: OptionProps;
  options: OptionProps[];
  onChange: onChangeType;
  valueOnly?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  value,
  label,
  isOpen,
  options,
  className,
  onChange,
  valueOnly,
}) => {
  const [open, setOpen] = React.useState(isOpen);

  function onOptionClick(option: OptionProps) {
    onChange(option);
    setOpen(false);
  }

  return (
    <Dropdown
      parent={
        <SelectParent
          open={open}
          label={label}
          value={value.label}
          valueOnly={valueOnly}
          className={className}
        />
      }
      isOpen={open}
      onOpenUpdate={setOpen}
      options={{
        placement: 'bottom-start',
      }}
    >
      <SimpleDropdownList
        options={options}
        onChange={onOptionClick}
        value={value}
      />
    </Dropdown>
  );
};
