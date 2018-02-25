
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

export const anecdoteCreation = (content) => {
  return {
    type: 'CREATE',
    content
  }
}

export const initAnecdotes = (content) => {
  return {
    type: 'INIT',
    content
  }
}

export const voteCreation = (id) => {
  return {
    type: 'VOTE',
    id
  }
}


export default anecdoteReducer