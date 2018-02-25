import React from 'react'
import { voteCreation } from '../reducers/anecdoteReducer'
import { notificationCreation } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  handleVote = (content, id) => () => {
    this.props.voteCreation(id)
    this.props.notificationCreation(`you voted for ${content}`)
    setTimeout(() => this.props.notificationCreation(''), 5000)
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
  { voteCreation, notificationCreation }
)(AnecdoteList)