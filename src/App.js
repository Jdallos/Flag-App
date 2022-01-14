import React,{ useState } from 'react';
import FlagApp from './FlagApp';
import {Routes, Route} from 'react-router-dom';
import Details from './Details';
import Redirect from './Redirect';
import Footer from './Footer';
import './styles/App.css';

function App() {
    // Can this state be moved into FlagApp?
    const [detailsData, setDetailsData] = useState();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FlagApp setDetailsData={setDetailsData} />} />
        <Route path="/details/:countryName" element={<Details data={detailsData} />} />
        <Route path="*" element={<Redirect />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
