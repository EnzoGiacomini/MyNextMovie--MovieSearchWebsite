const userInput = document.getElementById("t-Input");
const tButton = document.getElementById("searchButton");
const infoContainer = document.getElementById("result-div");

const urlSearch = 'https://api.themoviedb.org/3/search/movie?api_key=';
const API_KEY = 'YOUR API KEY HERE'; 
const imgUrl = 'https://image.tmdb.org/t/p/w500';

const maxNumOfMovies = 4;


tButton.addEventListener('click', searchMovie);

async function searchMovie() {

    const movieName = userInput.value;

    if(movieName === '') return;

    const movieUrl = urlSearch + `${API_KEY}&query=${movieName}&language=en`;

    try {
        const response = await fetch(movieUrl);
        const data = await response.json();

        showMovie(data.results);
    }
    catch (error)
    {
        console.error('Could not search movie ', error);
    }
}

function showMovie(movies)
{
    infoContainer.innerHTML = '';

    let numOfMovies = 0;

    movies.forEach(movie => {
        if(!movie.poster_path || numOfMovies === maxNumOfMovies) return;

        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie-div');

        const poster = document.createElement('img');
        poster.classList.add('movieIMG');
        poster.src = imgUrl + movie.poster_path;
        poster.alt = movie.title;

        const title = document.createElement('h3');
        title.classList.add('movieH3');
        title.textContent = movie.title;

        const stars = document.createElement('h4');
        stars.classList.add('movieStars');
        stars.textContent = 'Rating: ' + (movie.vote_average).toFixed(2);

        const releaseDate = document.createElement('h4');
        releaseDate.classList.add('movieDate');
        const release = movie.release_date.split('-');
        releaseDate.textContent = 'Release: ' + `${release[2]}/${release[1]}/${release[0]}`;

        const resumeButton = document.createElement('button');
        resumeButton.classList.add('movieButton');
        resumeButton.textContent = 'Overview'

        infoContainer.appendChild(movieDiv);
        movieDiv.appendChild(title);
        movieDiv.appendChild(poster);
        movieDiv.appendChild(stars);
        movieDiv.appendChild(releaseDate);
        movieDiv.appendChild(resumeButton);

        const overviewHTML = 
        `
        <div class="overview-div d" data-index="${numOfMovies}">

            <h5>Resume:</h5>

            <button class="exit-button"><img src="./img/close.png" alt="close button" height="36px" width="36px"></button>

            <p class="overview-text">
                "${movie.overview}"
            </p>

        </div>
        `

        movieDiv.insertAdjacentHTML('beforeend', overviewHTML);

        const overviewDiv = movieDiv.querySelector(`.overview-div`);
        const overviewButton = overviewDiv.querySelector('.exit-button');

        resumeButton.addEventListener('click', () =>{
            overviewDiv.classList.remove('d');
            document.body.classList.add('no-scroll');
        });

        overviewButton.addEventListener('click', () => {
            overviewDiv.classList.add('d');
            document.body.classList.remove('no-scroll');
        });




        numOfMovies++;
    });
}
