import React from 'react';
import Numbers from './components/Numbers'
import FilterField from './components/FilterField'
import NumberForm from './components/NumberForm'
import personService from './services/Persons'
import Message from './components/Message'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: { text: null, type: null }
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(persons => this.setState({ persons: persons }))
  }

  changePerson = (id, newPerson) => {
    personService
    .update(id, newPerson)
    .then(changed => this.setState({
      persons: this.state.persons.map(person => person.id === id ? changed : person),
      newName: '',
      newNumber: '',
      message: {
        text: `henkilön ${newPerson.name} numeroksi vaihdettu ${newPerson.number}`,
        type: 'change'
      }
    }))
    .catch(error => {
      this.componentWillMount()
      this.createPerson(newPerson)
    })
  }

  createPerson = (newPerson) => {
    personService
    .create(newPerson)
    .then(persons => this.setState({
      persons: this.state.persons.concat(newPerson),
      newName: '',
      newNumber: '',
      message: { text: `lisättiin ${newPerson.name}`, type: 'add' }
    }))
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
        this.changePerson(id, newPerson)
        return
      }
    } else {
      this.createPerson(newPerson)
    }

    setTimeout(() => {
      this.setState({
        message: { text: null, type: null }
      })
    }, 5000)
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
        persons: this.state.persons.filter(person => person.id !== id),
        message: {
          text: `poistettu ${name}`,
          type: "delete"
        }
      })

      setTimeout(() => {
        this.setState({
          message: { text: null, type: null }
        })
      }, 5000)
    }
  }

  render() {
    return (
      <div>
        {Message(this.state.message)}
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