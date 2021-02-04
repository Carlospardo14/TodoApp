//variable de la app Global
var app = document.getElementById("app");
//Contenedor de elementos en pantalla
var appContainer = document.createElement("div");
appContainer.classList.add("container")
app.appendChild(appContainer)

//Arreglo para cosas que hacer
let todoItems = [];

//Funcion para agregar elementos al arreglo de cosas que hacer
function addTodo(text){
    const todo = {
        text,
        checked: false,
        id: Date.now()
    };
    todoItems.push(todo);
    console.log(todoItems)
}
//ELemento H2 como titulo de la APP
var formHeader = document.createElement("h2");
formHeader.innerHTML= "Todo App";
formHeader.classList.add("text-center");
appContainer.appendChild(formHeader);

//Creacion del Formulario
var createForm = document.createElement("form");
createForm.setAttribute("action", ""); 
appContainer.appendChild(createForm);
//Contenedor del Formulario
var formContainer = document.createElement("div");
formContainer.classList.add("d-flex");
formContainer.classList.add("justify-content-center");
createForm.appendChild(formContainer)
//Div del text input y del boton 
var inputDiv = document.createElement("div");
formContainer.appendChild(inputDiv)
var inputButton = document.createElement("div");
formContainer.appendChild(inputButton)
//Text input y sus atributos
var inputElement = document.createElement('input');
inputElement.setAttribute("type", "text");
inputElement.setAttribute("name", "taskInput");
inputElement.setAttribute("id", "taskInput");
inputElement.classList.add("form-control");
inputElement.setAttribute("placeholder", "NewTask")
inputDiv.appendChild(inputElement)
//Boton y sus atributos
var createButton = document.createElement("button");
createButton.innerHTML =" Add";
createButton.setAttribute("type", "button")
createButton.classList.add('ml-2');
createButton.classList.add('btn');
createButton.classList.add('btn-light');
inputButton.appendChild(createButton)

//Evento de click y llama a la funcion de agregar elementos
var taskButton = document.querySelector("button");
taskButton.addEventListener("click", () => {
    var text = document.getElementById("taskInput").value;
    console.log(text)
    addTodo(text)
});



