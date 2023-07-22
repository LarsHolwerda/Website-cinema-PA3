import Movie from '/movie.js';
window.addEventListener('load', setBegin());


var movieList = [];
var movieAmountToShow = 7;
var moviesToShowList = []
var begingetal
var eindgetal 
var aantalKliks = 0
    
function setBegin(){
    begingetal = 0
    eindgetal = 7
    getData()
}



function getData(){
    //console.log(begingetal,eindgetal)
    $.ajax({ 
    url: '/receiveMovies/' + begingetal + '/' + eindgetal,
    dataType: 'json',
    success: function(data) {
        for(let i = 0; i < data.length; i++){
          var movieData = data[i];
          console.log(movieData.timeslot);
          const movie = new Movie(movieData.plot, movieData.writer, movieData.actors, movieData.year, movieData.movieTitle, movieData.director, movieData.timeslot, movieList.length);
          movieList.push(movie);
        }
        makePage()
        createNavigationBar()   

      }
    });
  }

const section = document.getElementsByTagName("section")[0]
const topnav = document.getElementsByClassName("topnav")[0]
function makePage(){

    if (document.querySelectorAll("p")){
        //console.log("p bestaat")
        //console.log(document.querySelectorAll("p"))
        document.querySelectorAll("p").forEach(e => e.remove());
        document.querySelectorAll("button").forEach(e => e.remove());

    }
    //console.log(movieList)
    moviesToShowList = movieList.slice(begingetal,eindgetal)
    //console.log(moviesToShowList)
    for(let i = 0; i < moviesToShowList.length; i++){
        //console.log(movieList[i].title)
        
        const movieTitleTag = document.createElement("p");
        var id = "title" + (i+1) 
        movieTitleTag.setAttribute('id', id);
        var title = moviesToShowList[i].title;
        const movieTitleText = document.createTextNode(title);
        movieTitleTag.appendChild(movieTitleText);
        movieTitleTag.addEventListener("click", function () {
        showDescription(i)})
        section.appendChild(movieTitleTag);
    }

    if (aantalKliks < 2){
        const nextButton = document.createElement("button");
        var nextText = "Next!";
        const nextButtonText = document.createTextNode(nextText);
        nextButton.appendChild(nextButtonText);
        nextButton.addEventListener("click", function(){
            loadNextMovies()
        })
        section.appendChild(nextButton);
    
    }

    if (aantalKliks > 0){
        const previousButton = document.createElement("button");
        var previousText = "Back!";
        const previousButtonText = document.createTextNode(previousText);
        previousButton.appendChild(previousButtonText);
        previousButton.addEventListener("click", function(){
            loadPreviousMovies()
        })
        section.appendChild(previousButton);
    }


    

function loadPreviousMovies(){
    
    if (aantalKliks > 0){
        aantalKliks -= 1
        begingetal -= movieAmountToShow
        eindgetal -= movieAmountToShow
        getData()
    }
    else{
        console.log("fout")
    }
}
}
function loadNextMovies(){
    //console.log(aantalKliks)
    if (aantalKliks < 2){
        aantalKliks += 1
        begingetal += movieAmountToShow
        eindgetal += movieAmountToShow
        console.log(aantalKliks)
        getData()
    }

        
    else{
        console.log("fout")
    }
        
}

function showDescription(i){
    //console.log(i)
    //console.log(moviesToShowList[i].plot)
    //console.log(document.getElementById("description"))
    if (document.getElementById("description") !== null){
        //console.log("true")
        var objectToRemove = document.getElementById("description");
        if (objectToRemove.previousSibling.id == "title" + (i+1)){
            objectToRemove.parentElement.removeChild(objectToRemove);
            return
        }
        else{
            objectToRemove.parentElement.removeChild(objectToRemove);

        }
    }
    const descriptionTag = document.createElement("p");
    descriptionTag.setAttribute('id', 'description');
    var plot = moviesToShowList[i].plot;

    const descriptionText = document.createTextNode(plot);
    descriptionTag.appendChild(descriptionText);

    const leader = document.createElement("a");
    leader.href = "/movie/" + (moviesToShowList[i].movieNumber+1) ;
    const leaderText = document.createTextNode(" Klik hier voor meer info over " + moviesToShowList[i].title + "!");
    leader.appendChild(leaderText);

    descriptionTag.appendChild(leader)

    var beforeID = "title" + (i+2);
    var beforeElement = document.getElementById(beforeID);
    if (beforeElement){
        console.log("before")
        console.log(beforeID)
        console.log(beforeElement)
        section.insertBefore(descriptionTag, beforeElement);
    }
   else{
    console.log("after")
    var afterID = "title" + (i+1)
    var afterElement = document.getElementById(afterID)
    console.log(afterID)
    console.log(afterElement)
    section.insertBefore(descriptionTag, afterElement.nextSibling);
   }
}

function createNavigationBar() {
    if (topnav.children.length == 1){
    const topnav = document.getElementsByClassName("topnav")[0];
    console.log('createNavigationBar function executed');

    const homepageButton = document.createElement("li");
    homepageButton.textContent = "Homepage";

    homepageButton.addEventListener('click', function(){
        window.location.href = "/";
    });
    topnav.appendChild(homepageButton);

    const profileButton = document.createElement("li");
    profileButton.id = "profile";
    const profileText = "Profile";
    const profileButtonText = document.createTextNode(profileText);
    profileButton.appendChild(profileButtonText);
    profileButton.addEventListener("click", function(){
        window.location.href = "/profile";
    });
    topnav.appendChild(profileButton);

    const showOrderButton = document.createElement("li");
    showOrderButton.textContent = "Shopping basket";
    showOrderButton.addEventListener('click', function(){
        window.location.href = "/order";
    });
    topnav.appendChild(showOrderButton);

    const registerButton = document.createElement("li");
    registerButton.id = "registration";
    const registerText = "Register";
    const registerButtonText = document.createTextNode(registerText);
    registerButton.appendChild(registerButtonText);
    registerButton.addEventListener("click", function(){
        window.location.href = "/register";
    });
    topnav.appendChild(registerButton);


    $.ajax({ 
        url: '/checkIfLoggedIn/',
        dataType: 'text',
        success: function(data) {
            console.log(data) 
            if(data == "true"){
                console.log("if true")
                logoutButton()
            }
            else{
                loginButton()
            }
          }
        });

}
}

function loginButton(){
    console.log("nee")
    const loginButton = document.createElement("li");
    loginButton.id = "login";
    const loginText = "login";
    const loginButtonText = document.createTextNode(loginText);
    loginButton.appendChild(loginButtonText);
    loginButton.addEventListener("click", function(){
        window.location.href = "/login";
    });
    topnav.appendChild(loginButton);
}


function logoutButton(){
    console.log("jaja")
    const logoutButton = document.createElement("li");
    logoutButton.id = "logout";
    const logoutText = "logout";
    const logoutButtonText = document.createTextNode(logoutText);
    logoutButton.appendChild(logoutButtonText);
    logoutButton.addEventListener("click", function(){
        window.location.href = "/logout";
    });
    topnav.appendChild(logoutButton);
}
