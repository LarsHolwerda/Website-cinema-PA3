window.addEventListener('load', createNavigationBar());

// create the navigationbar on top of the page

function createNavigationBar() {
    const topnav = document.getElementsByClassName("topnav")[0]
    console.log('createNavigationBar function executed');
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