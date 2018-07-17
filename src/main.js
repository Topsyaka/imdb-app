const API_KEY = 'fd58e48d';
const URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;
const form = document.forms.search_form;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = form.title.value.trim();
    if (!value) {
        form.title.classList.add('error');
        setVisibility(form.querySelector('.error-message'), true);
    } else {
        fetch(`${URL}&s=${value}`)
            .then(response => response.json())
            .then(data => console.log(data))
        form.title.classList.remove('error');
        setVisibility(form.querySelector('.error-message'), false);
    } 
});

function setVisibility(element, isError) {
    isError ?
        element.classList.add('visible1') :
        element.classList.remove('visible');
}

function generateResultCards() {}
