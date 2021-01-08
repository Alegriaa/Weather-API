// client side js

console.log('client side js file is loaded')

// fetch this data from this url and then run this function
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

fetch('http://localhost:3000/weather?address=!').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
    // to target class - .className
    // to taget by ID - #IDname
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    // prevents the browser from refreshing
    e.preventDefault()
        // .value extracts the value from the input
    const location = search.value
    messageOne.textContent = 'Looking up weather.. please wait'
    messageTwo.textContent = ' '


    // remove http://localhost:3000 from the fetched url below
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = data.location
                console.log(data.location)
                messageTwo.textContent = data.forecast
                console.log(data.forecast)
            }
        })
    })
})