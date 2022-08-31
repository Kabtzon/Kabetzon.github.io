let idCounter =0;
const input = document.querySelector('input[type="text"]');

userInput.addEventListener('submit', (event)=>{
    event.preventDefault();
    addTask();
})

let addTask=()=>{
        idCounter++;

        let newVal = input.value;

    list.innerHTML += `
    <div class="task_container" id="${idCounter}">
        <lable> 
            <input type="checkbox">
            ${newVal}
        </lable> 
        <img src="./IMG/DELETE2.png" class="closeBtn">
    </div>`
    input.value='';
    updateStats();
};

list.addEventListener('click', (event)=>{
    if(event.srcElement.nodeName == 'INPUT'){
        updateStats();
    }else if(event.srcElement.nodeName == 'IMG'){
        deleteTask(event.srcElement.parentNode.id);
    }
})

let updateStats =()=>{
    let element=list.querySelectorAll('div')
    let checkbox=list.querySelectorAll('input[type="checkbox"]:checked')

    stats.innerHTML=`<p>Tareas Pendientes:${element.length} Completadas: ${checkbox.length}</p>`
};
let deleteTask=(id)=>{
    let taskDelete = document.getElementById(id);
    list.removeChild(taskDelete);
    updateStats();
}