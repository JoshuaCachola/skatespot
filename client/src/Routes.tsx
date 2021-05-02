import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages/homepage/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { UserProfile } from './pages/UserProfile';
import { PrivateRoute } from './utils/PrivateRoute';
import { Users } from './pages/Users';
import { CreateSkateSpot } from './pages/CreateSkateSpot';
import { SkateSpotResults } from './pages/SkateSpotResults';
import { SkateSpot } from './pages/SkateSpot';
import { WriteReview } from './pages/WriteReview';
import { NotFound } from './pages/NotFound';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact={true} path="/private" component={Users} />
        <PrivateRoute exact={true} path="/create-skate-spot" component={CreateSkateSpot} />
        <PrivateRoute exact={true} path="/user-profile" component={UserProfile} />
        <PrivateRoute exact={true} path="/search" component={SkateSpotResults} />
        <PrivateRoute exact={true} path="/skate-spot/:name" component={SkateSpot} />
        <PrivateRoute exact={true} path="/write-review/:name" component={WriteReview} />
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
