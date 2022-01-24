import React, {createContext, useState} from 'react';

// Creates the context that is stored in the Provider
export const SaveContext = createContext();

// Create theProvider to place in app to provide value with context
export function SaveProvider (props){
   const [saved, setSaved] = useState(JSON.parse(window.localStorage.getItem("saved") || "[]"));


        return(
            // This value syntax sets key to the value in the object
            <SaveContext.Provider value={{saved, setSaved}}>
                {props.children}
            </SaveContext.Provider>
        )
    }
