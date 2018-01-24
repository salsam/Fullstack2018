import React from 'react'

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
        <Yhteensa kurssi={kurssi} />
    </div >
)
const Sisalto = ({ kurssi }) => (
    kurssi.osat.map(osa => <Osa key={osa.id} osa={osa} />)
)

const Yhteensa = ({ kurssi }) => (
    <p>
        yhteensä {kurssi.osat.map(osa => osa.tehtavia).reduce((a, b) => a + b)} tehtävää
    </p>
)


export default Kurssi