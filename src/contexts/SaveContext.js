import React, { createContext, useReducer } from 'react';
import { saveReducer } from './Reducers';

export const SaveContext = createContext();

export function SaveProvider(props) {
    // Added for reducer
    const [state, dispatch] = useReducer(saveReducer, {
        countries: [],
        saved: JSON.parse(window.localStorage.getItem("saved") || "[]"),
    });

    return (
        <SaveContext.Provider value={{ state, dispatch }}>
            {props.children}
        </SaveContext.Provider>
    )
}

