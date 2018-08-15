import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {HashRouter,Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import MainLayout from './containers/mainLayout/index'
import PersonalPage from './containers/personalPage/index'
import Login from './containers/login/index'
import rootReducer from './rootReducer'

const App =()=> (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/mainPage" component={MainLayout} />
        <Route path="/personalPage" component={PersonalPage}/>
    </Switch>
)

// 有个initialState没有传参
const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f //检测是否安装redux-devtool插件，安装则使用，不安装不使用
))

ReactDom.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
)