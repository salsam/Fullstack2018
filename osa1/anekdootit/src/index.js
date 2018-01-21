import React from 'react'
import ReactDOM from 'react-dom'

const mostVotes = (props) => {
    const max= props.votes.reduce((a,b) => Math.max(a,b))
    const best=props.votes.indexOf(max)

    return (
        <div>
            <div>{props.anecdotes[best]}</div>
            <div> has {props.votes[best]} votes</div>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: new Array(anecdotes.length).fill(0)
        }
    }

    selectAnecdote = (num) => () => this.setState({ selected: num })
    sa = () => this.selectAnecdote(Math.floor(Math.random() * anecdotes.length))
    vote = () => () => {
        var temp = this.state.votes
        temp[this.state.selected]++
        this.setState({ votes: temp })
    }

    render() {
        return (
            <div>
                {this.props.anecdotes[this.state.selected]}
                <div>has {this.state.votes[this.state.selected]} voted</div>
                <br />
                <button onClick={this.vote()}>vote</button>
                <button onClick={this.sa()}>next anecdote</button>
                <h1>anecdote with most votes</h1>
                {mostVotes({
                    votes: this.state.votes,
                anecdotes: this.props.anecdotes
                })}
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)