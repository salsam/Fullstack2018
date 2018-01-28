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
    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    }
    if (this.state.persons.some(person => person.name === newPerson.name)) {
      if (!window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        this.setState({
          newName: '',
          newNumber: ''
        })
        return
      } else {
        const id = this.state.persons.find(person => person.name === newPerson.name).id
        //console.log("updating id: "+id)
        personService
          .update(id, newPerson)
          .then(changed => this.setState({
            persons: this.state.persons.map(person => person.id === id ? changed : person),
            newName: '',
            newNumber: ''
          }))
        return
      }
    }

    personService
      .create(newPerson)
      .then(persons => this.setState({
        persons: this.state.persons.concat(newPerson),
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

  remove = (name) => () => {
    if (window.confirm(`poistetaanko ${name}?`)) {
      const id = this.state.persons.find(person => person.name === name).id
      personService.deleteItem(id)
      this.setState({
        persons: this.state.persons.filter(person => person.id !== id)
      })
    }
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
        <Numbers state={this.state} remove={this.remove} />
      </div>
    )
  }
}

export default App