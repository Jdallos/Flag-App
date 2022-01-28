import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FlagList from './FlagList';
import SavedFlags from './SavedFlags';
import Search from './Search';
import axios from 'axios';
import { SaveContext } from './contexts/SaveContext';
import useInputState from './hooks/useInputState';
import './styles/FlagApp.css';


function FlagApp() {
    const { saved, countries, setCountries } = useContext(SaveContext);

    const [numToDisplay, setNumToDisplay] = useState(50);
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput, reset] = useInputState('');
    // isValid not false or true to begin with, but needs no additional value, for preventing searchRequest() and correct error checking rendering in form
    const [searchItem, setSearchItem] = useState({ isValid: {} });

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

    let navigate = useNavigate();
    useEffect(() => {
        async function searchRequest() {
            try {
                // Could just filter countries based on searchItem...
                const response = await axios.get(`https://restcountries.com/v3.1/name/${searchItem.searchInput}?fullText=true`);
                let gotCountry = response.data[0];
                const internalCountry = countries.filter((country) => {
                    // Returning the data from the preExisting country list in order to preserve data e.g. whether its saved or not
                    if (gotCountry.ccn3 === country.ccn3) {
                        // Setting id as Save functionality depends on this
                        country.id = country.cca3
                        return country;
                    } else {
                        return false;
                    }
                });
                navigate(`/details/${searchItem.searchInput}`, { state: { ...internalCountry[0] } });
            } catch (e) {
                console.log(e);
                setSearchItem(prev => ({ ...prev, isValid: false }));
            }
        }
        // The searchRequest function only runs if searchItem exists, from a searchInput submission
        searchItem.isValid === true && searchRequest();
        // The below comment prevents an error from using navigate in useEffect- I believe this is ok...
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchItem])



    function displayMore() {
        setNumToDisplay(numToDisplay + 50);
    };

    return (
        <div className="FlagApp">
            <h1 className="FlagApp-Title">Flag Finder</h1>
            <h4 className="FlagApp-Sub">A React app to learn more about the countries of the world and their flags!</h4>
            <Search
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                setSearchItem={setSearchItem}
                searchItem={searchItem}
                reset={reset}
                countries={countries}
            />
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