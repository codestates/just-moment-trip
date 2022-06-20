/* eslint-disable no-console */
/* eslint-disable react/prop-types */

import React from 'react';
import { PageLi, PageSpan, PageUl } from './styles';

function Pagination({ paginate, totalDatas, postsPerPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalDatas / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav>
        <PageUl className="pagination">
          {pageNumbers.map(num => (
            <PageLi key={num} className="page-data">
              <PageSpan
                onClick={() => {
                  paginate(num);
                }}
                className="page-link"
              >
                {num}
              </PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </nav>
    </div>
  );
}
export default Pagination;
