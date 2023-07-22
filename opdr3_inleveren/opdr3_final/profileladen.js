window.addEventListener('load', getProfile());





const section = document.getElementsByTagName("section")[0]
const topnav = document.getElementsByClassName("topnav")[0]

function getProfile(){
    console.log("profile")
    $.ajax({ 
        url: '/receiveProfile/',
        dataType: 'json',
        success: function(data) {
            console.log(data[0])
            makePage(data[0])
          }
        });
}

function makePage(profileData){
    createNavigationBar()

    for (var key in profileData){
        console.log(key)

        if (profileData[key] === null){
            const infoTag = document.createElement("p");
            const keyTag = document.createElement("span");
            const keyText = document.createTextNode(key + ": ")
            keyTag.appendChild(keyText)
            keyTag.style.fontWeight = "bold";
            infoTag.appendChild(keyTag);
    
            var text = 'Your ' + key + ' is empty!';
            const infoText = document.createTextNode(text);
            infoTag.appendChild(infoText);
            section.appendChild(infoTag);
  
        }

        if(key == "hash"){
            const infoTag = document.createElement("p");
            const keyTag = document.createElement("span");
            const keyText = document.createTextNode("Password: ")
            keyTag.appendChild(keyText)
            keyTag.style.fontWeight = "bold";
            infoTag.appendChild(keyTag);
    
            var text = profileData[key];
            const infoText = document.createTextNode(text);
            infoTag.appendChild(infoText);
            section.appendChild(infoTag);
        }

        if((profileData[key] != "") && (key != "hash") && (profileData[key] !== null)){
            const infoTag = document.createElement("p");
            const keyTag = document.createElement("span");
            const keyText = document.createTextNode(key + ": ")
            keyTag.appendChild(keyText)
            keyTag.style.fontWeight = "bold";
            infoTag.appendChild(keyTag);
    
            var text = profileData[key];
            const infoText = document.createTextNode(text);
            infoTag.appendChild(infoText);
            section.appendChild(infoTag);
        }

        else if (profileData[key] === ""){
         
            const infoTag = document.createElement("p");
            const keyTag = document.createElement("span");
            const keyText = document.createTextNode(key + ": ")
            keyTag.appendChild(keyText)
            keyTag.style.fontWeight = "bold";
            infoTag.appendChild(keyTag);
    
            var text = 'Your ' + key + ' is empty!';
            const infoText = document.createTextNode(text);
            infoTag.appendChild(infoText);
            section.appendChild(infoTag);
  
        }

    }
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