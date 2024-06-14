import logo from './logo.svg';
import './App.css';
import { getBands, postBand, putBand, deleteBand} from './helpers/requests';
import { useEffect } from 'react';
import Navbar from './components/nav/navbar';
import HomeMain from './components/main/homeMain';
function App() {

  return (
    <div className="App">
      <Navbar/>
      <HomeMain/>
    </div>
  );
}

export default App;
