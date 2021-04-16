import React, { useEffect, useState } from 'react';
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
import { accessToken } from './graphql/reactive-variables/accessToken';

export const Routes: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    setIsLoggedIn(!!accessToken());
  }, []);

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
          needLogin={isLoggedIn}
        />
        <PrivateRoute
          exact={true}
          path='/create-skate-spot'
          component={CreateSkateSpot}
          needLogin={isLoggedIn}
        />
        <PrivateRoute
          exact={true}
          path='/user-profile'
          component={UserProfile}
          needLogin={isLoggedIn}
        />
      </Switch>
    </BrowserRouter>
  );
}