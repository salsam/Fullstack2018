import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
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

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
          <div>rajaa näytettäviä
          <input
              value={this.state.filter}
              onChange={this.handleFilterChange}
            />
          </div>
        <h2>Lisää uusi numero</h2>
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
        {this.state.persons.filter(person => person.name.match(new RegExp(this.state.filter, 'gi'))).map(person => (
          <div key={person.name}>{person.name} {person.number}</div>
        ))}
      </div>
    )
  }
}

export default App