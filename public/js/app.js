const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1') //# Id, . Class, nothing label.
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

//Icono 
let valor = "";
const iconito = document.querySelector('#iconito')


// messageOne.textContent = 'From Javscript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastMessage
                messageThree.textContent = data.precip
                valor = data.iconito
                console.log(valor)
                switch (valor) {
                    case "clear-day":
                        iconito.src = "/img/icons/clear-day.png"
                        break;
                    case "clear-night":
                        iconito.src = "/img/icons/luna.png"
                        break;
                    case "rain":
                        iconito.src = "/img/icons/lluvia.png"
                        break;
                    case "snow":
                        iconito.src = "/img/icons/snow.png"
                        break;
                    case "sleet":
                        iconito.src = "/img/icons/granizo.png"
                        break;
                    case "wind":
                        iconito.src = "/img/icons/viento.png"
                        break;
                    case "fog":
                        iconito.src = "/img/icons/nublado.png"
                        break;
                    case "cloudy":
                        iconito.src = "/img/icons/cloudy.png"
                        break;
                    case "partly-cloudy-day":
                        iconito.src = "/img/icons/clear-day.png"
                        break;
                    case "partly-cloudy-night":
                        iconito.src = "/img/icons/luna.png"
                        break;
                }

            }

        })
    })
})