function validate() {
    var author = document.getElementById('author');
    var t = document.getElementById('title');
    var body = document.getElementById('body');
    var titleFlag = true;
    var authorFlag = true;
    var bodyFlag = true;

 
    let titleRegex = /[0-9!@#$%^&*+=/.>?{}<]/ig;
    let authorRegex = /[^A-z]/ig;
    if(t.value.match(titleRegex) == null){
        titleFlag = false
        document.getElementById('titleErr').innerHTML = "Punctuation is not allowed for title";
    }else{
        titleFlag = true;
    }
    if(author.value.match(authorRegex) == null){
        authorFlag = true;
    }else{
        authorFlag = false;
        document.getElementById('authorErr').innerHTML="Author must contain only alphabet letters!";
    }
    if(body.value.length>20){
        bodyFlag = false
        document.getElementById('bodyErr').innerHTML="Body can't exceed 20 words!";
    }else{
        bodyFlag = true;
    }

    return authorFlag && bodyFlag && titleFlag;
}