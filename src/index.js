import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {HashRouter,Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import MainLayout from './containers/mainLayout/index'
import PersonalPage from './containers/personalPage/index'
import Login from './containers/login/index'
import rootReducer from './rootReducer'
import rootSaga from './saga/index'

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<Switch>
            <Route exact path="/" component={Login} />
            <Route path="/mainPage" component={MainLayout} />
            <Route path="/personalPage" component={PersonalPage}/>
        </Switch>)
    }
}

const sagaMiddleware = createSagaMiddleware()

// 有个initialState没有传参
const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f //检测是否安装redux-devtool插件，安装则使用，不安装不使用
))

sagaMiddleware.run(rootSaga())

ReactDom.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
)