import React from 'react';
import PropTypes from 'prop-types';

import TaskFilter from '../task-filter';
import './footer.css'

function Footer({ toDo, filter, onFilter, clearTask }) {
  Footer.propTypes = {
    onFilter: PropTypes.func,
    clearTask: PropTypes.func,
    toDo: PropTypes.number,
    filter: PropTypes.string,
  }

  Footer.defaultProps = {
    onFilter: PropTypes.func,
    clearTask: PropTypes.func,
    toDo: PropTypes.number,
    filter: PropTypes.string,
  }

  return (
    <footer className="footer">
      <span className="todo-count"> {toDo} items left</span>
      <TaskFilter filter={filter} onFilter={onFilter} />
      <button type="button" className="clear-completed" onClick={clearTask}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
