// initial topics to displayed in buttons
var topics = ["Possum","Satyr","Griffin","Pheonix","Gorgon","Sphinx","Ouroboros"];
// create initial buttons
function draw_buttons(topics){
    $(".btn-bar").empty();
    for(let i=0; i<topics.length; i++){
        var new_button = $('<button>').addClass("btn btn-primary mr-3 gif-btn");
        new_button.text(topics[i]);
        $(".btn-bar").append(new_button)
    }
};

draw_buttons(topics);

$(document).ready(function(){

$(".add-btn").on("click",function(){
    // preventDefault();
    var new_add = $(this).text();
    topics.push(new_add);
    draw_buttons(topics);
    // var next_button = $('<button>').addClass("btn btn-primary mr-3 gif-btn");
    //     next_button.text($(this).text());
    //     $(".btn-bar").append(next_button)
})

// onclick event handler for button click
$(document).on("click",".gif-btn",function(){
    var search_term = $(this).text();
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=NGJhF1ApJLLacjriWTncJfF5KRTZ5m80&q="+search_term+"&limit=10&offset=0&rating=G&lang=en",
        method: "GET"
    }).then(function(response){
        var gif_topics = response.data;
        console.log(gif_topics);
        gif_topics.forEach(function(element){
            var new_img = $('<img>').attr("src",element.images.original_still.url);
            new_img.attr("data-still",element.images.original_still.url);
            new_img.attr("data-animate",element.images.original.url);
            new_img.attr("data-state","still");
            new_img.addClass("gif");
            $(".gif-bar").append(new_img);
        })
    })
});

// pause/unpause gifs on click
$(document).on("click",".gif",function(){
    var state = $(this).attr("data-state");
      if(state == "still"){
        $(this).attr("src",$(this).attr("data-animate"));
        $(this).attr("data-state","animate");
      }
      else{
        $(this).attr("src",$(this).attr("data-still"));
        $(this).attr("data-state","still");
      }
})
})



