import React from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import cn from 'classnames';

import { Icon } from '../Icon';

import s from './Pagination.module.scss';

export interface PaginationProps
  extends Pick<
    ReactPaginateProps,
    Exclude<
      keyof ReactPaginateProps,
      'marginPagesDisplayed' | 'pageRangeDisplayed'
    >
  > {
  className?: string;
  marginPagesDisplayed?: number;
  pageRangeDisplayed?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  pageCount,
  marginPagesDisplayed = 4,
  pageRangeDisplayed = 4,
  className,
  ...rest
}) => {
  function renderPreviousLabel() {
    return (
      <div className={s.prev}>
        <Icon name="arrow-up" className={s.arrow} />
        <span>Prev</span>
      </div>
    );
  }

  function renderNextLabel() {
    return (
      <div className={s.next}>
        <span>Next</span>
        <Icon name="arrow-up" className={s.arrow} />
      </div>
    );
  }

  return (
    <ReactPaginate
      {...rest}
      containerClassName={cn(s.root, className)}
      pageCount={pageCount}
      marginPagesDisplayed={marginPagesDisplayed}
      pageRangeDisplayed={pageRangeDisplayed}
      previousLabel={renderPreviousLabel()}
      nextLabel={renderNextLabel()}
      previousLinkClassName={s.prevBlock}
      nextLinkClassName={s.nextBlock}
      pageClassName={s.page}
      pageLinkClassName={s.pageLink}
      disabledClassName={s.disabledPrevNext}
      activeClassName={s.active}
    />
  );
};
