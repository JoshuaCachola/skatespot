import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages/homepage/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { UserProfile } from './pages/UserProfile';
import { PrivateRoute } from './utils/PrivateRoute';
import { CreateSkateSpot } from './pages/CreateSkateSpot';
import { SkateSpotResults } from './pages/SkateSpotResults';
import { SkateSpot } from './pages/skatespot/SkateSpot';
import { WriteReview } from './pages/WriteReview';
import { NotFound } from './pages/NotFound';
import { SkateSpotReviews } from './pages/skatespot/SkateSpotReviews';
import { Photos } from './pages/Photos';
import { UpdateProfilePicture } from './pages/UpdateProfilePicture';
import { AddPhoto } from './pages/AddPhoto';

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact={true} path="/create-skate-spot" component={CreateSkateSpot} />
        <PrivateRoute exact={true} path="/user-profile" component={UserProfile} />
        <PrivateRoute exact={true} path="/search" component={SkateSpotResults} />
        <PrivateRoute exact={true} path="/skate-spot/:name" component={SkateSpot} />
        <PrivateRoute exact={true} path="/write-review/:name" component={WriteReview} />
        <PrivateRoute exact={true} path="/photos/:name" component={Photos} />
        <PrivateRoute exact={true} path="/user-photos/add" component={UpdateProfilePicture} />
        <PrivateRoute exact={true} path="/skatespot-photos/add" component={AddPhoto} />
        <Route exact={true} path="/reviews" component={SkateSpotReviews} />
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};
