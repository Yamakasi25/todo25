import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './task-filter.css'

export default class TaskFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]
  static propTypes = {
    filter: PropTypes.string,
    onFilter: PropTypes.func,
  }
  render() {
    const { filter, onFilter } = this.props

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name
      const clazz = isActive ? 'selected' : ''
      return (
        <li key={name}>
          <button type="button" className={`${clazz}`} key={name} onClick={() => onFilter(name)}>
            {label}
          </button>
        </li>
      )
    })

    return <ul className="filters">{buttons}</ul>
  }
}
