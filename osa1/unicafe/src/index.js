import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const keskiarvo = ({ hyva,neutraali,huono }) => {
    const yhteensa=hyva+neutraali+huono
    if (yhteensa === 0) return 0
    return Math.round(1000*(hyva-huono)/yhteensa)/1000
}

const positiivisuusProsentti = ({ hyva, neutraali, huono}) => {
    const yhteensa=hyva+neutraali+huono
    if (yhteensa === 0) return 0
    return Math.round(1000*hyva/yhteensa)/10
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    annaHyvaaPalautetta = () => this.setState({hyva: this.state.hyva + 1})
    annaNeutraaliaPalautetta = () => this.setState({neutraali: this.state.neutraali + 1})
    annaHuonoaPalautetta = () => this.setState({huono: this.state.huono + 1})
    
    render() {
        return (
            <div>
                <h1>anna palautetta</h1>
                <Button handleClick={this.annaHyvaaPalautetta} text="hyvä"/>
                <Button handleClick={this.annaNeutraaliaPalautetta} text="neutraali"/>
                <Button handleClick={this.annaHuonoaPalautetta} text="Huono"/>
                <h1>statistiikka</h1>
                <div>hyvä {this.state.hyva}</div>
                <div>neutraali {this.state.neutraali}</div>
                <div>huono {this.state.huono}</div>
                <div>keskiarvo {keskiarvo(this.state)}</div>
                <div>positiivisia {positiivisuusProsentti(this.state)}%</div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
