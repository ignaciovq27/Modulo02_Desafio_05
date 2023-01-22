const formulario = document.getElementById("formulario")
const input = document.getElementById("input")
const listaTareas = document.getElementById("lista-tareas")
const template = document.getElementById("template").content
const template2 = document.getElementById("template-2").content
const fragment = document.createDocumentFragment()
const spanTotal = document.getElementById("spanTotal")
const spanComplete = document.getElementById("spanComplete")


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
    pintarTareas()
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
    pintarTareas()
    actualizarTotalTareas()
}

//Renderizar Tareas en lista
const pintarTareas = () => {
    //Crear div inicial de que NO hay tareas pendientes
    // if (tareas.length === 0) {
    //     listaTareas.innerHTML = `
    //     <div class="alert alert-dark text-center py-5 mx-2">
    //     <h3 class="m-0 d-inline-block text-truncate">
    //     <i class="fa-solid fa-splotch text-primary fa-spin px-2 "style="--fa-animation-duration: 7s;">
    //     </i>No hay tareas pendientes<i class="fa-solid fa-splotch text-primary fa-spin px-2" style="--fa-animation-duration: 7s;"></i>
    //     </h3>
    //     </div>
    //         `
    //     return
    // }
     //Crear div inicial de que NO hay tareas pendientes

    if (tareas.length === 0) {
        listaTareas.innerHTML = ""
        const clone2 = template2.cloneNode(true) //clonar template
        fragment.appendChild(clone2) //fragment almacena el html clonado
        listaTareas.appendChild(fragment)

        // comprobar array de tareas
        console.log(tareas)
        return
    }

    //Renderizar cada tarea con template
    tareas.forEach((tarea) => {
        listaTareas.innerHTML = ""
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
        pintarTareas()
    }
    // cambiar estado de tarea a completadas a falso
    if (e.target.classList.contains('fa-arrow-rotate-left')) {
        const index = tareas.findIndex((tarea) => tarea.id === parseInt(e.target.dataset.id))
        tareas[index].state = false //Cambiar state a false
        pintarTareas()
    }

    if (e.target.classList.contains('fa-trash-can')) {
        // borrar tarea de lista
        const index = tareas.findIndex((tarea) => tarea.id === parseInt(e.target.dataset.id))
        tareas.splice(index, 1) //borrar tarea del arreglo
        pintarTareas()
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