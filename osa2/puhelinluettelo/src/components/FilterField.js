import React from 'react'

const FilterField = ({ filter, handleFilterChange }) => (
    <div>rajaa näytettäviä
    <input
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )

export default FilterField