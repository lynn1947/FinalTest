import React from 'react'
import ReactDom from 'react-dom'
import {HashRouter,Route, Switch} from 'react-router-dom'
import MainLayout from './containers/mainLayout/index'
import PersonalPage from './containers/personalPage/index'
import Login from './containers/login/index'

const App =()=> (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/mainPage" component={MainLayout} />
        <Route path="/personalPage" component={PersonalPage}/>
    </Switch>
)

ReactDom.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById('root')
)