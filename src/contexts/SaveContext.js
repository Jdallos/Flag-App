import React, { createContext, useState } from 'react';

export const SaveContext = createContext();

export function SaveProvider(props) {
    // Populated from SaveFlag function and existing localStorage
    const [saved, setSaved] = useState(JSON.parse(window.localStorage.getItem("saved") || "[]"));

    // Populated from API Call in FlagApp
    const [countries, setCountries] = useState("");

    // Excuted when new Flag is Saved or removed
    function toggleSaveFlag(newFlagId, toSave) {
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

    // Updates the CountryList when a Flag is Saved- saveFlag function needs access to this.
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


    return (
        <SaveContext.Provider value={{ saved, setSaved, countries, setCountries, toggleSaveFlag }}>
            {props.children}
        </SaveContext.Provider>
    )
}
