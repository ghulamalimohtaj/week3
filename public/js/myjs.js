$(document).ready(function(){
    $('button').click(function(){
        var id = $('#blogId').val();
        $.ajax({
            type: 'DELETE',
            url:'/'+id
        });
    });
});