import { useState } from 'react';

function useInputState(initialVal=""){
    const [input, setInput] = useState(initialVal);
    // Passed value directly from the TextInput, not in conventional e.target etc
    const handleChange = (e) => {
        // Conditional prevents type error on null from .join() if input is deleted
        if(e){
        // Regex to select country name and remove whitespace, (not selecting flag img)
        let flagRemoved = e.match(/[A-Z a-z()-ãéí]/g).join('').trim();
            // Removing text between parentheses
            let capitalRemoved = flagRemoved.replaceAll(/ *\([^)]*\) */g, '');
            setInput(capitalRemoved);
        }
    }
    const reset = () => {
        setInput("");
    }
    return [input, handleChange, reset]
}

export default useInputState;
