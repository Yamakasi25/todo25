import React, { Component } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'
import './task.css'

export default class Task extends Component {
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }
  onSubmit = (e) => {
    e.preventDefault()
    this.props.editTask(this.state.label, this.props.label)
  }
  static propTypes = {
    label: PropTypes.string,
    onRename: PropTypes.func,
    date: PropTypes.number,
    onDelate: PropTypes.func,
    onEdit: PropTypes.func,
  }

  static defaultProps = {
    date: '5 min ago',
  }

  render() {
    const { label, onRename, onDelate, onEdit, date } = this.props

    return (
      <React.Fragment>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={onRename} />
          <label>
            <span className="description completed">{label}</span>
            <span className="created">
              {formatDistanceToNow(date, {
                includeSeconds: true,
                addSuffix: true,
              })}{' '}
            </span>
          </label>
          <button className="icon icon-edit" onClick={onEdit}></button>
          <button className="icon icon-destroy" onClick={onDelate}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" defaultValue={label} onChange={this.onLabelChange} />
        </form>
      </React.Fragment>
    )
  }
}
