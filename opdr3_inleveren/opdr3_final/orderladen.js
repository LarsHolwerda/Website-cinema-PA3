window.addEventListener('load', getOrder());

var orderList = []
var ticketList = []
//haal huidige user op



function getOrder(){
    console.log("order")
    $.ajax({
        url: '/receiveOrder/',
        dataType: 'json',
        success: function(data) {
                orderList = data[0]
                if (orderList == undefined){
                    window.location.href = "/login";
                }
                else {console.log(orderList)
                showOrder()}

            }
        }
        )
}

const section = document.getElementsByTagName("section")[0]
const topnav = document.getElementsByClassName("topnav")[0]


function showOrder(){
    createNavigationBar()
    if (orderList.currentOrder !== null){

        ticketList = orderList.currentOrder.split(',')
        console.log(ticketList)
        for (let i = 0; i < ticketList.length; i++){
            if (ticketList[i] == ""){
            var index = ticketList.indexOf(ticketList[i])
            ticketList.splice(index,1)
            console.log(ticketList[i])
            }
            
        
        }
        
        console.log(ticketList)
        for(let i = 0; i < ticketList.length; i++){
            const ticketTag = document.createElement("p");
            var ticketData = ticketList[i]
            const ticketText = document.createTextNode(ticketData);
            ticketTag.appendChild(ticketText);
            section.appendChild(ticketTag);
    
    
            const deleteButton = document.createElement("button");
            deleteButton.id = "remove"
            var deleteText = "Remove from order!";
            const deleteButtonText = document.createTextNode(deleteText);
            deleteButton.appendChild(deleteButtonText);
            deleteButton.addEventListener("click", function(){
                removeTicketFromOrder(document.getElementsByTagName("p")[i].childNodes[0].data)
            })
            ticketTag.appendChild(deleteButton)
        }
        if(document.getElementsByTagName("p").length > 0){
            console.log()
            const confirmAndPayButton = document.createElement("button");
            confirmAndPayButton.textContent = "Confirm order and pay!";
            confirmAndPayButton.addEventListener('click', function(){
                $.ajax({
                    type: "POST",
                    url: '/payOrder/',
                    dataType: 'text',
                    success: function(response) {
                            console.log("betaald en verwerkt")
                            alert(response)
                            location.reload()
                        }
                    }
                    )
        
        
                //var yesOrCancel = confirm('Do you really want to add a ticket for ' + movie.title + ' at ' + selectedTimeslot + ' to your order?')
                //if (yesOrCancel == true){
                //    getOrder(movie)
                //    }
                } 
                )
                section.appendChild(confirmAndPayButton);
        }
    }
  
    if (orderList.currentOrder == ""){
        const orderLeegTag = document.createElement("p");
        var textLeeg = "Your order is empty, press the button to go to the homepage to select movies!"
        const orderLeegTagText = document.createTextNode(textLeeg);
        orderLeegTag.appendChild(orderLeegTagText);
        section.appendChild(orderLeegTag);

        const homepageButton = document.createElement("button");
        homepageButton.textContent = "Homepage!";
        
        homepageButton.addEventListener('click', function(){
            window.location.href = "/";
    }
    )
    section.appendChild(homepageButton)

}}

function removeTicketFromOrder(ticketNaam){
    console.log(ticketNaam)
    //console.log(ticketList)
    var index = ticketList.indexOf(ticketNaam)
    var newOrder = ticketList.slice()
    newOrder.splice(index,1)
    console.log(newOrder)
    //ticketList = newOrder


    $.ajax({
        type: "POST",
        url: '/removeTicketFromOrder/' + newOrder,
        dataType: 'text',
        success: function(response) {
                console.log("ticket verwijderd")
                alert(response)
                location.reload()
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