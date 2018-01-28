import React from 'react'

const Numbers = ({ state, remove }) => (
    <div>
        <h2>Numerot</h2>
        {state.persons
            .filter(person => person.name
                .match(new RegExp(state.filter, 'gi')))
            .map(person => (
                <div key={person.name}>{person.name} {person.number}
                    <button onClick={remove(person.name)}>poista</button>
                </div>
            ))}
    </div>
)

export default Numbers