const get = (param) => document.getElementById(`${param}`);
const input = get("input");
const btnsubmit = get("submit");
const userName = get("name");
const date = get("date");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const bio = get("bio");
const followers = get("Follower");
const following = get("Following");
const repos = get("repo");
const user_location = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");
const body = get("body");
const noresults = get("no-results");
// const container =get("container");
// const info = get("info");
// const others = get("others");
// const loadingScreen = document.querySelector(".loading-container");




async function getUser(gitUrl) {

  // loadingScreen.classList.add("active");
  // userInfoContainer.classList.remove("active");
  try {
    const response =  await fetch(`https://api.github.com/users/${gitUrl}`);
    const data = await response.json();
    renderInfo(data);
    console.log(data);

    // loadingScreen.classList.remove("active");
    // userInfoContainer.classList.add("active");
  }
  catch (err) {
    throw err;
  }
}

// make search  button active to search
btnsubmit.addEventListener("click", function () {
  if (input.value !== "") {
    getUser(input.value);

  }
});


input.addEventListener("input", function () {
  noresults.style.display = "none";
});



//make enter button workble to search the user
input.addEventListener(
  "keydown",
  function (e) {
    if (e.key == "Enter") {
      if (input.value !== "") {
        getUser(input.value);
      }
    }
  },
  false
);



function renderInfo(data) {

  if (data.message !== "Not Found") {
    noresults.style.display = "none";


    //its for checking the avaibilityy of the loction link twitter acount etc. its check that github have your data or not if not then it return the not aviable for the chekcing purfose i send the function in this name CheckNULL
    function checkNull(param1, param2) {
      if (param1 === "" || param1 === null) {
        param2.style.opacity = 1;
        param2.previousElementSibling.style.opacity = 0.5;
        return false;
      } else {
        return true;
      }
    }
    avatar.src = `${data.avatar_url}`;
    userName.innerText = data.name === null ? data.login : data.name;
    user.innerText = `@${data.login}`;
    user.href = `${data.html_url}`;
    console.log("date");
    datesegments = data.created_at.split("T").shift().split("-");
    date.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
    bio.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
    repos.innerText = `${data.public_repos}`;
    followers.innerText = `${data.followers}`;
    following.innerText = `${data.following}`;
    user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
    page.innerText = checkNull(data.blog, page) ? data.blog : "Not Available";
    page.href = checkNull(data.blog, page) ? data.blog : "#";
    twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
    twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
    company.innerText = checkNull(data.company, company) ? data.company : "Not Available";
    searchbar.classList.toggle("active");
    profilecontainer.classList.toggle("active");
  } else{

    noresults.style.display = "block";

    // alert("No Acoount Found");


  }

}







//INITIALISE UI
function init() {

  //by default, Karan ka prifole
  getUser("geekskaran");
}

init();


