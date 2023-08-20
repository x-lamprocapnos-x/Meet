import React from 'react';

const NumberOfEvents = ({events}) => {
    const handleInputChanged = (event) => {
        const value = event.target.value;
    }

    return( 
    <div>
        <input
        type='text'
        defaultValue='32'
        onChange={handleInputChanged}
        />

    </div>


)};

export default NumberOfEvents;
