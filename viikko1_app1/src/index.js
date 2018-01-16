import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => (
    <h1>{props.kurssi}</h1>
)

const Osa = (props) => (
    <p>{props.osa.nimi} {props.osa.tehtavia} </p>
)

const Osat = (props) => {
    console.log(props.osat)
    return (
        <div>
            <Osa osa={props.osat[0]} />
            <Osa osa={props.osat[1]} />
            <Osa osa={props.osat[2]} />
        </div>
    )
}

const Yhteensa = (props) => (
    <p>yhteensä {props.osat[0].tehtavia 
        + props.osat[1].tehtavia 
        + props.osat[2].tehtavia} tehtävää</p>
)

//const Yhteensa = (props) 

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osat = [
        {
            nimi: 'Reactin perusteet',
            tehtavia: 10
        },
        {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
        },
        {
            nimi: 'Komponenttien tila',
            tehtavia: 14
        }
    ]

    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Osat osat={osat} />
            <Yhteensa osat={osat} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)