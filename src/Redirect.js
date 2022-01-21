import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';

export default function Redirect() {
  const [counter, setCounter] = useState(7);

  useEffect(() =>{
    const intervalId = setInterval(() => {
      setCounter(counter - 1);
   }, 1000);

   return () => clearInterval(intervalId);
  });
 

  return (
    <div>
      {counter === 0 && <Navigate to="/Flag-App" />}
      <nav><Link to="/Flag-App">Back to all flags</Link></nav>
      <h1>Whoops! Something went wrong, please go back and try again.</h1>
      <p>You will be automatically redirected in {counter}</p>
    </div>
  );
}
