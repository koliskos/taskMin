

//constructor
class Task{
    constructor(descript){
        this.text = descript['text'];
        this.priority = descript['priority'];
        this.duedate = new Date(descript['duedate']);
        this.tag = descript['tag'];
        this.color = tagColors[this.tag];
        this.id = -1;
        this.$div = $('<li></li>', {//div to which all other parts of question block are appended
            'data-type': 'personal',
            'class':'task',
            'data-taskId': this.id,
        });
    }

    getFormattedDueDate(){
        let objDate = this.duedate;
        var the_month = monthArray[objDate.getMonth()];
        var the_weekDay = dayName[objDate.getDay()];
        var the_date = objDate.getDate();
        var the_year = objDate.getFullYear();
        var current_date = the_weekDay + " " + the_month + " " + the_date + ' ' + the_year;
        return current_date;
       
    }

    addToDOM(destination) {
        var dateText = this.getFormattedDueDate();
        this.$div.css('background-color', this.color);
        this.$div.attr('data-taskId',this.id);
        var pri = this.priority;
        var t = this.tag;
        var task = this.text;

        var $span1 = $('<span></span>',{
            'class': 'due'
        }).text(dateText+ " ");
        var $span2 = $('<span></span>',{
            'class': 'priority'
        }).text(pri+ " ");
        var $span3 = $('<span></span>',{
            'class': 'tag'
        }).text(t+ " ");
        var $textP = $('<p></p>',{
            'class': task
        }).text(task + " ");

        var $button1 = $('<button></button>',{
            'type':"button",
            'class':"markDone"
        }).html('&#x2714');

        var $button2 = $('<button></button>',{
            'type':"button",
            'class':"delete"
        }).html('&#x2716');

        var $button3 = $('<button></button>',{
            'type':"button",
            'class':"more"
        }).html('&#x271A');

        this.$div.append($span1);
        this.$div.append($span2);
        this.$div.append($span3);
        this.$div.append($textP);
        this.$div.append($button1);
        this.$div.append($button2);
        this.$div.append($button3);
        console.log('created $div once')
        $(destination).append(this.$div);
    }

    setId(id){
        this.id = id;
    }

    getId(){
        return this.id;
    }

    /**
     * toggleDone() for a Task that will toggle the boolean done status, and update the 
     * DOM element by changing whether the done class is on the classlist.
     */
    toggleDone(){
        if (this.done==true){
            this.done=false;
            this.$div.removeClass('done');
        }
        else{
            this.done=true;
            this.$div.addClass('done');
        }
    }

    /**
     * Task.delete() method that removes the associated DOM element.
     */
    delete(){
        this.$div.remove();
    }


}

var edt =
    [
        {text: "Finish Taskmin Project",
         priority: "high",
         duedate: "5/15/2019",
         tag: "work",
         id:'0'
        },
        {text: "send card to mom",
         priority: "medium",
         duedate: "5/10/2019",
         tag: "personal",
         id:'1'
        },
        {text: "Do CS 432 exam",
         priority: "low",
         duedate: "5/12/2019",
         tag: "work",
         id:'2'
        },
        {text: "pack for home",
         priority: "high",
         duedate: "5/16/2019",
         tag: "personal",
         id:'3'
        }
    ];

    var monthArray = new Array();
    monthArray[0] = "January";
    monthArray[1] = "February";
    monthArray[2] = "March";
    monthArray[3] = "April";
    monthArray[4] = "May";
    monthArray[5] = "June";
    monthArray[6] = "July";
    monthArray[7] = "August";
    monthArray[8] = "September";
    monthArray[9] = "October";
    monthArray[10] = "November";
    monthArray[11] = "December";

    var dayName = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];


    /**
     * processDescriptions(descriptions) to process 
     * a list of descriptions by creating a new task object for each one, 
     * printing it to the console, and adding it to the page.
     * */
    function processDescriptions(descriptions){
        descriptions.map(function(descript){
            var addTask = new Task(descript);
            console.log(addTask);
            addTask.addToDOM("#theTasks");
        })
    }