
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTermEl = document.querySelector("#repo-search-term");


//geting the name 
var formSubmitHandler = function(event){
    event.preventDefault();
    console.log(event);

    var username = nameInputEl.value.trim();

    if(username){
        getUserRepos(username);
        nameInputEl.value = "";
    }else{
        alert("Please submit a github Username");
    }
};


var getUserRepos = function (user){
    //format the github api url
    var apiUrl = "https://api.github.com/users/"+ user +"/repos";
 
    //make a request to the url
    fetch(apiUrl).then(function(response){
        ///fi there is an user with that name
        if (response.ok){
         response.json().then(function(data){
             displayRepos(data,user);
         }); //if there is no user with that name then....
        }else{
            alert("Error: GitHub User Not Found!");
        };
    })
    .catch(function(error){
        //notice this "catch()" getting chained onto the end of then.. 
        alert("Unable to connect to github");
    })
 };
 
 var displayRepos=function(repos,searchTerm){
     console.log(repos);
     console.log(searchTerm);
     repoContainerEl.textContent="";
     repoSearchTermEl.textContent=searchTerm;

    for(var i=0; i<repos.length; i++){
        // Format repo name 
        var repoName = repos[i].owner.login + "/"+ repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList ="list-item flex-row justify-space-between align-center"

        //create span element to hold repository name
        var titleEl= document.createElement("span");
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);

        //create status element
        var statusEl = document.createElement("span");
        statusEl.classList="flex-row alling-center";

        //check if current repo has issues or not

        if (repos[i].open_issues_count>0){
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count+ " issue(s)";
        }else{
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>"
        };

        //append to container

        repoEl.appendChild(statusEl);
        
        
        
        //append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
 }

userFormEl.addEventListener('submit', formSubmitHandler);