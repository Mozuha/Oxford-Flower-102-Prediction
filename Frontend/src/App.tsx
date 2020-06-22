import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { Button, styled } from '@material-ui/core'
import styledComp from 'styled-components'

import Predict from './components/predict'
import Category from './components/category2'

const App = () => {
    return (
        <Body>
            <BrowserRouter>
                <nav>
                    <NavButton variant="outlined" size="large"><Link to='/'>Predict</Link></NavButton>
                    <NavButton variant="outlined" size="large"><Link to='/category'>Category</Link></NavButton>
                </nav>
                <Switch>
                    <Route exact path='/'><Predict /></Route>
                    <Route path='/category'><Category /></Route>
                </Switch>
            </BrowserRouter>
        </Body>
    )
}

const Body = styledComp.body`
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    `
const NavButton = styled(Button)({
    margin: '10px',
    padding: '10px 20px',
    color: 'green',
    textDecoration: 'none',
    display: 'inline-block',
    '&:active': {
        backgroundColor: 'white',
        boxShadow: 'var(--shadow)',
        fontWeight: 'bold',
    }
})

export default App
