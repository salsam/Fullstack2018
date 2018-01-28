import React from 'react';
import Numbers from './components/Numbers'
import FilterField from './components/FilterField'
import NumberForm from './components/NumberForm'
import personService from './services/Persons'

class App extends React.Component {
  constructor(props) {
    console.log('constructor')
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentWillMount() {
    console.log("mounting")
    personService
      .getAll()
      .then(persons => this.setState({ persons: persons }))
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

    personService
      .create(added)
      .then(persons => this.setState({
        persons: this.state.persons.concat(added),
        newName: '',
        newNumber: ''
      }))
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
    console.log('render')
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <FilterField filter={this.state.filter} handleFilterChange={this.handleFilterChange} />
        <h2>Lisää uusi numero</h2>
        <NumberForm state={this.state} addNewPerson={this.addNewPerson}
          handleNameChange={this.handleNameChange} handleNumberChange={this.handleNumberChange} />
        <Numbers state={this.state} />
      </div>
    )
  }
}

export default App