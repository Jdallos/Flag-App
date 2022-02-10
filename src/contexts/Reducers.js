export const saveReducer = (state, action) => {
    switch (action.type) {
        case 'AddCountries':
            return {
                ...state,
                countries: [...action.payload]
            }
        case 'Save':
            return {
                ...state,
                saved: [...state.saved, { ...action.payload, isSaved: true }],
                countries: [...state.countries.map((c) => {
                    if (c.cca3 === action.payload.cca3) {
                        c.isSaved = true;
                        return c;
                    }
                    else {
                        return c;
                    }
                })
                ]
            }
        case 'Remove':
            return {
                ...state,
                saved: [...state.saved.filter(c => c.cca3 !== action.payload.cca3)],
                countries: [...state.countries.map((c) => {
                    if (c.cca3 === action.payload.cca3) {
                        c.isSaved = false;
                        return c;
                    }
                    else {
                        return c;
                    }
                })
                ]
            }
        default:
            return state;
    }
}

