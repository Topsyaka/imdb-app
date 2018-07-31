const API_KEY = 'fd58e48d';
const URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;
const quant = 10;
const form = document.forms.search_form;
let page = 1;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    const value = form.title.value.trim();
    const type = form.searchType.value;
    console.log(type);
    if (!value) {
        form.title.classList.add('error');
        setVisibility(form.querySelector('.error-message'), true);
    } else {
        getSearch();
        form.title.classList.remove('error');
        setVisibility(form.querySelector('.error-message'), false);
    } 
});

function setVisibility(element, isError) {
    isError ?
        element.classList.add('visible1') :
        element.classList.remove('visible');
}



function generateResultCards(data) {
    const search = data.Search;
    const total = data.totalResults;
    const rowResult = document.querySelector('#results .row');
    const result = search.map(item => {
       return `
        <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="${item.Poster}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${item.Title}</h5>
                        <a href="#" data-id="${item.imdbID}" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
       `
    }).join('');
    renderPagination(total)
    rowResult.innerHTML = result;
    rowResult.querySelectorAll('.card').forEach((item, index) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            console.log(event);
            if (event.target.nodeName === 'A') {
                const { imdbID } = search[index]; 
                fetch(`${URL}&i=${imdbID}&plot=full`)
                    .then(response => response.json())
                    .then(renederModal);
            }
        });
    });
}

function renderPagination(total) {
    let pageQ = Math.ceil(total/quant);
    const pageButtonsArray = [];
    
    for (let i = 1; i <= pageQ; i++) {
        pageButtonsArray.push(`<li class="page-item"><a class="page-link" href="${i}">${i}</a></li>`)
    }
    const resultString = `
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                ${pageButtonsArray.join('')}
            </ul>
        </nav>`;
    paginationContainer.innerHTML = resultString;
    paginationContainer.querySelectorAll('li a').forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const index = item.getAttribute('href');
            page = index;
            
            getSearch();
        });
    });    
}

function getSearch() {
    const value = form.title.value.trim();
    const type = form.searchType.value;
    fetch(`${URL}&s=${value}&type=${type}&page=${page}`)
    .then(response => response.json())
    .then(generateResultCards);
}

function renederModal(data) {
    
}