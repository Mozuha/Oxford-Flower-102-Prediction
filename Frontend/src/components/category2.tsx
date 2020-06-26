import React, { useState } from 'react'
import categories from '../categories'
import { Container, Grid, Paper, TextField, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    textField: {
        padding: '1em 2em',
        margin: 'var(--padding)',
        marginTop: 'calc(var(--padding) * 2)',
        width: '500px',
        borderRadius: '2em',
        border: '1em',
        boxShadow: 'var(--shadow)',
        outline: 0,
    },
    container: {
        // backgroundColor: '#fff',
        boxShadow: '0 1px 2px 1px rgba(0, 0, 0, 0.5)',
        padding: 'var(--padding) calc(var(--padding) * 2)',
        margin: 'calc(var(--padding) * 2)',
        marginBottom: 'calc(var(--padding) * 2)',
        textAlign: 'center',
        flexDirection: 'column',
    },
    grid: {
        display: 'inline-flex',
        justifyContent: 'space-between',
        listStyleType: 'none',
        margin: '5px auto',
        marginBlockStart: '0.5em',
        marginBlockEnd: '0.5em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        paddingInlineStart: '5px',
    },
    paper: {
        display: 'inline-block',
        padding: '5px 10px',
        margin: '5px',
        border: '1px solid grey',
    }
})

const PageCategories = () => {
    const classes = useStyles()

    const [search, setSearch] = useState<string | null>('')

    const searchSpace = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const keyword = event.target.value
        setSearch(keyword)
    }

    const items = categories.filter(data => {
        if (search === null)
            return data
        else if (data.toLowerCase().includes(search.toLowerCase()))
            return data
        }).map((data, index) => {
            return (
                <Grid className={classes.grid}  key={index}>
                    <Paper className={classes.paper}>
                        {data}
                    </Paper>
                </Grid>
            )
        })

    return (
        <Container>
            <h1>Categories Predictable</h1>
            <TextField
                variant="outlined"
                type="text" 
                className={classes.textField}
                placeholder="Enter name of flower" 
                onChange={(event) => searchSpace(event)} />
            <Container className={classes.container}>
                {items}
            </Container>
        </Container>
    )
}

export default PageCategories
