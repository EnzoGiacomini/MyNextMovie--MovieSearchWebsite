const randomButton = document.getElementById('randomButton');
const rInfoContainer = document.getElementById("Rresult-div");

const RANDOM_API_KEY = 'YOUR API KEY HERE'
const urlDiscover = 'https://api.themoviedb.org/3/discover/movie?api_key=';

async function findMovie() {
    const randomNum = Math.floor(Math.random() * 500) + 1;

    const movieURL = urlDiscover + `${RANDOM_API_KEY}&language=en-US&sort_by=popularity.desc&page=${randomNum}`;

    try {
        const response = await fetch(movieURL);
        const data = await response.json();

        const movies = data.results;
        const randomIndex = Math.floor(Math.random() * movies.length);
        const randomMovie = movies[randomIndex];

        showRandomMovie(randomMovie);
    }
    catch (error)
    {
        console.error('Could not search ', error);
    }
}

function showRandomMovie(movie)
{
    rInfoContainer.innerHTML = '';

    if(!movie.poster_path) return;

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

        rInfoContainer.appendChild(movieDiv);
        movieDiv.appendChild(title);
        movieDiv.appendChild(poster);
        movieDiv.appendChild(stars);
        movieDiv.appendChild(releaseDate);
        movieDiv.appendChild(resumeButton);

        const overviewHTML = 
        `
        <div class="overview-div d">

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
}


randomButton.addEventListener('click', findMovie);