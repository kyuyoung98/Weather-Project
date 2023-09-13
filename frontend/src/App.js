import {Routes, Route} from "react-router-dom"
import Login from './pages/login/Login';
import './App.css';
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Weather</title>
      </Helmet>
     <Routes>
          <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
