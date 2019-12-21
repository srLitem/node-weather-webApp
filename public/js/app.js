console.log('Client side javascript file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1') //# Id, . Class, nothing label.
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javscript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }

        })
    })
})