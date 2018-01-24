import React from 'react'

const NameInput = ({ state, handleNameChange }) => (
    <div>
      nimi:
  <input
        value={state.newName}
        onChange={handleNameChange}
      />
    </div>
  )

  export default NameInput