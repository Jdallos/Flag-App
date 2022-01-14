import React from 'react';
import Flag from './Flag'
import './styles/FlagList.css';


function FlagList({ countries, saveFlag, numToDisplay, displayMore, isLoading, setDetailsData }) {

    function makeCountry() {
        return countries.map((country, index) => {
            if (index < numToDisplay) {
                return <Flag
                    name={country.name.common}
                    region={country.region}
                    image={country.flags.png}
                    key={country.cca3}
                    saveFlag={saveFlag}
                    id={country.cca3}
                    isSaved={country.isSaved}
                    setDetailsData = {setDetailsData}
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