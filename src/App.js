import logo from './logo.svg';
import './App.css';
import awsExports from './aws-exports';
import { Amplify } from 'aws-amplify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importieren Sie die Komponenten:
import Common from './components/Common/SiteFooter';
import Auth from './components/auth/LoginPage';
import Contacts from './components/contacts/Contacts';
import Home from './components/home/HomePage';
import JokeApi from './components/jokeApi/DadJoke';

Amplify.configure(awsExports);

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <Routes>
          <Route path="/common" element={<Common />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/home" element={<Home />} />
          <Route path="/jokeapi" element={<JokeApi />} />
          {/* ... Weitere Routen hier ... */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
