const API_KEY = '77c4e2b070a2e1396500d0b42ebf7cec'//'YOUR_TMDB_API_KEY';  // Substitua pela sua chave da API TMDb
const API_URL = 'https://api.themoviedb.org/3';

// Função para buscar filmes populares
async function fetchPopularMovies() {
    try {
        const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
    }
}

// Função para buscar detalhes do filme
async function fetchMovieDetails(id) {
    try {
        const response = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
    }
}

// Função para exibir filmes populares
function displayPopularMovies(movies) {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';
    
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.className = 'movie-item';
        movieItem.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h2>${movie.title}</h2>
                <p>${movie.overview}</p>
                <a href="details.html?id=${movie.id}">Ver detalhes</a>
            </div>
        `;
        movieList.appendChild(movieItem);
    });
}

// Função para exibir detalhes do filme
function displayMovieDetails(movie) {
    const movieDetails = document.getElementById('movie-details');
    movieDetails.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
        <h1>${movie.title}</h1>
        <p>${movie.overview}</p>
        <p><strong>Data de Lançamento:</strong> ${movie.release_date}</p>
        <p><strong>Nota:</strong> ${movie.vote_average}</p>
    `;
}

// Inicialização da página inicial
if (document.getElementById('movie-list')) {
    fetchPopularMovies().then(movies => displayPopularMovies(movies));
}

// Inicialização da página de detalhes
if (document.getElementById('movie-details')) {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    if (movieId) {
        fetchMovieDetails(movieId).then(movie => displayMovieDetails(movie));
    }
}
