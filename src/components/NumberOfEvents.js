import React from 'react';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    const handleInputChanged = (event) => {
        const value = event.target.value;
        setCurrentNOE(value);


        let infoText;
        if (isNaN(value) || value <= 0) {
            infoText = 'Please enter a number greater than 0.';
            setErrorAlert(infoText);
        } else {
            infoText = '';
            setErrorAlert(infoText);
            setCurrentNOE(value);
        }
    }
    return (
        <div id="number-of-events">
            <input
                type='text'
                defaultValue='32'
                placeholder="Enter a number"
                onChange={handleInputChanged}
            />

        </div>


    )
};

export default NumberOfEvents;
