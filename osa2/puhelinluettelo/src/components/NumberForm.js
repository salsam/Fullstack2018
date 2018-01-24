import React from 'react'
import NameInput from './NameInput'
import NumberInput from './NumberInput'

const NumberForm = ({ state, addNewPerson, handleNameChange, handleNumberChange }) => {
    return (
      <form onSubmit={addNewPerson}>
        <NameInput state={state} handleNameChange={handleNameChange} />
        <NumberInput state={state} handleNumberChange={handleNumberChange} />
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    )
  }

export default NumberForm