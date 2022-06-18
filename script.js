

///https://api.themoviedb.org/3/movie/550?api_key=7464e5bd23af89492b9d1f0905f3d097

const apiKey = "7464e5bd23af89492b9d1f0905f3d097";
var pageNumber = 1;
var search = null
// const limit = 9;
// const rating = 'g';
// const q = ' ';

//const image_url = `https://api.themoviedb.org/3/search/movie/{REPLACE WITH MOVIE ID}/images?api_key={REPLACE WITH API KEY}`
const image_url = `https://www.themoviedb.org/t/p/w440_and_h660_face`

const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=7464e5bd23af89492b9d1f0905f3d097`

const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&include_adult=false`

const nowPlaying = `https://api.themoviedb.org/3/search/movie/now_playing?api_key=${apiKey}`

//The Queryselectors
const movieContainer = document.querySelector (".displayed-movies")
var formElement = document.querySelector(".form")
var loadMore = document.querySelector(".load-more")


formElement.addEventListener("submit",async (ev)=>{
    ev.preventDefault()
    //console.log(ev.target.searchterm.value)
    var data = await getData (ev.target.searchterm.value)

    search = ev.target.searchterm.value
    generateMoviesListHTML (data)
})


function generateMoviesListHTML(movies){

    movies.results.forEach(movie =>{
        movieContainer.innerHTML += getMovieTemplate(movie)
    })

}

function getMovieTemplate(movie){
    //const movieId = movie.id
    var newUrl = image_url + `${movie.poster_path}`
    return `
        <img src=${newUrl}>
        <div>${movie.title}</div>
        <span>${movie.vote_average}</span>
    `

}

// //getting search data

async function getData(searchterm){
    var newUrl = searchUrl + `&query=${searchterm} + &page=${pageNumber}`

    var res = await fetch(newUrl)
    var data = await res.json()
    console.log(data)
    return data
}


//implementing the load more button

loadMore.addEventListener("click",async (ev)=>{

    console.log('clicked')
 
    pageNumber += 1

    var data = await getData (search)
    generateMoviesListHTML (data)

})


async function getResults(){
    const response = await fetch(url);
    const responseData = await response.json();
    console.log("response", responseData.results[0].poster_path)

    movieContainer.innerHTML = `<img src = https://www.themoviedb.org/t/p/w440_and_h660_face${responseData.results[0].poster_path}>`

}


function displayResults (res){

    console.log (gifContainer)

    res.data.forEach(element => {
        movieContainer.innerHTML += `<img src = ${element.images.original.url}>`

        
    })
}

window.onload =() => { 
    //getResults();
}
