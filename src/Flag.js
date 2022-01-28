import React, {useContext} from 'react';
import { useNavigate} from 'react-router-dom';
import {SaveContext} from './contexts/SaveContext';
import './styles/Flag.css';

function Flag({ name, image, region, isSaved, id, countryData }) {

    const {toggleSaveFlag} = useContext(SaveContext);

    function handleToggleSave(){
        toggleSaveFlag(id, !isSaved);
    }
  
    let navigate = useNavigate();
    function handleMoreRoute() {
      navigate(`/details/${name}`, {state: {...countryData, isSaved, id}});
    }

    return (
        <div className={isSaved ? "Flag  SavedFlag" : "Flag"}>
            <h3>{name}</h3>
            <p>Region: {region}</p>
            <img src={image} alt={name}/>
            <div>
                {!isSaved ? <button className="Flag-Save" onClick={handleToggleSave}>Save</button> : <button className="Flag-Remove" onClick={handleToggleSave}>Remove</button>}
                <button className="Flag-More" onClick={handleMoreRoute} >More</button>
            </div>
        </div>
    )
}

export default Flag;