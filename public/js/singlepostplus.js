console.log('singpost plus.js');


var hashmap = {};


var formsample = $("#comment-form");

function commentbtnevent(id) {
    if(hashmap[id]&&hashmap[id]==1)
    {
        $("#comment-form-"+id).addClass('hidden');
        hashmap[id]=0;
        return;
    }

    console.log('commentbtnevent called');
    $("#comment-form-"+id).removeClass('hidden');
    hashmap[id]=1;
}