import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../task'
import './task-list.css'

export default class TaskList extends Component {
  static propTypes = {
    todos: PropTypes.array,
    onRename: PropTypes.func,
    onDelate: PropTypes.func,
    onEdit: PropTypes.func,
    editTask: PropTypes.func,
  }

  render() {
    const { todos, onRename, onDelate, onEdit, editTask } = this.props

    const elements = todos.map((item) => {
      const { active, edit, ...itemProps } = item

      return (
        <li key={item.id} className={` ${edit ? 'editing' : `${active ? 'active' : 'completed'}`}`}>
          <Task
            {...itemProps}
            onRename={() => onRename(item.id)}
            onDelate={() => onDelate(item.id)}
            onEdit={() => onEdit(item.id)}
            editTask={editTask}
          />
        </li>
      )
    })

    return <ul className="todo-list">{elements}</ul>
  }
}
