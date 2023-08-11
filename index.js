const container = document.querySelector('.container');
const busca = document.querySelector('.caixa-de-busca button');
const caixaDoTempo = document.querySelector('.caixa-do-tempo');
const detalhesDoTempo = document.querySelector('.detalhes-do-tempo');
const error404 = document.querySelector('.not-found');

busca.addEventListener('click', () => {

    const APIKey = 'cee93a7cb6fc44ede8b6ace6f1952818';
    const cidade = document.querySelector('.caixa-de-busca input').value;

    if (cidade === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                caixaDoTempo.style.display = 'none';
                detalhesDoTempo.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.caixa-do-tempo img');
            const temperatura = document.querySelector('.caixa-do-tempo .temperatura');
            const descricao = document.querySelector('.caixa-do-tempo .descricao');
            const humidade = document.querySelector('.detalhes-do-tempo .humidade span');
            const vento = document.querySelector('.detalhes-do-tempo .vento span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = './assets/clear.png';
                    break;

                case 'Rain':
                    image.src = './assets/rain.png';
                    break;

                case 'Snow':
                    image.src = './assets/snow.png';
                    break;

                case 'Clouds':
                    image.src = './assets/cloud.png';
                    break;

                case 'Haze':
                    image.src = './assets/mist.png';
                    break;

                default:
                    image.src = '';
            }

            temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            descricao.innerHTML = `${json.weather[0].description}`;
            humidade.innerHTML = `${json.main.humidity}%`;
            vento.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            caixaDoTempo.style.display = '';
            detalhesDoTempo.style.display = '';
            caixaDoTempo.classList.add('fadeIn');
            detalhesDoTempo.classList.add('fadeIn');
            container.style.height = '590px';


        });


});