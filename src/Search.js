import React from 'react';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import './styles/Search.css';

function Search({ searchInput, setSearchInput, searchItem, setSearchItem, reset, countries }) {

    function handleSubmit(e) {
        e.preventDefault();
        setSearchItem({ searchInput, isValid: true });
        reset();
    }

    // Can only be mapped when countries has been returned form API request
    const allCountryNames = countries && countries.map((country) => {
        return `${country.name.common} ${(country.flag !== undefined && country.flag !== false) ? country.flag : ''} (${country.capital !== undefined && country.capital !== false ? country.capital : 'N/A'})`
    });

    return (
        <div className="Search">
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Flag search:</label>
                <TextInput
                    autoComplete="off"
                    options={[...allCountryNames]}
                    onChange={setSearchInput}
                    onSelect={(selected) => setSearchInput(selected)}
                    spacer={''}
                    matchAny={true}
                    minChars={1}
                    Component={"input"}
                    offsetY={17}
                    offsetX={0}
                    passThroughEnter={true}
                    trigger={''}
                    regex={'^[a-zA-Z0-9_ -]+$'}
                    id="search"
                    type="text"
                    placeholder="Search by country/ capital..."
                />
                <button>Search</button>
                <p className={!searchItem.isValid === false ? 'Search-HideErrorMessage' : 'Search-ErrorMessage'}>{`${searchItem.searchInput} not found, please try again`}</p>
            </form>
        </div>
    )
};

export default Search;