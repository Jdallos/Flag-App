import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './styles/Flag.css';

function Flag({ name, image, region, isSaved, saveFlag, id, countryData, moreInfo }) {
    function handleSave(){
        saveFlag(id, true);
    }
    function handleRemove(){
        saveFlag(id, false);
    }
    // function handleClick(){
    //     setDetailsData({...countryData});
    // }
    let navigate = useNavigate();

    function handleClick() {
      navigate(`/details/${name}`, {state: {...countryData, isSaved}});
    }

    return (
        <div className={isSaved ? "Flag  SavedFlag" : "Flag"}>
            <h3>{name}</h3>
            <p>Region: {region}</p>
            <img src={image} alt={name}/>
            <div>
                {!isSaved ? <button className="Flag-Save" onClick={handleSave}>Save</button> : <button className="Flag-Remove" onClick={handleRemove}>Remove</button>}
                <button className="Flag-More" onClick={handleClick} >More</button>
                {/* <Navigate className="Flag-More" to={`/details/${name}`} state={countryData} >More</Navigate> */}
            </div>
        </div>
    )
}

export default Flag;