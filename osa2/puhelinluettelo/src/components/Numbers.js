import React from 'react'

const Numbers = ({ state }) => (
    <div>
        <h2>Numerot</h2>
        {state.persons
            .filter(person => person.name
                .match(new RegExp(state.filter, 'gi')))
            .map(person => (
                <div key={person.name}>{person.name} {person.number}</div>
            ))}
    </div>
)

export default Numbers