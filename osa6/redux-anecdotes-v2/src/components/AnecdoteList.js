import React from 'react'
import { voteCreation } from '../reducers/anecdoteReducer'
import { notificationCreation } from '../reducers/notificationReducer'
import Filter from './Filter'

class AnecdoteList extends React.Component {
  handleVote = (content, id) => () => {
    this.props.store.dispatch(voteCreation(id))
    this.props.store.dispatch(notificationCreation(`you voted for ${content}`))
    setTimeout(() => this.props.store.dispatch(notificationCreation('')), 5000)
  }


  render() {
    const state = this.props.store.getState()
    const anecdotes = state.anecdotes
      .filter(anecdote => anecdote.content.match(new RegExp(state.filter, 'gi')))
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store} />
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleVote(anecdote.content, anecdote.id)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
