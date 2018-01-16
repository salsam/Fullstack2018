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
    <p>yhteensä {props.summa} tehtävää</p>
)

//const Yhteensa = (props) 

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = {
      nimi: 'Reactin perusteet',
      tehtavia: 10
    }
    const osa2 = {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    }
    const osa3 = {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }
    const osat = [osa1, osa2, osa3]
    const summa=osa1.tehtavia+osa2.tehtavia+osa3.tehtavia

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Osat osat={osat}/>
      <Yhteensa summa={summa} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)