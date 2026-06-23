//fetch and display post

//1. Getting elements using id(post: button- fetchbutton,error and postlist))
const fetchButton = document.getElementById("fetchButton");
const errorMessage = document.getElementById("error");
const postList = document.getElementById("postList");

//2.Getting elements using id(postform,titleinput,bodyinput,formerror,form success)
const postForm = document.getElementById("postForm");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");


//writing function for Posts(fetching data and displaying the data )

//function for fetchPosts
function fetchPosts() {
    postList.innerHTML = "Loading..";
    errorMessage.textContent = "";

    fetch("https://jsonplaceholder.typicode.com/posts") //request method :GET 

        .then(function (response) {
            if (!response.ok) {
                throw new Error(": failed to fetch");
            }
            return response.json();
        })

        .then(function (posts) {
            renderPosts(posts);    //will display the fetched data on the page,
        }
        )

        .catch(function (error) {
            postList.innerHTML = "";
            errorMessage.textContent = "Error" + error.message;
        })

}

fetchButton.addEventListener("click", fetchPosts);

//function for renderPosts
function renderPosts(posts) {
    postList.innerHTML = "";

    posts.forEach(function (eachitem) {
        const div = document.createElement("div");
        div.innerHTML = `
    <h3>${eachitem.title}</h3>
    <p>${eachitem.body}</p>
    <hr>
`;

        postList.appendChild(div);


    });
}

//submit form

postForm.addEventListener("submit", (event) => { // make sure to add event parameter so the browser doesn't actually refresh the page 
  event.preventDefault();
  // user input
  const title = titleInput.value;
  const body = bodyInput.value;


  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST", // replaces default
    headers: { "Content-Type": "applicaiton/json" }, // specifies the format of request body
    body: JSON.stringify( // turns user data into a string
      {
        title,
        body
      })
  }).then(response => {
    if (!response.ok) { // valiadtion if connectivity issue
      throw new Error("Post submission unsuccessful")
    }
    alert("Form submitted!");
    return response.json()
  }).then(data => {
    formSuccess.textContent = "Post submitted!"
    
    // reset form text content
    titleInput.value = "";
    bodyInput.value = "";
  }).catch(err => {
    formError.innerHTML = "Error submitting posts: " + err.message;
  });
})








