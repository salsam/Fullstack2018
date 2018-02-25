
const filterReducer = (state='', action) => {
  if (action.type === 'FILTER') {
    return action.content
  }
  return state
}

export const filter = (content) => {
  return {
    type: 'FILTER',
    content
  }
}

export default filterReducer