import React from 'react';
import Flag from './Flag'
import './styles/FlagList.css';


function FlagList({ countries, numToDisplay, displayMore, isLoading }) {

    function makeCountry() {
        return countries.map((country, index) => {
            if (index < numToDisplay) {
                return <Flag
                    key={country.cca3}
                    countryData = {country}
                />
            }
            return null;
        });
    };

    return (
        <div className="FlagList">
            {isLoading
                ?
                <div className="FlagList-Loading">
                    <i className="fas fa-8x fa-cog fa-spin"></i>
                    <h2>Loading Flags</h2>
                </div>
                :
                <>
                    <h2 className="FlagList-Title">Explore Flags</h2>
                    <div className="FlagList-Flags">
                        {countries.length > 0 && makeCountry()}
                    </div>
                    {numToDisplay < countries.length && <button className="FlagList-GenerateButton" onClick={displayMore}>Generate countries</button>}
                </>
            }
        </div>
    )

};

export default FlagList;