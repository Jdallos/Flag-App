import React, { useState, useEffect, useContext } from 'react';
import FlagList from './FlagList';
import SavedFlags from './SavedFlags';
import axios from 'axios';
import {SaveContext} from './contexts/SaveContext';
import './styles/FlagApp.css';


function FlagApp() {
    const {saved, countries, setCountries} = useContext(SaveContext);

    const [numToDisplay, setNumToDisplay] = useState(50);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        async function fetchData() {
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/all`);
                let unshuffled = response.data;
                let shuffled = unshuffled
                    .map((value) => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value);

                // Update new Countries from localStorage to indicate if already saved
                let withSavedCountries = shuffled.map((country) => {
                    for (let each of saved) {
                        if (each.cca3 === country.cca3) {
                            country.isSaved = true;
                            return country;
                        }
                    }
                    return country;
                });
                setCountries(withSavedCountries);
                setIsLoading(false);
            } catch (e) {
                alert(e);
            }
        }
        fetchData();
        // The below comment prevents an error from using saved state in useEffect- I believe this is ok...
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // This updates local storage when what is in saved changes
    useEffect(() => {
        window.localStorage.setItem("saved", JSON.stringify(saved));
    }, [saved]);

    function displayMore() {
        setNumToDisplay(numToDisplay + 50);
    };

    return (
        <div className="FlagApp">
            <h1 className="FlagApp-Title">Flag Finder</h1>
            <h4 className="FlagApp-Sub">A React app to learn more about the countries of the world and their flags!</h4>
            <SavedFlags
                saved={saved}
            />
            <FlagList
                countries={countries}
                displayMore={displayMore}
                numToDisplay={numToDisplay}
                isLoading={isLoading}
            />
        </div>
    )
};

export default FlagApp;