import React from 'react'
import { filter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  handleChange = (event) => {
    const content = event.target.value
    this.props.filter(content)
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style} >
        filter < input onChange={this.handleChange} />
      </div >
    )
  }
}


export default connect(
  null,
  { filter },
)(Filter)