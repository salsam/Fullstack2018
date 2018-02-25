import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  console.log(action)
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes + 1 }]
  } else if (action.type === 'CREATE') {
    return [...store, action.content]
  } else if (action.type === 'INIT') {
    return action.content
  }

  return store
}

export const voteCreation = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export const vote = (old) => {
  return async (dispatch) => {
    const updated = { ...old, votes: old.votes + 1 }
    const response = await anecdoteService.update(updated.id, updated)
    dispatch({
      type: 'VOTE',
      id: updated.id
    })
  }
}

export const createNew = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      content: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      content: anecdotes
    })
  }
}


export default anecdoteReducer