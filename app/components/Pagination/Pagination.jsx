/*
  Pagination
*/

import React from 'react';
import { Link } from 'react-router';

class Pagination extends React.Component {
  constructor() {
    super();
  }

  createPaginationArray(current, total) {
    const paginationArray = [];

    const start = parseInt(current) - 4,
          end = parseInt(current) + 4;

    for (let i = start; i <= end; i++) {
      if (i >= 1 && i <= total) {
        paginationArray.push(i);
      }
    }

    return paginationArray;
  }

  render() {
    const page = parseInt(this.props.page),
          query = this.props.query,
          total = this.props.total;

    const pagination = {
      firstClass: page === 1 ? 'disabled' : '',
      prevClass: page === 1 ? 'disabled' : '',
      prevLink: page === 1 ? 1 : page - 1,
      numbers: this.createPaginationArray(page, total),
      nextClass: page === total ? 'disabled' : '',
      nextLink: page === total ? total : page + 1,
      lastClass: page === total ? 'disabled' : '',
    }

    return (
      <nav className="pagination">
        <ul>
          <li className={pagination.firstClass}><Link to={`/${query}/1`}>&laquo;</Link></li>
          <li className={pagination.prevClass}><Link to={`/${query}/${pagination.prevLink}`}>&lsaquo;</Link></li>

          {pagination.numbers.map((number, key) => {
            const currentClass = number === page ? 'active' : '';
            return (
              <li key={key} className={currentClass}>
                <Link to={`/${query}/${number}`}>{number}</Link>
              </li>
            )
          })}

          <li className={pagination.nextClass}><Link to={`/${query}/${pagination.nextLink}`}>&rsaquo;</Link></li>
          <li className={pagination.lastClass}><Link to={`/${query}/${total}`}>&raquo;</Link></li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
