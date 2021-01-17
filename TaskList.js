


class TaskList{
    constructor(name){
        this.ary = [];
        this.nameKey = name;
    }

    push(task){
        var idLen = this.ary.length;
        task.setId(idLen);
        this.ary[idLen] = task;
    }

    /**
     * addTask(description) that takes a 
     * task description object, creates a new task object, 
     * pushes it onto the internal array, and adds it to the DOM.
     */
    addTask(description){
        var tNew = new Task(description);
        this.push(tNew);
        tNew.addToDOM('#theTasks');
    }

    /**
     * addTasks(descriptions) that takes an array of task description 
     * objects and does addTask for each of them.
     */
    addTasks(descriptions){
        var count = 0;
        var that = this;
        descriptions.map(function(descript){
            that.addTask(descript);
            console.log(descript);
            console.log(count);
            count++;
        });
    }

    /**
     * findTask(id) method that searches the array for a 
     * task of the given id, and returns the task. If it's not found, the method 
     * can return no value.
     */
    findTask(id){
        var foundTask = this.ary.find( 
                task => task.id == id);
        return foundTask;
        /*
            this.ary.forEach( function(task){
            console.log(task);
            console.log(task.id);
            
        });
        */
    }

    /**
     * deleteTask(id) method that finds the index of a task given its 
     * ID (similar to the findTask(id) method) but then it deletes the task from the array. Return the 
     * deleted task, or -1 if it was not found.
     */
    deleteTask(id){
        var eleToDelete = this.findTask(id);

        var isSame = (element) => element == eleToDelete;
        var indOfEle = this.ary.findIndex(isSame);
        
        this.ary.splice(indOfEle, 1);
        
    //retrun deleted element
    return eleToDelete;
    }

    /**
     * save() that creates an array of description dictionaries from the array of task objects. 
     * It should then JSON.stringify() the array and save it to local storage under the key that 
     * was passed to the TaskList constructor.
     */
    save(){
        var str= JSON.stringify(this.ary);
        localStorage.setItem(this.nameKey, str);
    }

    /**
     * load() that does the reverse of save(): it reads a string from local storage, parses it into 
     * an array using JSON.parse, and then iterates over the array adding each task description to the internal list. 
     */
    load(){
        //save list as that
        var that = this;
        //make array of ids of any tasks currently in internal array to be used with .deleteTask()
        var aryOfIds = this.ary.map(function(task){
            console.log('made aryOfIds');
            task.id;
            console.log(aryOfIds);
            
        });
        


        //remove tasks from dom
        this.ary.forEach(function(task){
            task.delete();
            console.log('deleted from dom');
        });
    //remove any tasks from internal array
        aryOfIds.forEach(function(id){
            that.deleteTask(id);
            console.log('got to line 106');
        });


        //LOAD SAVED TAG COLOR ARRAY
       
        //reconstruct tagColors array from collected local storage data
        var toLoad = localStorage.getItem('colorsOfTags');
        var madeDictionary = JSON.parse(toLoad);
        var madeAry = Object.keys(madeDictionary);
        madeAry.forEach(function(color){
        tagColors[color]=madeDictionary[color];
        });
        updateTags();


        //add tasks back to internal array
        var x = localStorage.getItem(this.nameKey);
        console.log('got to x');
         var y = JSON.parse(x);
         console.log('got to y');


         //add tasks back to the DOM
         this.addTasks(y);
         console.log('got to add');


    }







    /**
     * sortByTag() that sorts the internal array by the tag and re-displays the task list by emptying 
     * the DOM element that displays the tasks and creating new DOM elements for each task. 
     */
    sortByTag(){

        //DELETE CURRENT ARRAY
        //save list as that
        var that = this;
        //remove tasks from dom
        this.ary.forEach(function(task){
            task.delete();
        });


    //SORT ARRAY BY TAGS
    var sorted = this.ary.sort((tagA, tagB) => {
        var before = tagA.tag.toLowerCase();
        var after = tagB.tag.toLowerCase();
        if (before < after) {
            return -1;
            }
        if (before > after) {
            return 1;
            }
        return 0;
        });

    //ADD TASK TO DOM BASED ON NEW THIS.ARY
    sorted.forEach(function(task){
        task.$div.append('#theTasks');

    });

}



/**
* sortByTag() sorts the internal array by the tag and re-displays the task list by emptying 
* the DOM element that displays the tasks and creating new DOM elements for each task. 
*/

sortByTag() {
    //remove tasks from dom
    this.ary.forEach(function(task){
        task.delete();
    });

    // sort array by tags 
    this.ary.sort((tagA, tagB) => {
        var a = tagA.tag.toLowerCase()
        var b = tagB.tag.toLowerCase()
        if (a < b) {
            return -1;
            }
        if (a > b) {
            return 1;
            }
        return 0;
        });

    // adds each task in the sorted array back to the dom
    this.ary.forEach(function(task) {
        //console.log("went through");
        $("#theTasks").append(task.$div);
    });
}

/**
* sortById() sorts the internal array by the ID and re-displays the task list by emptying 
* the DOM element that displays the tasks and creating new DOM elements for each task. 
*/
sortById() {

    //remove tasks from dom
    this.ary.forEach(function(task){
        task.delete();
    });

    // sort array by IDs 
    this.ary.sort(function(idA, idB) {return idA.id - idB.id});
    
    // adds each task in the sorted array back to the dom
    this.ary.forEach(function(task) {
        $("#theTasks").append(task.$div);
    });
}

/**
* sortByDueDate() sorts the internal array by the due date and re-displays the task list by emptying 
* the DOM element that displays the tasks and creating new DOM elements for each task. 
*/
sortByDueDate() {

    //remove tasks from dom
    this.ary.forEach(function(task){
        task.delete();
    });

    // sort array by due date
    this.ary.sort(function(dateA, dateB) {return dateA.duedate - dateB.duedate});

    // adds each task in the sorted array back to the dom
    this.ary.forEach(function(task) {
        $("#theTasks").append(task.$div);
    });
}


/**
* sortByPriority() sorts the internal array by the priority and re-displays the task list by emptying 
* the DOM element that displays the tasks and creating new DOM elements for each task. 
*/
sortByPriority() {

    //remove tasks from dom
    this.ary.forEach(function(task){
        task.delete();
    });

    //sort array
    let possible = ['high', 'medium', 'low'];
    this.ary.sort(function(taskA, taskB){
        if (possible.includes(taskA.priority) && possible.includes(taskB.priority)) { /*check that arguments are valid*/


            if (taskA.priority == 'high') {
                let taskBVal = taskB.priority; //gives string
                let dictVals = { 'low': 1, 'high': 0, 'medium': 1 };
                return (0 - dictVals[taskBVal]);
            }
    
            if (taskA.priority == 'medium') {
                let taskBVal = taskB.priority; //gives string
                let dictVals = { 'high': -1, 'medium': 0, 'low': 1 };
                return (0 - dictVals[taskBVal]);
            }
    
            if (taskA.priority == 'low') {
                let taskBVal = taskB.priority; //gives string
                let dictVals = { 'high': -1, 'low': 0, 'medium': -1 };
                return (0 - dictVals[taskBVal]);
            }
        }
    });

    // adds each task in the sorted array back to the dom
    this.ary.forEach(function(task) {
        $("#theTasks").append(task.$div);
    });
   
}

}



