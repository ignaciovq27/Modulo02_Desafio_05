const formulario = document.getElementById("formulario")
const input = document.getElementById("input")
const listaTareas = document.getElementById("lista-tareas")
const template = document.getElementById("template").content
const template2 = document.getElementById("template-2").content
let fragment = document.createDocumentFragment()
const spanTotal = document.getElementById("spanTotal")
const spanComplete = document.getElementById("spanComplete")
const gridCheck = document.getElementById("gridCheck")
const divFiltro = document.getElementById("divFiltro")
const idLabel = document.getElementById("idLabel")

//arreglo inicial de tareas con tareas por defecto
let tareas = [
    {
        id: 1,
        name: "Tarea_Default_01",
        state: false
    },
    {
        id: 2,
        name: "Tarea_Default_02",
        state: false
    },
    {
        id: 3,
        name: "Tarea_Default_03",
        state: false
    },
]

//renderizar tareas Default al inciar el documento
document.addEventListener('DOMContentLoaded', () => {
    renderTareas()
    actualizarTotalTareas()
})

//Interacción de botones dentro de cada tarea
listaTareas.addEventListener("click", (e) => {
    btnAccion(e)
})

//Iniciar evento de botón
formulario.addEventListener("submit", (e) => {
    e.preventDefault()
    setTarea(e)
})

const setTarea = e => {
    //validar el evento con la inforación del input
    if (input.value.trim() === "") {
        alert("Ingresa una nueva tarea en el formulario.")
        input.focus()
        return
    }

    //Crear la tarea ingresada
    const tarea = {
        id: Date.now(),
        name: input.value,
        state: false
    }

    //Crear tarea en objeto Tareas
    tareas.push(tarea)

    //Resetear input y realizar focus
    formulario.reset()
    input.focus()

    //Actualizar lista de tareas e informacion
    renderTareas()
    actualizarTotalTareas()
}

//Renderizar Tareas en lista
const renderTareas = () => {
    listaTareas.innerHTML = ""
    fragment = document.createDocumentFragment()
    //Crear div inicial de que NO hay tareas pendientes
    if (tareas.length === 0) {
        listaTareas.innerHTML = ""
        const clone2 = template2.cloneNode(true) //clonar template
        fragment.appendChild(clone2) //fragment almacena el html clonado
        listaTareas.appendChild(fragment)
    }
    //Renderizar cada tarea con template
    tareas.forEach((tarea) => {
        if (gridCheck.checked) {
            if (tarea.state) {
                const clone = template.cloneNode(true) //clonar template
                clone.querySelector("#idTarea").textContent = tarea.id //modificar template
                clone.querySelector("#idName").textContent = tarea.name //modificar template

                //Actualizar graficas de cada tarea completada
                if (tarea.state) {
                    clone.querySelector('.bg-light').classList.replace("bg-light", "bg-dark")
                    clone.querySelector('.fa-circle-check').classList.replace("fa-circle-check", "fa-arrow-rotate-left")
                    clone.querySelector('.fa-arrow-rotate-left').classList.remove("fa-beat")
                    clone.querySelector('.fa-arrow-rotate-left').classList.replace("text-primary", "text-dark")
                    clone.querySelector('.fa-trash-can').classList.replace("text-secondary", "text-dark")
                    clone.querySelector('.fa-trash-can').classList.replace("text-secondary", "text-dark")
                    clone.querySelector('.fa-arrow-rotate-left').classList.add("fa-shake")
                    clone.querySelector('.fa-trash-can').classList.add("fa-fade")
                    clone.getElementById("idTarea").style.textDecoration = "line-through"
                    clone.getElementById("idName").style.textDecoration = "line-through"
                }

                clone.querySelectorAll(".fa-solid")[0].dataset.id = tarea.id
                clone.querySelectorAll(".fa-solid")[1].dataset.id = tarea.id
                fragment.appendChild(clone) //fragment almacena el html clonado
            }

        }
        else {
            const clone = template.cloneNode(true) //clonar template
            clone.querySelector("#idTarea").textContent = tarea.id //modificar template
            clone.querySelector("#idName").textContent = tarea.name //modificar template

            //Actualizar graficas de cada tarea completada
            if (tarea.state) {
                clone.querySelector('.bg-light').classList.replace("bg-light", "bg-dark")
                clone.querySelector('.fa-circle-check').classList.replace("fa-circle-check", "fa-arrow-rotate-left")
                clone.querySelector('.fa-arrow-rotate-left').classList.remove("fa-beat")
                clone.querySelector('.fa-arrow-rotate-left').classList.replace("text-primary", "text-dark")
                clone.querySelector('.fa-trash-can').classList.replace("text-secondary", "text-dark")
                clone.querySelector('.fa-trash-can').classList.replace("text-secondary", "text-dark")
                clone.querySelector('.fa-arrow-rotate-left').classList.add("fa-shake")
                clone.querySelector('.fa-trash-can').classList.add("fa-fade")
                clone.getElementById("idTarea").style.textDecoration = "line-through"
                clone.getElementById("idName").style.textDecoration = "line-through"
            }
            clone.querySelectorAll(".fa-solid")[0].dataset.id = tarea.id
            clone.querySelectorAll(".fa-solid")[1].dataset.id = tarea.id
            fragment.appendChild(clone) //fragment almacena el html clonado
        }

    })
    //añadir fragment a lista
    listaTareas.appendChild(fragment)

    // comprobar array de tareas
    console.log(tareas)
}

