import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notificationCreation } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit =  async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.create(content)
    this.props.anecdoteCreation(newAnecdote)
    setTimeout(() => this.props.notificationCreation(''), 5000)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { anecdoteCreation, notificationCreation }
)(AnecdoteForm)
