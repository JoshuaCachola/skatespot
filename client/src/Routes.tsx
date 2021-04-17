import React from 'react';
import { 
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { Home } from './pages/homepage/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { UserProfile } from './pages/UserProfile';
import { PrivateRoute } from './utils/PrivateRoute';
import { Users } from './pages/Users';
import { CreateSkateSpot } from './pages/CreateSkateSpot';


export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute
          exact={true}
          path='/private'
          component={Users}
        />
        <PrivateRoute
          exact={true}
          path='/create-skate-spot'
          component={CreateSkateSpot}
        />
        <PrivateRoute
          exact={true}
          path='/user-profile'
          component={UserProfile}
        />
      </Switch>
    </BrowserRouter>
  );
}