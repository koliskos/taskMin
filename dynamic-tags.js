
function updateTags(){
    $('#tags').empty();
    
    
    $('#currentTags').empty();
    var tagArray = Object.keys(tagColors);
    tagArray.forEach(function(task){
        console.log(task);

        
        //$x is basis for addtag buttons
        var $x = $('<li></li>'); 
        
        var $button = $('<button></button>', {
            'type':'button',
            'class':'delete',
            'id':task
        }).html('&#x2716');
        
        var $span = $('<span></span>',{
            'class': 'tagName',
            'id': task
        }).text(task);
        
        $x.append($button);
        $x.append($span);
        console.log($x);
        $('#currentTags').append($x);

        var $label = $('<label></label>')
        var $radio = $('<input></input>', {
            type: 'radio',
            name:'tag',
            id: task,
            value: task
        });
 
        $label.append($radio);
        $label.append(task);
        $("#tags").append($label);
    
    });

}

function addTagFromForm(){
        //gather the values that will be used as entry in colordictionary 
    
        var tagsDescribe = $('input[name="tagName"]').val();//this the task and will be the key in the color dictionary
        var tagHasColor = $('[name="tagColor"]').val();//this the color and will be the value in the color dictionary
        console.log(tagsDescribe);
        console.log(tagHasColor);
        tagColors[tagsDescribe]=tagHasColor;

        //save tags added
        saveAddedTags();
    //update
        updateTags();
    }
    
function saveAddedTags(){
    var colorsInArray= JSON.stringify(tagColors);
        localStorage.setItem('colorsOfTags', colorsInArray);
}


