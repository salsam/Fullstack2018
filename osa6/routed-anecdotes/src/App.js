import React from 'react'
import { NavLink, BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Table, Grid, Image, Form, Button, Message, Menu, Segment } from 'semantic-ui-react'

class MenuComponent extends React.Component {
  state = { activeItem: 'anecdotes' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted>
        <Menu inverted secondary>
          <Menu.Item name='anecdotes' active={activeItem === 'anecdotes'} onClick={this.handleItemClick} color='red'>
            <NavLink exact to='/'>anecdotes </NavLink>
          </Menu.Item>
          <Menu.Item name='create' active={activeItem === 'create'} onClick={this.handleItemClick} color='red'>
            <NavLink exact to='/create'>create new</NavLink>
          </Menu.Item>
          <Menu.Item name='about' active={activeItem === 'about'} onClick={this.handleItemClick} color='red'>
            <NavLink exact to='/about'>about</NavLink>
          </Menu.Item>
        </Menu>
      </Segment>
    )
  }
}

const Anecdote = ({ anecdote }) => (
  <div>
    <h1>{anecdote.content} by {anecdote.author}</h1>
    <div> has {anecdote.votes} votes</div>
    <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id} >
            <Table.Cell>
              <Link to={`/notes/${anecdote.id}`} >{anecdote.content}</Link>
            </Table.Cell>
          </Table.Row>)}
      </Table.Body>
    </Table>
  </div>
)

const About = () => (
  <Grid>
    <br />
    <Grid.Row>
      <h2>About anecdote app</h2>
    </Grid.Row>
    <Grid.Row>
      <p>According to Wikipedia:</p>
    </Grid.Row>
    <Grid.Row stretched>
      <Grid.Column width={7}>
        <div>
          An anecdote is a brief, revealing account of an individual person or an incident.
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
          An anecdote is "a story with a point."
      </div>
      </Grid.Column>
      <Grid.Column width={3}>
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Edsger_Wybe_Dijkstra.jpg/450px-Edsger_Wybe_Dijkstra.jpg" />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <div>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</div>
    </Grid.Row>
  </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>content</label>
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>url for more info</label>
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field>
          <Button type='submit'>create</Button>
        </Form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: null
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote ${anecdote.content} created`
    })
    setTimeout(() => this.setState({ notification: null }), 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {

    return (
      <Container>
        <Router>
          <div>
            <h1>Software anecdotes</h1>
            <MenuComponent />
            {(this.state.notification &&
              <Message success>
                {this.state.notification}
              </Message>)}
            <Route exact path='/' render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path='/about' render={() => <About />} />
            <Route exact path='/create' render={({ history }) => <CreateNew addNew={this.addNew} history={history} />} />
            <Route exact path='/notes/:id' render={({ match }) =>
              <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
          </div>
        </Router>
        <div>
          <Footer />
        </div>
      </Container>
    );
  }
}

export default App;
