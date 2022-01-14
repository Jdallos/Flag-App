import React from 'react';
import {Link} from 'react-router-dom';
import './styles/Flag.css';

function Flag({ name, image, region, isSaved, saveFlag, id, setDetailsData, countryData, moreInfo }) {
    function handleSave(){
        saveFlag(id, true);
    }
    function handleRemove(){
        saveFlag(id, false);
    }
    function handleClick(){
        setDetailsData({...countryData});
    }
    return (
        <div className={isSaved ? "Flag  SavedFlag" : "Flag"}>
            <h3>{name}</h3>
            <p>Region: {region}</p>
            <img src={image} alt={name}/>
            <div>
                {!isSaved ? <button className="Flag-Save" onClick={handleSave}>Save</button> : <button className="Flag-Remove" onClick={handleRemove}>Remove</button>}
                <Link className="Flag-More" to={`/details/${name}`} onClick={handleClick} >More</Link>
            </div>
        </div>
    )
}

export default Flag;