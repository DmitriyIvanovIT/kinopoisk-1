const searchForm = document.querySelector('#search-form'),
movie = document.querySelector('#movies');

// Получения и обработка события
const apiSearch = (event) => {
    event.preventDefault();
    const searchText = document.querySelector('.form-control').value,
    api = 'a5fbea0d07b256ed534002b62cae1500',
    server = `https://api.themoviedb.org/3/search/multi?api_key=${api}&language=ru&query=${searchText}`;
    requestApi(server);

},

// Рендер данных поиска
requestApi = (url) => {
    const request = new XMLHttpRequest();
    request.open('GET', url)
    request.send();
    request.addEventListener('readystatechange', () =>{
        if(request.readyState !== 4) return;
        if(request.status !== 200) {
            console.log('error:'+request.status);
            return;
        }
        const outPut = JSON.parse(request.responseText)

        let inner = '';
        outPut.results.forEach(item => {
            let nameItem = item.name || item.title,
            dateItem = item.release_date || item.first_air_date;
            inner += `<div class="col-3">${nameItem} <br>
            ${getDate(dateItem)}</div>`
        });
        movie.innerHTML = inner;
    });
},

// Изменение формата времени
getDate = (date) => {
    return new Date(date).toLocaleString('ru', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// Отслеживание события
searchForm.addEventListener('submit', apiSearch)