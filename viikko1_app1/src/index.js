import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => (
    <h1>{props.kurssi}</h1>
)

const Osa = (props) => (
    <p>{props.nimi} {props.tehtavia} </p>
)

const Osat = (props) => {
    console.log(props.osat)
    return (
    <div>
        <Osa nimi={props.osat[0]} tehtavia={props.tehtavamaarat[0]} />
        <Osa nimi={props.osat[1]} tehtavia={props.tehtavamaarat[1]} />
        <Osa nimi={props.osat[2]} tehtavia={props.tehtavamaarat[2]} />
    </div>
    )
}

const Yhteensa = (props) => (
    <p>yhteensä {props.summa} tehtävää</p>
)

//const Yhteensa = (props) 

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14
  const osat = [osa1, osa2, osa3]
  const tehtavamaarat=[
      tehtavia1,
      tehtavia2,
      tehtavia3
  ]
  const summa=tehtavia1+tehtavia2+tehtavia3
  const summatest=tehtavamaarat.reduce((a,b) => a+b,0)
  console.log(summatest)

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Osat osat={osat} tehtavamaarat={tehtavamaarat}/>
      <Yhteensa summa={summa} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)