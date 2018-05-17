import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router'

import MainLayout from './components/mainLayout/index'
import Welcome from './pages/welcome/index'
import RealtimeData from './pages/realtimeData/index'
import DataQuery from './pages/dataQuery/index'

ReactDOM.render ((
    <Router history={browserHistory} >
        <Route path='/' component={MainLayout}>
            <indexRoute component={Welcome}/>
            <Route path='/realtimeData' component={RealtimeData}/>
            <Route path= '/dataQuery' component={DataQuery}/>
        </Route>
    </Router>),
    document.getElementById('root')
)