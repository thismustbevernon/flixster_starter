///https://api.themoviedb.org/3/movie/550?api_key=7464e5bd23af89492b9d1f0905f3d097

const apiKey = "7464e5bd23af89492b9d1f0905f3d097";
var pageNumber = 1;
var search = null

var defaultMovies = true
// const limit = 9;
// const rating = 'g';
// const q = ' ';

//const image_url = `https://api.themoviedb.org/3/search/movie/{REPLACE WITH MOVIE ID}/images?api_key={REPLACE WITH API KEY}`
const image_url = `https://www.themoviedb.org/t/p/w440_and_h660_face`

const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=7464e5bd23af89492b9d1f0905f3d097`

const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&include_adult=false`

//const nowPlayingUrl = `https://api.themoviedb.org/3/search/movie/now_playing?api_key=${apiKey}`

const nowPlaying= `https://api.themoviedb.org/3/movie/now_playing?api_key=7464e5bd23af89492b9d1f0905f3d097&language=en-US` 

//The Queryselectors
const movieContainer = document.querySelector (".displayed-movies")
var formElement = document.querySelector(".form")
var loadMore = document.querySelector(".load-more")
var closeIcon = document.querySelector("#close-search-btn")
var moviePoster = document.querySelector(".movie-poster")


formElement.addEventListener("submit",async (ev)=>{
    ev.preventDefault()
    //console.log(ev.target.searchterm.value)

    // clears the default page before adding the searched items
    // sets default movies to false

    defaultMovies = false

    movieContainer.innerHTML = "";
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

    if (!movie.poster_path){
        newUrl = `https://www.lacinefest.org/uploads/2/6/7/4/26743637/no-poster_orig.jpeg`
    }
    return `
        <div id ="movie-card">
            <img  id="movie-poster" class="movie-poster" alt="image for the movie poster" src=${newUrl}>
            <div id="movie-title">${movie.title}</div>
            <span id= "votes" class="movie-votes"><i id ="star" class="fa-solid fa-star"></i>${movie.vote_average}</span>
        </div>
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
    pageNumber += 1

    if (defaultMovies ===false){
        var data = await getData (search)
        generateMoviesListHTML (data)

    }else{
        getCurrentMovies()
    }
  

})

async function getCurrentMovies(){
    nowPlayingUrl = nowPlaying + `&page=${pageNumber}`
    const response = await fetch(nowPlayingUrl);
    const responseData = await response.json();
    console.log("response", responseData)
    displayCurrentMovies(responseData)

    //movieContainer.innerHTML = `<img src = https://www.themoviedb.org/t/p/w440_and_h660_face${responseData.results[0].poster_path}>`

}

function displayCurrentMovies (res){
    console.log (movieContainer)
    res.results.forEach(movie=> {

        var url =  image_url +  `${movie.poster_path}`
        movieContainer.innerHTML += `
            <div id = "movie-card">
                <img  id="movie-poster" class="movie-poster" alt ="image foe the movie poster" src = ${url}>
                <div id="movie-title">${movie.title}</div>
                <span id= "votes" class="movie-votes"><i id ="star" class="fa-solid fa-star"></i>${movie.vote_average}</span>
            </div>
        `    
    })

  
}



closeIcon.addEventListener("click",async (ev)=>{
    location.reload();
})


closeIcon.addEventListener("click",async (ev)=>{
    location.reload();
})


window.onload =() => { 

    getCurrentMovies()
  
}


// // implementing the modal 

// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var imageButtons = document.querySelector("#movies-grid");
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal



// var arr = Array.from(imageButtons);

// //var arr = [].slice.call(imageButtons);

// console.log('grid',imageButtons)

// console.log('array',arr)


// function addClick() {

//     arr.forEach(btn=> {

//         console.log(btn)
//         btn.onclick = function() {
//             modal.style.display = "block";
//           }
          
//     })

// }


// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

