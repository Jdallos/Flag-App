import React, { useState } from 'react';
import FlagApp from './FlagApp';
import { Routes, Route } from 'react-router-dom';
import Details from './Details';
import Redirect from './Redirect';
import Footer from './Footer';
import { SaveProvider } from './contexts/SaveContext';
import './styles/App.css';

function App() {
  // Can this state be moved into FlagApp?
  // const [detailsData, setDetailsData] = useState();

  return (
    <div className="App">
      <SaveProvider>
        <Routes>
          <Route path="/" element={<FlagApp />} />
          <Route path="/details/:countryName" element={<Details />} />
          <Route path="*" element={<Redirect />} />

        </Routes>
      </SaveProvider>
      <Footer />
    </div>
  );
}

export default App;
