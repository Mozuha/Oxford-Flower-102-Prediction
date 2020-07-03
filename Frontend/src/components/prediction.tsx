import React, { useState } from 'react'
import { Container, Button, CircularProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        display: 'inline-flex',
        flexDirection: 'column',
    },
    container: {
        padding: '2px 4px',
        margin: '10px',
        alignItems: 'center',
    },
    button: {
        margin: '5px',
    },
    img: {
        border: 'none',
        maxWidth: '70%',
    }
})

const Predict = () => {
    const classes = useStyles()

    const [base64Image, setBase64Image] = useState<string>('')
    const [predResult, setPredResult] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const previewFile = (event: React.ChangeEvent) => {
        const target = event.target as HTMLInputElement
        const file = target.files![0]
        const reader = new FileReader()
        
        reader.onload = () => {
            // ArrayBuffer to String
            const dataURL = reader.result as string
            setImage(dataURL)
            setBase64Image(dataURL.replace(/^data:image\/(png|jpeg);base64,/, ''))
        }
        reader.readAsDataURL(file)
    }

    const predictImage = () => {
        const message = {
            image: base64Image,
            hasError: false
        }
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        }
        
        setIsLoading(true)
        fetch('/api/predict', requestOptions)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setPredResult(data)
                setIsLoading(false)
            })
            .catch(error => {
                message.hasError = true
                setIsLoading(false)
                console.error(error)
            })
    }

    return (
        <Container className={classes.root}>
            <h1>Image Prediction</h1>
            <Container component='form' className={classes.container}>
                <Button variant='outlined' component='label' className={classes.button}>
                    Choose Image to be Predicted
                    <input style={{ display: 'none' }} type='file' accept='image/*' onChange={(event) => previewFile(event)}/>
                </Button>
                <Button variant='outlined' className={classes.button} onClick={predictImage}>Predict</Button>
            </Container>
            <Container className={classes.container}>
                <h3>{isLoading ? <span>This is... <CircularProgress color='inherit' size={15} /></span> : <span>This is {predResult}</span>}</h3>
                <img className={classes.img} src={image} />
            </Container>
        </Container>
    )
}

export default Predict
