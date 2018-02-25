import React from 'react'
import { initializeAnecdotes, vote } from '../reducers/anecdoteReducer'
import { notifyWith } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => async () => {
    this.props.vote(anecdote)
    this.props.notifyWith(`you voted for ${anecdote.content}`,5)
  }

  componentDidMount() {
    this.props.initializeAnecdotes()
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotesToShow.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.handleVote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const filteredAncedotes = (anecdotes, filter) => {
  return anecdotes
    .filter(anecdote => anecdote.content.match(new RegExp(filter, 'gi')))
    .sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: filteredAncedotes(state.anecdotes, state.filter)
  }
}
export default connect(
  mapStateToProps,
  { initializeAnecdotes, vote, notifyWith }
)(AnecdoteList)