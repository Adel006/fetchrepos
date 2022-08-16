//decalaration variables
let github_username = document.querySelector(".repos-input input:first-child");
let get_repos_btn = document.querySelector(".repos-input input:last-child");
let repos_data = document.querySelector(".repos-data");

//get repos button process
get_repos_btn.onclick = () => {
  if (github_username.value == "") {
    repos_data.innerHTML = "<span class='error-message'>You must fill out the input field!</span>";
  } else {
    repos_data.innerHTML = "";
    fetchedRepos();
  }
};

//function for fetching repos from specific username github account
function fetchedRepos() {
  fetch(`https://api.github.com/users/${github_username.value}/repos`)
    .then((response) => response.json())
    .then((repos) => {
        if(repos.length == 0) {
            repos_data.innerHTML = "<span class='error-message'>There is no such github account!</span>";
        } else {
            repos.forEach(repo => {
                let repoDiv = document.createElement("div");
                let repoName = document.createElement("span");
                let nameText = document.createTextNode(repo.name);
                let repoDetails = document.createElement("div");
                let repoStars = document.createElement("span");
                let starsCount = document.createTextNode(`Stars ${repo.stargazers_count}`);
                let repoUrl = document.createElement("a");
                let urlText = document.createTextNode("Visit");
                //----------------------------
                repoUrl.href = repo.html_url;
                repoUrl.setAttribute("target", "_blank");
                //----------------------------
                repoDiv.className = "repo";
                repoDetails.className = "repo-details";
                //----------------------------
                repoName.appendChild(nameText);
                repoStars.appendChild(starsCount);
                repoUrl.appendChild(urlText);
                //----------------------------
                repoDetails.appendChild(repoStars);
                repoDetails.appendChild(repoUrl);
                //----------------------------
                repoDiv.appendChild(repoName);
                repoDiv.appendChild(repoDetails);
                //----------------------------
                repos_data.appendChild(repoDiv);
            });
        }
        
    });
}

