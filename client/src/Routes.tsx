import React from 'react';
import { 
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { UserProfile } from './pages/UserProfile';
// import { getAccessToken } from './accessToken';
import { GET_ACCESS_TOKEN } from '../src/graphql/GetAccessToken';
import { PrivateRoute } from './utils/privateRoute';
import { Users } from './pages/Users';
import { CreateSkateSpot } from './pages/CreateSkateSpot';
import { useQuery } from '@apollo/client';

export const Routes: React.FC = () => {
  const {data} = useQuery(GET_ACCESS_TOKEN);
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
          needLogin={!!data.accessToken}
        />
        <PrivateRoute
          exact={true}
          path='/create-skate-spot'
          component={CreateSkateSpot}
          needLogin={!!data.accessToken}
        />
        <PrivateRoute
          exact={true}
          path='/user-profile'
          component={UserProfile}
          needLogin={!!data.accessToken}
        />
      </Switch>
    </BrowserRouter>
  );
}