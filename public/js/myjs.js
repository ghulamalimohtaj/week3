function validate() {
    // Accessing DOM objects
    var author = document.getElementById('author');
    var t = document.getElementById('title');
    var body = document.getElementById('body');
    var titleFlag = true;
    var authorFlag = true;
    var bodyFlag = true;

    // pattern for title validation not ot have any punctuation
    let titleRegex = /[0-9!@#$%^&*+=/.>?{}<]/ig;
    let authorRegex = /[^A-z]/ig;//RegEx pattern for author validation to have just alphabet letters
    if(t.value.match(titleRegex) == null){
        // it has invalid character(s)
        //
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

    return authorFlag && bodyFlag && titleFlag; // allow submission if everything was valid
}