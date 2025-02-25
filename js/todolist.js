const todoForm = document.querySelector("#todoForm");
const todoList = document.querySelector("#todoList");

todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const todoInput = todoForm.querySelector("input")
    const inputVal = todoInput.value;

    if (!inputVal) return alert("값을 입력하세요")
    else {
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
    todoForm.appendChild(todoLi);

    //이벤트 리스너 추가
    deleteBtn.addEventListener("click", (event) => {
        console.dir(event.target);
        event.target.closest("li").remove();

    })
};


