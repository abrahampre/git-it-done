var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo){
    console.log(repo)
    var apiUrl= "https://api.github.com/repos/"+repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response){
        //request was succesfull
        if(response.ok){
            response.json().then(function(data){
                //pas response data to dom function
                console.log(data);
                displayIssues(data);
            });
        }else{
            alert("There was a problem with your request!")
        };
    });
};

var displayIssues = function(issues){

    for(var i=0; i<issues.length; i++){

        if(issues.length===0){
            issueContainerEl.textContent="This repo has no open issues!";
        }

        //create a link element to take users to teh issue on github
        var issueEl = document.createElement("a");
        issueEl.classList="list-item flex-row justify-space-between aling-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target","_blank");

        //create a span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent= issues[i].title;
        console.log (titleEl);
        //append to container;
        issueEl.appendChild(titleEl);
        //crate type element
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or apull request 
        if(issues[i].pullrequest){
            typeEl.textContent="(Pull request)";
        }else{
            typeEl.textContent="(Issue)";
        };
        issueContainerEl.appendChild(issueEl);
        issueEl.appendChild(typeEl);
    };
  
};


getRepoIssues("facebook/react");
