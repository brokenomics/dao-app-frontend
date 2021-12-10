import React from 'react';
import cn from 'classnames';
import { get, isFunction } from 'lodash';
import { FixedSizeList } from 'react-window';
import { Column, Row, useFlexLayout, useTable } from 'react-table';

import s from './Table.module.scss';

export interface TableProps {
  rowHeight: number;
  tableHeight: number;
  className?: string;
  data: Record<string, unknown>[];
  columns: Column<Record<string, unknown>>[];
  onRowClick?: (row: Row) => void;
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  rowHeight,
  className,
  tableHeight,
  onRowClick,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useFlexLayout,
  );

  const renderRows = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];

      prepareRow(row);

      const rowClassName = cn(s.row, {
        [s.even]: index % 2 === 0,
        [s.clickable]: isFunction(onRowClick),
      });

      function handleClick() {
        if (isFunction(onRowClick)) {
          onRowClick(row);
        }
      }

      return (
        <>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            {...row.getRowProps({
              style,
            })}
            className={rowClassName}
            onClick={handleClick}
          >
            {row.cells.map((cell) => {
              const { render, getCellProps } = cell;

              return (
                <div
                  {...getCellProps()}
                  className={cn(s.cell, get(cell, 'column.cellClassName'))}
                >
                  {render('Cell')}
                </div>
              );
            })}
          </div>
        </>
      );
    },
    [prepareRow, rows, onRowClick],
  );

  return (
    <div {...getTableProps()} className={cn(s.root, className)}>
      <div>
        {headerGroups.map((headerGroup) => (
          <div {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              const { render, getHeaderProps } = column;

              return (
                <div
                  {...getHeaderProps()}
                  className={cn(s.headerCell, get(column, 'cellClassName'))}
                >
                  {render('Header')}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()}>
        <FixedSizeList
          height={tableHeight}
          itemCount={rows.length}
          itemSize={rowHeight}
          width="100%"
        >
          {renderRows}
        </FixedSizeList>
      </div>
    </div>
  );
};

export default Table;
