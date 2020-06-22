import React, { useState } from 'react'
import styled from 'styled-components'
// import './index.css'

const Predict = () => {
    // useEffect(() => {
    //     fetch('http://localhost:5000/predict', {method:'POST'}).then(response => response.json().then(data => {console.log(data)}))
    // }, [])
    const [base64Image, setBase64Image] = useState('')
    const [predResult, setPredResult] = useState('')
    const [img, setImg] = useState('')
    
    const previewFile = (e: any) => {
        // const preview = document.querySelector('img')
        // const text: HTMLInputElement = document.querySelector('input[type=file]') as HTMLInputElement
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            // ArrayBuffer to String
            let dataURL = reader.result as string
            setImg(dataURL)
            setBase64Image(dataURL.replace('data:image/png;base64,', ''))
        }
        reader.readAsDataURL(file)
    }

    const predictImage = () => {
        const message = {
            image: base64Image
            // image: img
        }
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ message })
            body: JSON.stringify(message)
        }
        
        fetch('http:localhost:5000/api/predict', requestOptions)
            .then(response => response.json())
            .then(data => setPredResult(data))
    }

    return (
        <Div>
            <Input type='file' onChange={previewFile}/>
            <button onClick={() => predictImage()}>Predict</button>
            <p>Predictions</p>
            <p>This is: {predResult}</p>
            <Img src={img} alt=''/>
        </Div>
    )
}

const Div = styled.div`
    padding: 20px;
    margin: 20px;
    `
const Input = styled.input`
    padding: 1em 2em;
    margin: var(--padding);
    margin-top: calc(var(--padding) * 2);
    width: 300px;
    border-radius: 2em;
    border: none;
    box-shadow: var(--shadow);
    outline: 0
    `
const Img = styled.img`
    border: none;
    max-width: 80%;
    `

export default Predict
