



$('#currentTags').on('click', 'button' ,function (event) {
    
    processDelete(event.target);
});
/*
 * processDelete is a function used by click handler 
 * @param target-target delete button clicked 
 */
function processDelete(target) { 
    
    console.log(target);
    var selID = $(target).attr('id');
    console.log(selID);
    var targetedLI = target.closest('li');
    targetedLI.remove();
    var addTaskLIRemove = $('#tags').find('#'+selID);
    var labelToRemove = addTaskLIRemove.closest('label');
    $(addTaskLIRemove).remove();
    $(labelToRemove).remove();
    closeAllDropDowns();
    //delete tagColors[selID];//delete color from tagColors dictionary
}




//global variable that holds the tasklist used
var theTaskList = new TaskList('SKYLAR');



//save original tasks for reload use
var exTkDescrips =
    [
        {text: "send graduation cards to friends",
         priority: "medium",
         duedate: "5/15/2021",
         tag: "personal"
        }
    ];

//make and save reloadable Example TaskList ON LOAD
$( window ).on( "load", function() { 
    theTaskList.ary.splice(0, 1);
    $("#theTasks").empty(); 
    
    theTaskList.addTasks(exTkDescrips);
    var reloadString= JSON.stringify(theTaskList.ary);
    localStorage.setItem('RELOAD', reloadString);
    updateTags();
});

var aryOfIds;
/**
 * RELOAD METHOD TO BE USED WITHIN THE RELOAD CLICK HANDLER. RELOADS ORIGNAL EXAMPLE LIST
 */
function reload(){
    
    //make array of ids of any tasks currently in internal array to be used with .deleteTask()
    aryOfIds = theTaskList.ary.map(function(task){
        console.log(task.id);
        return[task.id];
    });
    
    //remove tasks from dom
    theTaskList.ary.forEach(function(task){
        task.delete();
        console.log('deleted from dom');
    });
//remove any tasks from internal array
    aryOfIds.forEach(function(id){
        theTaskList.deleteTask(id);
        console.log('got to line 106');
    });

    //add tasks back to internal array
    var x = localStorage.getItem('RELOAD');
    console.log(x);
     var y = JSON.parse(x);
     console.log(y);


     //add tasks back to the DOM
     theTaskList.addTasks(y);
     console.log('got to add');
}



//reload click handler
$('#resetButton').on('click',function(){
    reload()
});

//initialize datepicker
$( function() {
    $( "#taskDueDate" ).datepicker();
  } );







//change submit on add tag form from submit type to normal button
$("#addTagForm").find('button').attr('type', 'button'); 
//add id to the add tag button for easy click handler writing
$("#addTagForm").find('button').attr('id', 'tagSubmitter'); 



//click handler for add tag submit button
$('#tagSubmitter').on('click', function(){
    addTagFromForm();
    closeAllDropDowns();
});



/**
 * addTaskFromForm() to gather the inputs from the form into a single 
 * description dictionary and add it to theTaskList as a task, using the .addTask() method.
 */
function addTaskFromForm(){
    //gather the values that will be used as task's instance variable 
    var taskDescript = $('#taskText').val();
    var taskPriority = $('[name="taskPriority"]').val();
    var taskDue = $('#taskDueDate').val();

    var tTag = $('input[name="tag"]:checked').val();
    console.log(tTag);

    var description = {};
    //build description
    description['text'] = taskDescript;
    description['priority'] = taskPriority;
    description['duedate'] = taskDue;
    description['tag'] = tTag;
//pass description to addTask to make the task
    theTaskList.addTask(description);
}

//click handler for add button
$("#addTaskButton").click(function(){
    addTaskFromForm();
    closeAllDropDowns();
});

//delegated event handler to print to console task id of task whose "done" button was clicked. 
$('#theTasks').on('click', '.markDone', function(event){
    var $clicked = $(event.target);
    var $nearestLi = $clicked.closest('.task');
    var theTaskId = $nearestLi.attr('data-taskId')
    var parsedId = parseInt(theTaskId);
    console.log(parsedId);
    //save clicked task as t
    var t = theTaskList.findTask(parsedId);
    t.toggleDone();
});

//delegated event handler to print to console task id of task whose "delete" button was clicked. 
$('#theTasks').on('click', '.delete', function(event){
    var $clicked = $(event.target);
    var $nearestLi = $clicked.closest('.task');
    var theTaskId = $nearestLi.attr('data-taskId')
    var parsedId = parseInt(theTaskId);
    console.log(parsedId);

    theTaskList.ary.forEach(function(task){
        console.log(task);
    });
    //save Task object to remove as t
    var t = theTaskList.findTask(parsedId);
    //delete Task from the DOM
    t.delete();
    //remove Task from array
    theTaskList.deleteTask(parsedId);
    
});


//event handler for save button on local menu
$('#saveButton').on('click', function(){
    theTaskList.save();
});



//event handler for load button on local menu
$('#loadButton').click(function(){
    console.log('clicked load');
    theTaskList.load();
});

//event handler for sort by ID button on local menu
$('#sortIdButton').on('click', function(){
    theTaskList.sortById();
});

//event handler for sort by TAG button on local menu
$('#sortTagButton').on('click', function(){
    theTaskList.sortByTag();
});

//event handler for sort by DUEDATE button on local menu
$('#sortDueDateButton').on('click', function(){
    theTaskList.sortByDueDate();
});

//event handler for sort by PRIORITY button on local menu
$('#sortPriorityButton').on('click', function(){
    theTaskList.sortByPriority();
});