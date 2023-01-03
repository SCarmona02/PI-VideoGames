import './App.css';

import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Detail from "./components/Detail/Detail";
import Form from './components/Form/Form';

import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <Route exact path="/">
        <Landing />
      </Route>

      <Route exact path="/home">
        <Home />
      </Route>

      <Route exact path="/home/:id" component={Detail}>

      </Route>

      <Route exact path="/form" component={Form}>
      </Route>

    </div>
  );
}

export default App;
