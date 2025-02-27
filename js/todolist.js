const todoForm = document.querySelector("#todoForm");
const todoList = document.querySelector("#todoList");

let toDos = [];
const TODOS_KEY = "todos"


function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));

}

todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const todoInput = todoForm.querySelector("input")
    const inputVal = todoInput.value;

    if (!inputVal) return alert("값을 입력하세요")
    else {

        toDos.push(inputVal);
        saveToDos();

        addTodo(inputVal);
        todoInput.value = "";
    }

})

const addTodo = (value) => {
    //1번 방식
    // todoList.innerHTML += `
    // <li>
    //     ${value}
    //     <button>done</button>
    // </li>
    // `;

    //2번방식
    const todoLi = document.createElement("li");
    todoLi.append(value);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "done";
    todoLi.appendChild(deleteBtn);
    todoList.appendChild(todoLi);

    //이벤트 리스너 추가
    deleteBtn.addEventListener("click", (event) => {
        console.dir(event.target);
        event.target.closest("li").remove();
        toDos = toDos.filter(item => item !== event.target.closest("li"))
        saveToDos();
    })

};


const savedToDos = localStorage.getItem(TODOS_KEY);
console.log("savedToDos", savedToDos);

if (savedToDos !== null) {
    toDos = JSON.parse(savedToDos)
    console.log("parsedToDos", toDos);
    toDos.forEach(element => {
        addTodo(element)
    });
}