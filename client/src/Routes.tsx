import React/*, { useContext } , { useEffect, useMemo, useState } */ from 'react';
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
// import { TokenContext } from './utils/TokenContext';
// import { TokenContext } from './utils/TokenContext';


// const isLoggedIn = !!accessToken();
export const Routes: React.FC = () => {
  // const {isLoggedIn} = useContext(TokenContext);
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  // const value = useMemo(() => ({isLoggedIn, setIsLoggedIn}), [isLoggedIn, setIsLoggedIn]);

  // useEffect(() => {
  //   // console.log(accessToken());
  //   setIsLoggedIn(!!accessToken())
  // }, []);
  console.log(accessToken());

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        {/* <TokenContext.Provider value={value}> */}
          <PrivateRoute
            exact={true}
            path='/private'
            // isLoggedIn={isLoggedIn}
            component={Users}
          />
          <PrivateRoute
            exact={true}
            path='/create-skate-spot'
            // isLoggedIn={isLoggedIn}
            component={CreateSkateSpot}
          />
          <PrivateRoute
            exact={true}
            path='/user-profile'
            // isLoggedIn={isLoggedIn}
            component={UserProfile}
          />
        {/* </TokenContext.Provider> */}
      </Switch>
    </BrowserRouter>
  );
}