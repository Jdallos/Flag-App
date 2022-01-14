import React, { useState, useEffect } from 'react';
import FlagList from './FlagList';
import SavedFlags from './SavedFlags';
import axios from 'axios';
import './styles/FlagApp.css';


function FlagApp({ setDetailsData }) {
    // API call and countries storage
    const [countries, setCountries] = useState("");
    // to generate the list of saved
    const [saved, setSaved] = useState(JSON.parse(window.localStorage.getItem("saved") || "[]"));
    const [numToDisplay, setNumToDisplay] = useState(50);
    const [isLoading, setIsLoading] = useState(false);
    // Declaired Details state in App as how else to pass to more route?

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

    function saveFlag(newFlagId, toSave) {
        let newFlag = countries.filter((country) => (
            country.cca3 === newFlagId
        ));
        if (toSave) {
            newFlag = updateIsSavedInCountryList(newFlag, newFlagId, true);
            setSaved([...saved, ...newFlag]);
        }
        else {
            let updatedSaved = saved.filter((country) => (
                country.cca3 !== newFlagId
            ));
            setSaved(updatedSaved);
            updateIsSavedInCountryList(newFlag, newFlagId, false);
        }
    };

    function updateIsSavedInCountryList(newFlag, newFlagId, saving) {
        newFlag[0].isSaved = saving;

        let updatedCountries = countries.map((country) => {
            if (country.cca3 === newFlagId) {
                return newFlag[0];
            } else {
                return country;
            }
        });
        setCountries(updatedCountries);
        return newFlag;
    };

    function displayMore() {
        setNumToDisplay(numToDisplay + 50);
    };

    return (
        <div className="FlagApp">
            <h1 className="FlagApp-Title">Flag Finder</h1>
            <h4 className="FlagApp-Sub">A React app to learn more about the countries of the world and their flags!</h4>
            <SavedFlags
                saved={saved}
                saveFlag={saveFlag}
                setDetailsData={setDetailsData}
            />
            <FlagList
                countries={countries}
                saveFlag={saveFlag}
                displayMore={displayMore}
                numToDisplay={numToDisplay}
                isLoading={isLoading}
                setDetailsData={setDetailsData}
            />
        </div>
    )
};

export default FlagApp;