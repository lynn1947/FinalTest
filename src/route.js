import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, Link} from 'react-router'

import MainLayout from './components/index'
import Welcome from './pages/welcome/index'


const routes = [{
    path:'/',
    component: MainLayout,
    indexRoute: {
        component: Welcome,
    },
    childRoutes: [{
        path:'/realtimeData',
        component: '',
    }, {
        path: '/dataQuery',
        component: '',
    }],
},{

}]

ReactDOM.render(
    <Router routes={routes}/>,
    document.getElementById('root')
)