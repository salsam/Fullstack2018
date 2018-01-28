import React from 'react';
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    console.log("constructor")
    super(props)
    this.state = {
      filter: '',
      countries: []
    }
  }

  componentWillMount() {
    console.log("will mount")
    let resp = axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
    console.log(resp)
  }

  updateFilter = (event) => {
    console.log("updating filter")
    this.setState({ filter: event.target.value })
  }

  details = (name) => () => {
    console.log("details " + name)
    this.setState({filter: name})
  }

  displayMatched = (matched) => {
    console.log(matched.length)
    if (matched.length === 1) {
      console.log(matched)
      const mats = matched[0]
      return (
        <div>
          <h1>{mats.name}</h1>
          <div>capital {mats.capital}</div>
          <div>population {mats.population}</div>
          <img src={mats.flag} alt="National flag" width="300" height="200" />
        </div>
      )
    } else if (matched.length < 11) {
      console.log("<11")
      return matched.map(mats =>
        <div key={mats.name} onClick={this.details(mats.name)}>
          {mats.name}
        </div>)
    } else return <div>too many matched, specify another filter</div>
  }

  render() {
    console.assert("render")
    const matched = this.state.countries
      .filter(country => country.name.match(new RegExp(this.state.filter, 'gi')))
    return (
      <div>
        <form>
          <input
            onChange={this.updateFilter}
            value={this.state.filter}
          />
        </form>
        {this.displayMatched(matched)}
      </div>
    );
  }
}

export default App;
