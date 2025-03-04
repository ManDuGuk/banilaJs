const todoForm = document.querySelector("#todoForm");
const todoList = document.querySelector("#todoList");
const TODOS_KEY = "todos"

let toDos = [];


function saveToDos(todoList) {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todoList));

}

todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const todoInput = todoForm.querySelector("input")
    const inputVal = todoInput.value;

    if (!inputVal) return alert("값을 입력하세요")
    else {

        const newTodoObj = {
            id: Date.now(),
            text: inputVal,
        }
        toDos.push(newTodoObj);
        saveToDos(toDos);

        addTodo(newTodoObj);
        todoInput.value = "";
    }

})

const addTodo = (todoObj) => {
    //1번 방식
    // todoList.innerHTML += `
    // <li>
    //     ${value}
    //     <button>done</button>
    // </li>
    // `;

    //2번방식
    const todoLi = document.createElement("li");
    todoLi.id = todoObj.id;
    todoLi.append(todoObj.text);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "done";
    todoLi.appendChild(deleteBtn);
    todoList.appendChild(todoLi);

    //이벤트 리스너 추가
    deleteBtn.addEventListener("click", (event) => {
        console.dir(event.target);
        const li = event.target.closest("li")
        li.remove();
        const newTodoList = toDos.filter((obj) => {
            //하나는 숫자고 하나는 문자이기 때문에 비교시 형비교 주의
            return obj.id != li.id
        });
        console.log(newTodoList);

        saveToDos(newTodoList);
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