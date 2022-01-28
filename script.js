const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
const form = document.getElementById('form');
const search = document.getElementById('search');
const catalog = document.getElementById('catalog');

getMovies(API_URL)

function getMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => showMovies(data.results))
}

function showMovies(movies) {
  catalog.innerHTML = ''
  movies.forEach((movie) => {
    const {title, poster_path, vote_average, overview} = movie;
    const movieEl = document.createElement('div');
    const imgSrc = poster_path ? IMG_PATH + poster_path : 'img/default.jpg';
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img src="${imgSrc}" alt="${title}" class="movie__img">
      <div class="movie__info">
          <p class="movie__title">${title}</p>
          <p class="movie__rating ${getClassByRate(vote_average)}">${vote_average}</p>
      </div>
      <div class="overview">${overview}</div>
    `
    catalog.appendChild(movieEl);
  })
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit',(e) => {
  e.preventDefault();
  const searchTerm = search.value
  if (!searchTerm) return;

  search.value = '';
  getMovies(SEARCH_API + searchTerm)
})