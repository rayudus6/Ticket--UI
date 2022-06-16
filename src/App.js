import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import Ticket from './Components/Ticket';
import MyTickets from './Components/MyTickets';
import MyTicket from './Components/MyTicket';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/ticket" component={Ticket} />
          <Route exact path="/tickets" component={MyTickets} />
          <Route exact path="/tickets/:id" component={MyTicket} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;