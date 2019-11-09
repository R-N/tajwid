
function openNav() {
  $(".about").addClass("open");
}

function closeNav() {
  $(".about").removeClass("open");
}

function selectAnswer(button){
    $(".btn-answer").removeClass("answer-selected");
    button.addClass("answer-selected");
}

$(document).ready(function(){
    $("#btn-about").click(openNav);
    $(".about .closebtn").click(closeNav);
    $(".btn-answer").click(function(){
        selectAnswer($(this))
    });
})