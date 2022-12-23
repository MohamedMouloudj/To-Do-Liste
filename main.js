//     DATE Part     //
let FstDiv=document.querySelector('.clock');
setInterval(()=>{
    let date=new Date();
    FstDiv.innerHTML= date.getHours()+":"+date.getMinutes();
},1000)


//setting variables
let input = document.querySelector('#input');
let Newdiv = document.querySelector('.tasks');
let add = document.querySelector('.btn-1');


//Empty array to store tasks (A)
let Tasklist= [];

//Check if there are tasks in locale storage, if there is it gives it to the empty array(B')
if(localStorage.getItem("Task")){
    Tasklist=JSON.parse(localStorage.getItem("Task"));
}

//thisactivate the function thet get tasks from local storage and show it on the page(c)
getTaskFromlocal();

//Add task to web page (D)
add.onclick=function get() {
    if (input.value !== "") {
        addTask(input.value);
    } else {
        alert("Please add task");
    }
    input.value="";
}
//Delete one task
Newdiv.addEventListener("click", (e) =>{  //(e)-->event
    if(e.target.classList.contains("delete")){  //if the user clicked on target contains "delete" class(1)
        deleteTaskFromArr(e.target.parentElement.parentElement.getAttribute("data-id"));//to delete task from local storage   
        e.target.parentElement.parentElement.remove();//>it will remove the parrent (which contains one task and other elements) from the page(2) 
    }

    if(e.target.classList.contains("check")){//if the event target the element with class "check"(here it's checkbox)
        toggleStatus(e.target.parentElement.parentElement.getAttribute("data-id"));
        e.target.parentElement.parentElement.classList.toggle("complete");//to add class "complete" to Newdiv
        toggleStatus2(e.target.getAttribute("data-id"));//To change the status of "checked" of the object bellow 
    }
})



function addTask(x){
    ///Giving the value wrote by user (Task) to an object (we choose object because we will nedd it)
    let task={
        include: input.value,
        id: Date.now(),
        done: false,
        checked: false,
    }
    //add the task to the empty array (push because user need it to be ordered)
    Tasklist.push(task);
    //Add an element includes the tasks
    addElement(Tasklist);
    //Add task to local storage
    addTaskTolocal(Tasklist);
}
//(D')
function addElement(y){
    //Removing the old task form the new made div (to do not repeat because forEach Method repeats old task)
    Newdiv.innerHTML="";
    i=0;
    Tasklist.forEach((task)=>{
        let div = document.createElement('div');
         //for each value in the array (value=task here because we pushed tasks) the function put it in an element
        let p=document.createElement('p');
        let cntnt = document.createTextNode(task.include);
        p.appendChild(cntnt);
        div.appendChild(p);
        p.classList.add('p');
        div.classList.add('tsk');
        div.setAttribute('data-id', task.id )//to link the task id with div's id

        Newdiv.appendChild(div);  //To put the element inside the biggest current div on the page  (visual)
        
        //Adding delete button
        let del = document.createElement('button');
        let delClss = document.createElement('i');
        delClss.classList.add('fa-solid');
        delClss.classList.add('fa-x');
        delClss.classList.add('fa-xs');
        del.appendChild(delClss);

        //Adding CheckBox
        let checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');

        if(task.done === true ){//To stor the new class
            div.classList.add('tsk'); 
            div.classList.add('complete');//linked with css for line through property
        }
        checkBox.setAttribute('data-id',task.id);
       
        checkBox.setAttribute('id', i)
         i++;
        //separating content
        let Udiv=document.createElement('div');
        Udiv.appendChild(checkBox);
        Udiv.appendChild(del);
        
        //Adding everything
        div.appendChild(Udiv);
        
        //To style everything 
        del.classList.add('delete');
        checkBox.classList.add('check');
        Udiv.classList.add('udiv');
    })
} 

//(D'')
//Add the storing array to local storage
function addTaskTolocal(Tasklist){
    localStorage.setItem("Task", JSON.stringify(Tasklist));//json to send it as string
}                        //key     //valuet(tasks array)

//(B')
//Retreiving tasks and data from local storage
function getTaskFromlocal(){
    let tasks=JSON.parse(localStorage.getItem("Task"));//json to give an object(called "tasks")
    addElement(tasks);//re-showing tasks after reload
}

function deleteTaskFromArr(divId){
    Tasklist = Tasklist.filter((task) => task.id != divId );
    addTaskTolocal(Tasklist);
}

function toggleStatus(divId){
    for(let i=0; i<Tasklist.length;i++){
        if(Tasklist[i].id == divId){
        Tasklist[i].done == false ? (Tasklist[i].done = true) : (Tasklist[i].done = false);
            // if it was:             //it will be:  /if it was:   //it will be: 
        
        }
    }
    addTaskTolocal(Tasklist);
}

function toggleStatus2(Id){
    for(let i=0; i<Tasklist.length;i++){
        if(Tasklist[i].id==Id){
            Tasklist[i].checked==false ? Tasklist[i].checked=true : Tasklist[i].checked=false;
        }  
        if(Tasklist[i].checked==true){//if "checked" status is true do textDecoration
            document.getElementById(i).style.textDecoration='line-through';
        }
    }

    addTaskTolocal(Tasklist);//then add "checked"status and tedxtDecoration to the array then to local storage
} 

for(let i=0; i<Tasklist.length;i++){
    if(Tasklist[i].checked==true){
        let box=document.getElementById(i);
        box.setAttribute('checked', 'checked');//if "checked"status is true re-set chebox checked
    }
}
//to delete everything from the page and local stroage
let da=document.querySelector('.btn-2');
da.onclick=function deleteAll(){
    localStorage.removeItem("Task");
    Newdiv.innerHTML="";
    location.reload();
}