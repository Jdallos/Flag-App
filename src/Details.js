import React, { useLayoutEffect, useContext } from 'react';
import { Link, useParams, Navigate, useLocation } from 'react-router-dom';
import {SaveContext} from './contexts/SaveContext';
import './styles/Details.css';
import './styles/Flag.css';


export default function Details() {
    // Always open page at top
    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    });
    const { countryName } = useParams();
    const { state } = useLocation();
    const {saved, setSaved} = useContext(SaveContext);
    
    const data = [state][0];
    // Remove whitespace to give full name to unsplash
    const noSpaceCountryName = countryName.replace(/\s/, '');
    let imgUrl = `https://source.unsplash.com/600x400?${noSpaceCountryName}`;

    function toggleSaveOnClick(){
        // Why doesn't this run on repeat clicks?
        console.log('clicked',data);
        data.isSaved = !data.isSaved;
        if(data.isSaved){
            setSaved([...saved, data]);
        }else{
            const updatedSaved = saved.filter((flag) => (
                flag.ccn3 !== data.ccn3
            ));
            setSaved(updatedSaved);
        }
        
    }
    return (
        <div className="Details">
            {data
                ?
                <>
                    <section>
                        <nav><Link to="/">Back to all flags</Link></nav>
                        <div>
                            <h1>{data.name.common}</h1>
                            {!state.isSaved ? <button className="Details-Save" onClick={toggleSaveOnClick} >Save</button> : <button className="Details-Remove" onClick={toggleSaveOnClick}>Remove</button>}
                            <img className="Details-FlagImage" src={data.flags.png} alt={data.name.common} />
                            <ul>
                                <li><span className="Details-ListKey">Capital:</span> {data.capital ? data.capital : 'N/A'}</li>
                                <li><span className="Details-ListKey">Population:</span> {data.population}</li>
                                <li><span className="Details-ListKey">Continent:</span> {data.continents}</li>
                                <li><span className="Details-ListKey">Sub-Region:</span> {data.subregion ? data.subregion : 'N/A'}</li>
                                <li><span className="Details-ListKey">Area:</span> {data.area}km<sup>2</sup></li>
                                {/* If contents greater than one add the s... */}
                                <li><span className="Details-ListKey">Language{data.languages ? Object.keys(data.languages).length > 1 ? 's:' : ':' : ': N/A'}</span>
                                    <ul>
                                        {data.languages && Object.values(data.languages).map((language) => {
                                            return <li key={language}>{language}</li>
                                        })}
                                    </ul>
                                </li>
                                {/* If greater than one add the s... */}
                                <li><span className="Details-ListKey">Currenc{data.currencies ? Object.keys(data.currencies).length > 1 ? 'ies:' : 'y:' : 'y: N/A'}</span>
                                    <ul>
                                        {data.currencies && Object.values(data.currencies).map((cur) => {
                                            return <li key={cur.name} >{cur.name} {cur.symbol && `(${cur.symbol})`}</li>
                                        })}
                                    </ul>
                                </li>
                                {data.unMember && <li><span className="Details-ListKey">UN Member</span> &#x2705;</li>}
                                <li><span className="Details-ListKey">Google Maps link:</span> <a rel="noopener noreferrer" href={data.maps.googleMaps} target="_blank">{data.maps.googleMaps}</a></li>
                            </ul>
                        </div>
                    </section>
                    <div className="Details-Image">
                        <h2>Image of {countryName}</h2>
                        <p>Generated courtesy of unsplash API</p>
                        <img src={imgUrl} alt={countryName} />
                    </div>
                </>
                :
                <Navigate to="*" />
            }
        </div>
    )
}

