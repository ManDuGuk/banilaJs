const loginForm = document.querySelector("#loginform")
const loginInput = document.querySelector("#loginform input");
const submitBtn = document.querySelector("#loginform button");
const title = document.querySelector("#username");
const CLASS_HIDDEN = "hidden";
const USER_NAME = "username"
const savedUser = localStorage.getItem(USER_NAME);


const handleSubmit = (event) => {
    event.preventDefault();
    const username = loginInput.value;
    showUser(username);
    localStorage.setItem("username", username);
}

const showUser = (username) => {
    title.innerHTML = `Hello ${username}`;
    loginForm.classList.add(CLASS_HIDDEN)
    title.classList.remove(CLASS_HIDDEN);
}

// ==null null과 undefined 둘다 검사함, ===null null만 검사함
savedUser == null ? "" : showUser(savedUser);


loginForm.addEventListener("submit", handleSubmit);



