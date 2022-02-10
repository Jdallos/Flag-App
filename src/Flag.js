import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SaveContext } from './contexts/SaveContext';
import './styles/Flag.css';

function Flag({ countryData }) {
    const { dispatch } = useContext(SaveContext);

    function handleToggleSave() {
        if (countryData.isSaved) {
            dispatch({
                type: 'Remove',
                payload: countryData
            })
        } else {
            dispatch({
                type: 'Save',
                payload: countryData
            })
        }
    }

    // Now with useReducer implemented could useParams in Details to get the data from Countries, rather than pass here...
    let navigate = useNavigate();
    function handleMoreRoute() {
        navigate(`/details/${countryData.name.common}`, { state: { ...countryData } });
    }

    return (
        <div className={countryData.isSaved ? "Flag  SavedFlag" : "Flag"}>
            <h3>{countryData.name.common}</h3>
            <p>Region: {countryData.region}</p>
            <img src={countryData.flags.png} alt={countryData.name.common} />
            <div>
                {!countryData.isSaved ? <button className="Flag-Save" onClick={handleToggleSave}>Save</button> : <button className="Flag-Remove" onClick={handleToggleSave}>Remove</button>}
                <button className="Flag-More" onClick={handleMoreRoute} >More</button>
            </div>
        </div>
    )
}

export default Flag;