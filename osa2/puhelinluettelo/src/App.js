import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  addNewPerson = (event) => {
    event.preventDefault()
    const added = {name: this.state.newName}
    const persons= this.state.persons.concat(added)
    console.log(persons)
    this.setState({
      persons,
      newName: ''
    })
  }

  handleNameChange = (event) => {
    console.log(event.target)
    this.setState({ newName: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addNewPerson}>
          <div>
            nimi:
            <input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {this.state.persons.map(person => (
          <div key={person.name}>{person.name}</div>
        ))}
      </div>
    )
  }
}

export default App