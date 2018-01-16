import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => (
    <h1>{props.kurssi.nimi}</h1>
)

const Osa = (props) => (
    <p>{props.osa.nimi} {props.osa.tehtavia} </p>
)

const Osat = (props) => {
    console.log(props.kurssi.osat)
    return (
        <div>
            <Osa osa={props.kurssi.osat[0]} />
            <Osa osa={props.kurssi.osat[1]} />
            <Osa osa={props.kurssi.osat[2]} />
        </div>
    )
}

const Yhteensa = (props) => (
    <p>yhteensä {props.kurssi.osat[0].tehtavia
        + props.kurssi.osat[1].tehtavia
        + props.kurssi.osat[2].tehtavia} tehtävää</p>
)

//const Yhteensa = (props) 

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
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
    }

    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Osat kurssi={kurssi} />
            <Yhteensa kurssi={kurssi} />
        </div >
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)