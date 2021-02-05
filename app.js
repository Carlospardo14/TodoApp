// Arreglo donde se guardan los objetos
let todoItems = [];
// Funcion paraa agregar una acción
function addTodo(text) {
    // Objeto todo contiene texto, que no esta realizada y un id generado con Date.now
    const todo = {
      text,
      checked: false,
      id: Date.now(),
    };
//   Agregamos el objeto creado al arreglo
    todoItems.push(todo);
    // Llamada a la funcion renderTodo que se encarga de pintar en pantalla cada acción
    renderTodo(todo);
  }
var app = document.getElementById("app");
//contenedor de la app
var container = document.createElement("div");
// le agregamos una clase al elemento div
container.classList.add("container");
//Titulo de la APp
var title = document.createElement("h1");
// le agregamos una clase al elemento h1
title.classList.add("app-title");
// Contenido del titulo
title.innerHTML= "To Do App";
//Contendedor de la lista
var ul = document.createElement("ul");
// le agregamos clasee al elemento ul
ul.classList.add("todo-list");
ul.classList.add("js-todo-list");
// Unimos los elementos al contenedor y despues a la app para agregarlos al DOM
container.appendChild(title);
container.appendChild(ul);
app.appendChild(container);
//div para mostrar 
var emptyDiv = document.createElement("div");
// le agregamos una clase al elemento div
emptyDiv.classList.add("empty-state");
// Agregamos el div al Contenedor
container.appendChild(emptyDiv);
// Creamos un elemento h2 para un subtitulo
var emptyTitle = document.createElement("h2");
// le agregamos una clase al elemento h2
emptyTitle.classList.add("empty-state__title");
//Contenido del subtitulo
emptyTitle.innerHTML= "Agrega tu primer tarea";
// Creamos un elemento P
var emptyP = document.createElement("p");
// le agregamos una clase
emptyP.classList.add("empty-state__description");
// Contenido de el elemento
emptyP.innerHTML= "Que vas a hacer hoy?";
// Unimos los elementos creados al Div
emptyDiv.appendChild(emptyTitle);
emptyDiv.appendChild(emptyP);

//Formulario de entrada
var taskForm = document.createElement("form");
//asignamos un id al formulario "taskForm"
taskForm.setAttribute("id", "taskForm");
//creamos un elemento de "input"
var input = document.createElement("input");
// Atributo de tipo de entrada texto
input.setAttribute("type", "text");
// Placeholder para ejemplo de texto
input.setAttribute("placeholder", "Ejemplo desarrollar una app ");
// Agregamos una clase 
input.classList.add("js-todo-input");
// Los agregamos al DOM
taskForm.appendChild(input);
container.appendChild(taskForm);

function renderTodo(todo) {
    // Seleccionamos el elemento donde vamos a renderizar nuestras acciones
    const list = document.querySelector('.js-todo-list');
    // Elemento seleccionado si ya existe
    const item = document.querySelector(`[data-key='${todo.id}']`);
    // Si el objeto tiene la propiedad deleted, entonces lo eliminamos del DOM
    if (todo.deleted) {
      item.remove();
      return
    }
    // Operador ternario para saber si ya se realizo una actividad
    const isChecked = todo.checked ? 'done': '';
    // Se crea un elemento li que es cada actividad creada
    const node = document.createElement("li");
    // Se le asigna una clase
    node.setAttribute('class', `todo-item ${isChecked}`);
    // Se le asigna el id a la propiedad data-key
    node.setAttribute('data-key', todo.id);
  //  En el nodo creado agregamos el chechbox, el texto y el botón para borrar la entrada
    node.innerHTML = `
      <input id="${todo.id}" type="checkbox"/>
      <label for="${todo.id}" class="tick js-tick"></label>
      <span>${todo.text}</span>
      <button class="delete-todo js-delete-todo fas fa-times-circle fa-2x red">
      </button>
    `;
  // Para no renderizar dos veces la acción remplazamos el nodo cuando la opcion checkbox es seleccionada, en otro caso añadimos el elemento al DOM 
    if (item) {
        list.replaceChild(node, item);
      } else {
        list.append(node);
      }
  }
//Seleccionamos el Formulario de entrada
const form = document.getElementById("taskForm");
//Cuando se hace el submit, evitamos que siga el default
form.addEventListener('submit', event => {
    event.preventDefault();
    // Seleccionamos la entrada de texto
    const inputElement= document.querySelector(".js-todo-input");
    // Obtenemos el texto (el .trim() es para quitar espacios en blanco)
    const text = inputElement.value.trim();
    // Si el texto no esta vacio se llama a la función addTodo
    if(text != ''){
        addTodo(text);
        // Se vacia el input
        input.value = '';
        // .focus() es para que el cursor se quede en la entrada de texto
        input.focus();
    }
});
// Funcion para cambiar estado del checbox
function toggleDone(key) {
  // Buscamos el index del elemento
    const index = todoItems.findIndex(item => item.id === Number(key));
    // Cambiamos el estado de la propiedad checked negandolo
    todoItems[index].checked = !todoItems[index].checked;
    // Se llama a la funcion renderTodo
    renderTodo(todoItems[index]);
  }
// Funcion para eliminar una acción
  function deleteTodo(key) {
    // Buscamos el index del elemento
    const index = todoItems.findIndex(item => item.id === Number(key));
    // al objeto con el index seleccionado le agregamos la propiedad delete y la ponemos en true
    const todo = {
      deleted: true,
      ...todoItems[index]
    };
    // Eliminamos de el arreglo el elemento que tenga ese id
    todoItems = todoItems.filter(item => item.id !== Number(key));
    // LLamada a funcion renderTodo
    renderTodo(todo);
  }
// Seleccionamos el elemento donde se renderizan nuestras acciones
const list = document.querySelector('.js-todo-list');
// Al haber un click en algun elemento ya sea checkbox o boton
list.addEventListener('click', event => {
  // Si es en el checkbox (lo sabemos porque contiene la classe js-tick) obtenemos el id y llamamos a la funcion toggleDone
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
  // Si es en el boton de borrar obtenemos el id y llamamamos a la funcion deleteTodo 
  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});