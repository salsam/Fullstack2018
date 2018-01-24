import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = ({ kurssi }) => (
    <h1>{kurssi.nimi}</h1>
)

const Osa = ({ osa }) => (
    <p>{osa.nimi} {osa.tehtavia} </p>
)

const Kurssi = ({ kurssi }) => (
    <div>
        <Otsikko kurssi={kurssi} />
        <Sisalto kurssi={kurssi} />
    </div >
)
const Sisalto = ({ kurssi }) => (
    kurssi.osat.map(osa => <Osa key={osa.id} osa={osa} />)
)

const Yhteensa = ({kurssi}) => (
    <p>yhteensä {kurssi.osat[0].tehtavia
        + kurssi.osat[1].tehtavia
        + kurssi.osat[2].tehtavia} tehtävää</p>
)

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10,
                id: 1
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7,
                id: 2
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14,
                id: 3
            }
        ]
    }

    return (
        <div>
            <Kurssi kurssi={kurssi} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)