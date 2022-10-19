import React, { Component } from 'react'

import NewTaskForm from '../new-task-form'
import Footer from '../footer'
import TaskList from '../task-list'

import './app.css'

export default class App extends Component {
  maxId = 100

  state = {
    todoData: [
      {
        label: 'Completed task',
        id: 1,
        active: true,
        edit: false,
        date: Date.now(),
      },
      {
        label: 'Editing task',
        id: 2,
        active: true,
        edit: false,
        date: Date.now(),
      },
      {
        label: 'Active task',
        id: 3,
        active: true,
        edit: false,
        date: Date.now(),
      },
    ],
    term: '',
    filter: 'all',
  }

  renameItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]
      const newItem = { ...oldItem, active: !oldItem.active }

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  editItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]
      const newItem = { ...oldItem, edit: !oldItem.edit }

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  delateItem = (id) => {
    this.setState(({ todoData }) => {
      const delIndx = todoData.findIndex((el) => el.id === id)
      todoData.slice(delIndx, 1)

      const newArray = [...todoData.slice(0, delIndx), ...todoData.slice(delIndx + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  addIteem = (text) => {
    const newItem = {
      label: text[0].toUpperCase() + text.substring(1),
      id: this.maxId++,
      active: true,
      edit: false,
      date: Date.now(),
    }

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem]

      return {
        todoData: newArray,
      }
    })
  }

  editTask = (text, label) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.label === label)

      const oldItem = todoData[idx]
      const newItem = { ...oldItem, edit: !oldItem.edit, label: text }

      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]

      return {
        todoData: newArray,
      }
    })
  }

  search(items, term) {
    if (term.length === 0) {
      return items
    }

    return items.filter((item) => {
      return item.label.indexOf(term) > -1
    })
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => item.active)
      case 'completed':
        return items.filter((item) => !item.active)
      default:
        return items
    }
  }

  onFilter = (filter) => {
    this.setState({ filter })
  }

  clearTask = () => this.setState({ todoData: this.state.todoData.filter((el) => el.active) })

  render() {
    const { todoData, term, filter } = this.state

    const visibleItems = this.filter(this.search(todoData, term), filter)

    const todoCount = this.state.todoData.filter((el) => el.active).length

    return (
      <section className="todoapp">
        <NewTaskForm addIteem={this.addIteem} />
        <section className="main">
          <TaskList
            todos={visibleItems}
            onRename={this.renameItem}
            onDelate={this.delateItem}
            onEdit={this.editItem}
            editTask={this.editTask}
          />
          <Footer
            todos={visibleItems}
            toDo={todoCount}
            filter={filter}
            onFilter={this.onFilter}
            clearTask={this.clearTask}
          />
        </section>
      </section>
    )
  }
}