const btnAccion = (e) => {
    // cambiar estado de tarea a completadas a verdadero
    if (e.target.classList.contains('fa-circle-check')) {
        const index = tareas.findIndex((tarea) => tarea.id === parseInt(e.target.dataset.id))
        tareas[index].state = true //Cambiar state a true
        renderTareas()
    }
    // cambiar estado de tarea a completadas a falso
    if (e.target.classList.contains('fa-arrow-rotate-left')) {
        const index = tareas.findIndex((tarea) => tarea.id === parseInt(e.target.dataset.id))
        tareas[index].state = false //Cambiar state a false
        renderTareas()
    }

    // borrar tarea de lista
    if (e.target.classList.contains('fa-trash-can')) {
        const index = tareas.findIndex((tarea) => tarea.id === parseInt(e.target.dataset.id))
        tareas.splice(index, 1) //borrar tarea del arreglo
        renderTareas()
    }

    actualizarTotalTareas()
    actualizarTotalTareasCompletadas()
    e.stopPropagation() //detener el Click solo dentro del container de tarea
}

function actualizarTotalTareas() {
    let contadorTareas = tareas.length;
    spanTotal.innerHTML = contadorTareas;
}

function actualizarTotalTareasCompletadas() {
    const filtrarTareasCompletadas = tareas.filter(tarea => tarea.state === true)
    spanComplete.innerHTML = filtrarTareasCompletadas.length
}

gridCheck.addEventListener("change", (e) => {
    if (gridCheck.checked) {
        divFiltro.classList.add("bg-primary", "bg-opacity-25", "border", "border-primary", "rounded")
        idLabel.classList.add("text-dark")
    }
    else {
        divFiltro.classList.remove("bg-primary", "bg-opacity-25", "border", "border-primary", "rounded")
        idLabel.classList.remove("text-dark")
    }
    // fragment = null
    // listaTareas.innerHTML = ""
    renderTareas()
})

function actualizarGraficasTareas()


{/* <div class="form-group m-0">
                <div class="form-check me-2 m-0" id="divFiltro">
                    <input class="form-check-input" type="checkbox" id="gridCheck" role="button" for="gridCheck">
                    <h5 id="idLabel" class="my-0 me-3 text-primary" role="button" type="checkbox">FILTRAR TAREAS COMPLETADAS</h5>
                </div>
            </div> */}