console.log('Client side JS File is loaded')


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
const messageThree = document.querySelector('#messageThree')
//const bla = document.querySelector('.className')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = searchElement.value

    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = `${data.error}`
            messageOne.style.display = "block"
            messageTwo.textContent = ''
            return console.log(data.error)
        }
        messageOne.textContent = `${data.location}`
        messageOne.style.display = "block"
        messageTwo.textContent = `${data.forecast}`
        messageTwo.style.display = "block"
        messageThree.textContent = `${data.humidity}`
        messageThree.style.display = "block"
    })
})
    console.log(location)
})