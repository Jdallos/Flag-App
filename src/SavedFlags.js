// import React, { useContext } from 'react';
// import { SaveContext } from './contexts/SaveContext.js';
import Flag from './Flag.js';
import './styles/SavedFlags.css';

function SavedFlags({ saved }) {
    function makeSaved() {
        return saved.map((country) => (
            <Flag
                key={country.ccn3}
                countryData={country}
            />
        ))
    };

    return (
        <div className="SavedFlags">
            <h2 className="SavedFlags-Title">Saved Flags</h2>
            {!saved.length
            ?
            <p>No flags saved &#x1F613;</p>
            :
            <div className="SavedFlags-Flags">

                {saved.length > 0 && makeSaved()}
            </div>
            }
        </div>
    )
}

export default SavedFlags;