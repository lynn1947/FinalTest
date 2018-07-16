import React from 'react'
import ReactDom from 'react-dom'
import {HashRouter} from 'react-router-dom'
import MainLayout from './containers/mainLayout/index'

ReactDom.render(
    <HashRouter>
        <MainLayout />
    </HashRouter>,
    document.getElementById('root')
)