import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { Container, Button, makeStyles } from '@material-ui/core'

import Prediction from './components/prediction'
import Category from './components/category2'

const useStyles = makeStyles({
    root: {
        fontFamily: 'Arial, Helvetica, sans-serif',
        textAlign: 'center',
    },
    button: {
        margin: '5px',
        padding: '5px 10px',
        minWidth: '80px',
        display: 'inline-block',
        // '&:active': {
        //     backgroundColor: 'white',
        //     boxShadow: 'var(--shadow)',
        //     fontWeight: 'bold',
        // }
    }
})

const App = () => {
    const classes = useStyles()

    return (
        <Container className={classes.root}>
            <BrowserRouter>
                <nav>
                    <Link to='/'><Button variant="outlined" className={classes.button}>Prediction</Button></Link>
                    <Link to='/category'><Button variant="outlined" className={classes.button}>Category</Button></Link>
                </nav>
                <Switch>
                    <Route exact path='/'><Prediction /></Route>
                    <Route path='/category'><Category /></Route>
                </Switch>
            </BrowserRouter>
        </Container>
    )
}

export default App
