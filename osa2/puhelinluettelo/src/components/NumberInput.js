import React from 'react'

const NumberInput = ({ state, handleNumberChange }) => (
    <div>
      numero:
  <input
        value={state.newNumber}
        onChange={handleNumberChange}
      />
    </div>
  )

export default NumberInput