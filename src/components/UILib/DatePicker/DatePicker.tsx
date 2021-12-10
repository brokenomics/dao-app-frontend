import React from 'react';
import cn from 'classnames';
import { first } from 'lodash';
import { format } from 'date-fns';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { Icon } from '../Icon';
import { Button } from '../Button';
import { Dropdown } from '../dropdowns/Dropdown';
import { SelectParent } from '../dropdowns/SelectParent';

import { handleEnterKeyPress } from '../../../utils/keyHandleUtils';

import s from './DatePicker.module.scss';

export interface DatePickerProps {
  label: string;
  className?: string;
  startDate?: Date;
  endDate?: Date;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  className,
}) => {
  const [open, setOpen] = React.useState(false);

  const [isStartDate, setIsStartDate] = React.useState(true);
  const [localDate, setLocalDate] = React.useState<Date>();

  function renderLabel() {
    return (
      <div className={s.label}>
        <Icon name="calendar" className={s.icon} />
        {label}:
      </div>
    );
  }

  function getSetMethod() {
    return isStartDate ? setStartDate : setEndDate;
  }

  function onApply() {
    getSetMethod()(localDate);
    setOpen(false);
  }

  function onClear() {
    getSetMethod()(undefined);
    setOpen(false);
  }

  function renderDatePicker() {
    return (
      <div className={s.popup}>
        <ReactDatePicker
          formatWeekDay={(nameOfDay) => nameOfDay.substr(0, 3)}
          onChange={(val) => {
            const date = first<Date>(val as Date[]) || new Date();

            setLocalDate(date);
          }}
          selectsRange
          inline
          selected={localDate}
        />
        <div className={s.buttons}>
          <Button
            size="sm"
            variant="monochrome"
            className={s.button}
            onClick={onClear}
          >
            Clear
          </Button>
          <Button
            size="sm"
            variant="outline"
            className={cn(s.button, s.applyButton)}
            onClick={onApply}
          >
            Apply
          </Button>
        </div>
      </div>
    );
  }

  function onDateClick(isStart: boolean) {
    setOpen(true);
    setIsStartDate(isStart);
    setLocalDate(isStart ? startDate : endDate);
  }

  function onStartClick() {
    onDateClick(true);
  }

  function onEndClick() {
    onDateClick(false);
  }

  function getValue() {
    const FORMAT = 'MM/dd/yyyy';
    const start = startDate ? format(startDate, FORMAT) : 'mm/dd/yyyy';
    const end = endDate ? format(endDate, FORMAT) : 'mm/dd/yyyy';

    return (
      <>
        <span
          onClick={onStartClick}
          role="button"
          tabIndex={0}
          onKeyPress={handleEnterKeyPress(onStartClick)}
          className={s.date}
        >
          {start} -{' '}
        </span>
        <span
          onClick={onEndClick}
          role="button"
          tabIndex={0}
          onKeyPress={handleEnterKeyPress(onEndClick)}
          className={s.date}
        >
          {end}
        </span>
      </>
    );
  }

  return (
    <div className={cn(s.root, className)}>
      <Dropdown
        isOpen={open}
        parent={
          <SelectParent
            label={renderLabel()}
            value={getValue()}
            open={open}
            hideArrow
          />
        }
        onOpenUpdate={setOpen}
        preventOpenThroughParent
      >
        {renderDatePicker()}
      </Dropdown>
    </div>
  );
};

export default DatePicker;
