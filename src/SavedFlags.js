import React from 'react';
import Flag from './Flag.js';
import './styles/SavedFlags.css';

function SavedFlags({ saved, saveFlag }) {

    function makeSaved() {
        return saved.map((country) => (
            <Flag
                name={country.name.common}
                region={country.region}
                image={country.flags.png}
                isSaved={country.isSaved}
                key={country.ccn3}
                saveFlag={saveFlag}
                id={country.cca3}
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