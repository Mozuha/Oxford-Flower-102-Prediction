import React, { useState } from 'react'
import categories from '../categories-json'
import {Container, Grid, Paper, TextField, styled} from '@material-ui/core'

const PageCategories = () => {
    const [search, setSearch] = useState('')

    const searchSpace = (event: any) => {
        let keyword = event.target.value
        setSearch(keyword)
    }

    const items = categories.filter((data) => {
        if (search === null)
            return data
        else if (data.toLowerCase().includes(search.toLowerCase()))
            return data
        }).map(data => {
            return (
                    <GridUl>
                        <PaperLi>
                            {data}
                        </PaperLi>
                    </GridUl>
            )
        })

    return (
        <Container>
            <h1>Categories Predictable</h1>
            <NewTextField
                variant="outlined"
                type="text" 
                placeholder="Enter name of flower" 
                onChange={(e) => searchSpace(e)} />
            <NewContainer>
                {items}
            </NewContainer>
        </Container>
    )
}

const NewTextField = styled(TextField)({
    padding: '1em 2em',
    margin: 'var(--padding)',
    marginTop: 'calc(var(--padding) * 2)',
    width: '500px',
    borderRadius: '2em',
    border: '1em',
    boxShadow: 'var(--shadow)',
    outline: 0
})

const NewContainer = styled(Container)({
    backgroundColor: '#fff',
    boxShadow: '0 1px 2px 1px rgba(0, 0, 0, 0.5)',
    padding: 'var(--padding) calc(var(--padding) * 2)',
    margin: 'calc(var(--padding) * 2)',
    marginBottom: 'calc(var(--padding) * 2)',
    textAlign: 'center',
    flexDirection: 'column',
})

const GridUl = styled(Grid)({
    display: 'inline-flex',
    justifyContent: 'space-between',
    listStyleType: 'none',
    margin: '5px auto',
    marginBlockStart: '0.5em',
    marginBlockEnd: '0.5em',
    marginInlineStart: '0px',
    marginInlineEnd: '0px',
    paddingInlineStart: '5px'
})

const PaperLi = styled(Paper)({
    display: 'inline-block',
    padding: '5px 10px',
    margin: '5px',
    border: '1px solid grey'
})

export default PageCategories
