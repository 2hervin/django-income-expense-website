const usernameField = document.querySelector("#usernameField");
const feedBackArea = document.querySelector(".invalid_feedback");
const emailField= document.querySelector("#emailField");
const emailFeedBackArea = document.querySelector(".emailFeedBackArea");
const passwordField = document.querySelector("#passwordField");
const usernameSuccessOutput = document.querySelector(".usernameSuccessOutput");
const showPasswordToggle = document.querySelector(".showPasswordToggle");
const submitBtn = document.querySelector(".submit-Btn");

const handleToggleInput = (e) => {
  if (showPasswordToggle.textContent === "SHOW"){
    showPasswordToggle.textContent = "HIDE";
    passwordField.setAttribute("type", "text");
  } else {
    showPasswordToggle.textContent = "SHOW";
    passwordField.setAttribute("type", "password");
  }
};

showPasswordToggle.addEventListener("click", handleToggleInput);

emailField.addEventListener("keyup", (e) => {
  //this is equal to what the user is typing
    const emailVal = e.target.value;
    emailField.classList.remove("is-invalid");
    emailFeedBackArea.style.display ="none"; 

 //fetch api as postman did
 if (emailVal.length >0){
    fetch("/authentication/validate-email", {
        body: JSON.stringify({ email: emailVal}),
        method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.email_error){
//for disabling the button when above error happens
            submitBtn.disabled = true;
            //create boostrap class that turns to red 
            emailField.classList.add("is-invalid");
            emailFeedBackArea.style.display ="block";
            //display data to a template from request
            emailFeedBackArea.innerHTML = `<p>${data.email_error}</p>`
        }else{
          submitBtn.removeAttribute("disabled");
        }
      });
 }
});



//this is for listenning what the user is trying to type anf keyup is generated
usernameField.addEventListener("keyup", (e) => {
  //this is equal to what the user is typing
    const usernameVal = e.target.value;

    usernameSuccessOutput.textContent = `Checking ${usernameVal}`;

     //removing the error
     usernameField.classList.remove("is-invalid");
     feedBackArea.style.display ="none"; 
 //fetch api as postman did
 if (usernameVal.length >0){
    fetch("/authentication/validate-username", {
        body: JSON.stringify({ username: usernameVal}),
        method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        usernameSuccessOutput.style.display ="none";
        if(data.username_error){
          //for disabling the button when above error happens
            submitBtn.disabled = true;
            //create boostrap class that turns to red 
            usernameField.classList.add("is-invalid");
            feedBackArea.style.display ="block";
            //display data to a template from request
            feedBackArea.innerHTML = `<p>${data.username_error}</p>`
        }else{
          submitBtn.removeAttribute("disabled");
        }
      });
 }
});