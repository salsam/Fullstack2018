import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: '',
      newNumber: ''
    }
  }

  addNewPerson = (event) => {
    event.preventDefault()
    const added = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    if (this.state.persons.some(person => person.name === added.name)) {
      alert("Name already exists!")
      this.setState({ newName: '' })
      return
    }
    const persons = this.state.persons.concat(added)
    console.log(persons)
    this.setState({
      persons,
      newName: '',
      newNumber: ''
    })
  }

  handleNameChange = (event) => {
    console.log(event.target)
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    console.log(event.target)
    this.setState({ newNumber: event.target.value })
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
            numero:
            <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {this.state.persons.map(person => (
          <div key={person.name}>{person.name} {person.number}</div>
        ))}
      </div>
    )
  }
}

export default App