import 'regenerator-runtime/runtime'
import axios from 'axios'

const btnImage = document.querySelector('.button-image')
btnImage.addEventListener('click', btnImageClick)

async function btnImageClick() {
    setLoaderState('flex')

    const layoutSelected = document.querySelector('input[name="layout"]:checked').value
    const dogImage = await getDogImage(document.querySelector('input[name="race-dog"]:checked').value, layoutSelected)
    
    if(dogImage.status === 'success') {
        const containerImage = document.querySelector('.container')
        setLayoutImages(layoutSelected, dogImage, containerImage)
    } else {
        console.log('Erro na axios.get')
    }

    setLoaderState('none')
}

async function getDogImage(race, layoutSelected) {
    let urlDogApi

    if(race === 'random') {
        urlDogApi = 'https://dog.ceo/api/breeds/image/random/'
    } else {
        urlDogApi = 'https://dog.ceo/api/breed/' + race + '/images/random/'
    }

    urlDogApi += layoutSelected
    const dogImage = await axios.get(urlDogApi)
    return dogImage.data
}

function setLayoutImages(layoutSelected, dogImage, containerImage) {
    let layoutCode = ''

    for(let i=0; i < layoutSelected; i++) {
        layoutCode += `<img class="dog-image-${layoutSelected}" src="${dogImage.message[i]}" alt="A doggo here">`
    }

    containerImage.innerHTML = layoutCode
}

function setLoaderState(state) {
    const loader = document.querySelector('.loader-container')
    // loader.style.display = state
}