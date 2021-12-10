import React from 'react';
import cn from 'classnames';
import { map } from 'lodash';
import { useSelector } from 'react-redux';

import { DatePicker, TagButton } from '../../../components/UILib';

import { FILTER_NAMES, FiltersInterface } from '../../../features/voting/types';

import { selectVotingListStatusesWithNumbers } from '../../../store/voting';

import s from './FilterBlock.module.scss';

interface FilterBlockProps {
  filters: FiltersInterface;
  updateFilter: (key: FILTER_NAMES, val: unknown) => void;
}

export const FilterBlock: React.FC<FilterBlockProps> = ({
  filters,
  updateFilter,
}) => {
  const votingStatusesWithNumbers = useSelector(
    selectVotingListStatusesWithNumbers,
  );

  function getUpdateFilterMethod(key: FILTER_NAMES) {
    return (val: unknown) => updateFilter(key, val);
  }

  function renderStatusFilter() {
    function getUpdateStatusMethod(value: string) {
      const method = getUpdateFilterMethod(FILTER_NAMES.STATUS);

      return () => method(value);
    }

    return (
      <div className={cn(s.filterBlock, s.statusFilterBlock)}>
        <span>Status</span>
        {map(votingStatusesWithNumbers, (number: number, status: string) => (
          <TagButton
            key={status}
            color="green"
            className={s.statusFilterTag}
            active={filters[FILTER_NAMES.STATUS] === status}
            onClick={getUpdateStatusMethod(status)}
            tail={number.toString()}
          >
            {status}
          </TagButton>
        ))}
      </div>
    );
  }

  function renderDatePicker() {
    function getUpdateDate(key: string) {
      const method = getUpdateFilterMethod(FILTER_NAMES.DATE);

      return (val: Date | undefined) => {
        method({
          ...filters[FILTER_NAMES.DATE],
          [key]: val,
        });
      };
    }

    return (
      <DatePicker
        label="Vote launch"
        startDate={filters[FILTER_NAMES.DATE].startDate}
        endDate={filters[FILTER_NAMES.DATE].endDate}
        setStartDate={getUpdateDate('startDate')}
        setEndDate={getUpdateDate('endDate')}
      />
    );
  }

  return (
    <div className={s.filterBlock}>
      {renderStatusFilter()}
      {renderDatePicker()}
    </div>
  );
};
