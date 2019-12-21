const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageError = document.querySelector('#message-error')
const messageOne = document.querySelector('#message-1') //# Id, . Class, nothing label.
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const iconito = document.querySelector('#iconito')


// messageOne.textContent = 'From Javscript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageError.textContent = ''
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = ''
                messageError.textContent = data.error
                iconito.src = ''
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastMessage
                messageThree.textContent = data.precip
                console.log(data.iconito)
                if (data.iconito == 'clear day' || data.iconito == 'clear-night' || data.iconito == 'cloudy' || data.iconito == 'fog' || data.iconito == 'partly-cloudy-day' || data.iconito == 'partly-cloudy-night' || data.iconito == 'rain' || data.iconito == 'sleet' || data.iconito == 'snow' || data.iconito == 'wind') {
                    iconito.src = '/img/icons/' + data.iconito + '.png'

                } else {
                    iconito.src = '/img/icons/default.png'
                }
            }

        })
    })
})