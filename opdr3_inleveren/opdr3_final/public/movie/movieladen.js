import Movie from '/movie.js';
var id = window.location.pathname.split('/').pop();
console.log(id)
window.addEventListener('load', getMovie());
const section = document.getElementsByTagName("section")[0]
const section2 = document.getElementsByTagName("section")[1]
const section3 = document.getElementsByTagName("section")[2]
const topnav = document.getElementsByClassName("topnav")[0]


function getMovie(){
    var id = window.location.pathname.split('/').pop();
    console.log(id)
    $.ajax({
    url: '/receiveMovie/' + id,
    dataType: 'json',
    success: function(data) {
        console.log(id);
        const movie = new Movie(data.plot, data.writer, data.actors, data.year, data.movieTitle, data.director, data.timeslot, 1);
        console.log(movie)     
        renderMoviePage(movie)
            }
        })}
 
function renderMoviePage(movie){
    createNavigationBar()
    // content of the page
    const movieTitleTag = document.createElement("h1");
    var title = movie.title;
    const movieTitleText = document.createTextNode(title);
    movieTitleTag.appendChild(movieTitleText);
    section.appendChild(movieTitleTag);

    const directorTag = document.createElement("p");
    var director = movie.director;
    const directorText = document.createTextNode("Directed by: " + director);
    directorTag.appendChild(directorText);
    section.appendChild(directorTag);

    const writerTag = document.createElement("p");
    var writer = movie.writer;
    const writerText = document.createTextNode("The movie was written by: " + writer);
    writerTag.appendChild(writerText);
    section.appendChild(writerTag);

    var actorList = movie.actors.split(",");

    for(let i = 0; i < actorList.length; i++){
        const actorTag = document.createElement("p");
        var actor = actorList[i];
        const actorText = document.createTextNode("Starred: " + actor);
        actorTag.appendChild(actorText);
        section.appendChild(actorTag);
    }


    const yearTag = document.createElement("p");
    var year = movie.releaseYear;
    const yearText = document.createTextNode("The movie was released in: " + year);
    yearTag.appendChild(yearText);
    section.appendChild(yearTag);

    const plotTag = document.createElement("p");
    var plot = movie.plot
    const plotText = document.createTextNode("Plot: " + plot);
    plotTag.appendChild(plotText);
    section.appendChild(plotTag);
    getTimeslot(movie)

    const addButton = document.createElement("button");
    addButton.textContent = "Add to your order!";
    addButton.addEventListener('click', function(){
        const selectTag = document.getElementById("timeslotSelect");
        const selectedOption = selectTag.options[selectTag.selectedIndex];
        const selectedTimeslot = selectedOption.text;
        var yesOrCancel = confirm('Do you really want to add a ticket for ' + movie.title + ' at ' + selectedTimeslot + ' to your order?')
        if (yesOrCancel == true){
            getOrder(movie)
            }
        }
        )
    section3.appendChild(addButton);
    
    //check of er een registeruser is zo ja toon show order knop anders niet
    // voor nu ff true zodat knop toont
    var registereduser = true
    if(registereduser){
        const showOrderButton = document.createElement("button");
        showOrderButton.textContent = "Show your order!";
        showOrderButton.addEventListener('click', function(){
            window.location.href = "/order";
            }
            )
        section3.appendChild(showOrderButton);
    }

}


var timeslotList;
function getTimeslot(movie){
    console.log("ja" + movie.timeslot)
    $.ajax({
        url: '/receiveTimeslots/' + movie.timeslot,
        dataType: 'json',
        success: function(data) {
                timeslotList = data[0]
                console.log(timeslotList)
                showTimes()
            }
        }
        )
    
}

function showTimes(){
    const selectTag = document.createElement("select");
    selectTag.setAttribute('id', 'timeslotSelect');

    const date = timeslotList.date; 
    const timeslotOne = timeslotList.time1;   
    const timeslotTwo = timeslotList.time2; 

    const timeslotTagOne = document.createElement("option");
    const timeslotTagTwo = document.createElement("option");
    timeslotTagOne.text = date + " " + timeslotOne;
    timeslotTagTwo.text = date + " " + timeslotTwo;
    selectTag.appendChild(timeslotTagOne);
    selectTag.appendChild(timeslotTagTwo);
    section2.appendChild(selectTag);

}


function getOrder(movie){
    console.log("order")
    const selectTag = document.getElementById("timeslotSelect");
    const selectedOption = selectTag.options[selectTag.selectedIndex];
    const selectedTimeslot = selectedOption.text;
    console.log(movie)
    console.log('Selected timeslot:', selectedTimeslot);

    $.ajax({
        type: "POST",
        url: '/postOrder/' + movie.title + '/' + selectedTimeslot,
        dataType: 'text',
        success: function(response) {
                console.log("gedaan")
                alert(response)
            }
        }
        )
}

function createNavigationBar() {
    const homepageButton = document.createElement("li");
    homepageButton.textContent = "Homepage";

    homepageButton.addEventListener('click', function(){
        window.location.href = "/";
    }
    )
    topnav.appendChild(homepageButton)


    const profileButton = document.createElement("li");
    profileButton.id = "profile"
    var profileText = "Profile";
    const profileButtonText = document.createTextNode(profileText);
    profileButton.appendChild(profileButtonText);
    profileButton.addEventListener("click", function(){
        window.location.href = "/profile";
    })
    topnav.appendChild(profileButton);

    var registereduser = true
    if(registereduser){
        const showOrderButton = document.createElement("li");
        showOrderButton.textContent = "Shopping basket";
        showOrderButton.addEventListener('click', function(){
            window.location.href = "/order";
            }
            )
        topnav.appendChild(showOrderButton);
    }

    const registerButton = document.createElement("li");
    registerButton.id = "registration"
    var registerText = "Register";
    const registerButtonText = document.createTextNode(registerText);
    registerButton.appendChild(registerButtonText);
    registerButton.addEventListener("click", function(){
        window.location.href = "/register";
    })
    topnav.appendChild(registerButton);
}