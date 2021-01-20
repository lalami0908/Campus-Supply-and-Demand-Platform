import './App.css'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Input, message, Tag } from 'antd'
import {
    Router, Route, Redirect, Switch,
} from 'react-router-dom';
import NotFound from './page/404';
import { rootRouter } from './router/rootRouter';
import { history as browserHistory } from './common/history';
import { syncHistoryWithStore } from 'mobx-react-router';
import { routerStore } from './store/routerStore';
import { ROUTE_PRE_FIX } from './common/constant';//testing
const history = syncHistoryWithStore(browserHistory, routerStore);

function App() {

  return (
    <Router history={browserHistory}>
      <Switch>
        <Redirect exact from="/" to='/login' />
        <Route
          path="/"
          children={({ match }) => {
         
            return (
              <Switch>
                {
                  rootRouter.map(({ path, component, ...otherProps }) => {
                    // console.log('re-routing path:',path)
                    return(
                      <Route path={path} component={component} {...otherProps} key={path} />
                    )
                  })
                }
                <Route path="*" component={NotFound} />
              </Switch>
            );
          }} 
        />
        <Route path="*" component={NotFound} />
      </Switch>      
    </Router> 

  )
}

export default App
