import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
)

const keskiarvo = ({ hyva, neutraali, huono }) => {
    const yhteensa = hyva + neutraali + huono
    if (yhteensa === 0) return 0
    return Math.floor(1000 * (hyva - huono) / yhteensa) / 1000
}

const positiivisuusProsentti = ({ hyva, neutraali, huono }) => {
    const yhteensa = hyva + neutraali + huono
    if (yhteensa === 0) return 0
    return Math.floor(1000 * hyva / yhteensa) / 10
}

const Statistic = ({ value, text, textafter }) => (
    <tr>
        <td>{text}</td>
        <td>{value} {textafter}</td>
    </tr>
)

const Statistics = (props) => {
    if (props.hyva + props.neutraali + props.huono === 0) {
        return (
            <div>
                <em>ei yhtään palautetta annettu</em>
            </div>
        )
    }

    return (
        <table>
            <tbody>
                <Statistic value={props.hyva} text="hyvä" />
                <Statistic text="neutraali" value={props.neutraali} />
                <Statistic text="huono" value={props.huono} />
                <Statistic text="keskiarvo" value={keskiarvo(props)} />
                <Statistic text="positiivisia" value={positiivisuusProsentti(props)} textafter="%" />
            </tbody>
        </table>
    )
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

    annaPalautetta = (tyyppi, arvo) => () => this.setState({ [tyyppi + ""]: arvo })

    render() {
        return (
            <div>
                <h1>anna palautetta</h1>
                <Button handleClick={this.annaPalautetta("hyva", this.state.hyva + 1)} text="hyvä" />
                <Button handleClick={this.annaPalautetta("neutraali", this.state.neutraali + 1)} text="neutraali" />
                <Button handleClick={this.annaPalautetta("huono", this.state.huono + 1)} text="Huono" />
                <h1>statistiikka</h1>
                {Statistics(this.state)}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
