import logo from './logo.svg';
import './App.css';
import Employee from './component/employee/employee';
import DetailsEmployee from './component/detailsEmployee/detailsEmployee';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Employee}></Route>
          <Route exact path="/:id" component={DetailsEmployee}></Route>
     </Switch>
     </Router>
    </div>
  );
}

export default App;
