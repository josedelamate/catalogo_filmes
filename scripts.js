const url = "http://www.omdbapi.com/?"
const apikey = "b58710e2"

const form = document.querySelector('.form')

// função buscar dados filme na API -- http://www.omdbapi.com/?apikey=[yourkey]&
async function exibirResultado(e) {
    e.preventDefault()
    const filme = document.querySelector('.form-input').value
    if (filme) {
        
        const apiUrl = `${url}apikey=${apikey}&s=${filme}`
        //console.log(apiUrl)
        const response = await fetch(apiUrl)
        const filmes = await response.json()
        console.log(filmes)
        let content = ""
        for (movie of filmes.Search){
            content += `<li class="all-movies-card">`
            content += `<figure class="all-movies-figure">`
            content += `<img class="all-movies-thumb" src=${movie.Poster}>`
            content += `</figure>`
            content += `<legend class="all-movies-legend">`
            content += `<span class="all-movies-year">${movie.Year}</span>`
            content += `<h2 class="all-movies-title">${movie.Title}</h2>`
            content += `</legend>`
            content += `</li>`
        }
        document.querySelector("#movies").innerHTML = content
    }else {
        console.log('Digite um Filme !')
    }
}

form.addEventListener('submit',exibirResultado)