import React from 'react'
import { voteCreation, initAnecdotes } from '../reducers/anecdoteReducer'
import { notificationCreation } from '../reducers/notificationReducer'
import Filter from './Filter'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  handleVote = (anecdote) => async () => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const response = await anecdoteService.update(anecdote.id, updatedAnecdote)
    //Lazy, should just replace the whole object in frontend as well
    this.props.voteCreation(anecdote.id)
    this.props.notificationCreation(`you voted for ${anecdote.content}`)
    setTimeout(() => this.props.notificationCreation(''), 5000)
  }

  componentDidMount = async () => {
    const anecdotes = await anecdoteService.getAll()
    this.props.initAnecdotes(anecdotes)
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
  { voteCreation, notificationCreation, initAnecdotes }
)(AnecdoteList)