var app = {
	// dinosaurs array for initial list
	dinosaurs: ["Stegosaurus", "Triceratops", "Pterodactyl", "Tyrannosaurus", "Brontosaurus", "Brachiosaurus", "Dilophosaurus",
				"Velociraptor", "Apatosaurus", "Spinosaurus", "Ankylosaurus", "Archaeopteryx", "Allosaurus", "Gallimimus"],
	// create image array to pre-load the animated gif array
	image: [], 

	search: function(searchTerm){
  		$("#gif-list").empty();

  		image = [];
		var protocol = "https://";
		var domain = "api.giphy.com";
		var path = "/v1/gifs/search";
		var api_key = "de2a630887f841daa7108fc41b93e1c0"; 
		var url = protocol + domain + path + "?" + "q=" + searchTerm + "&api_key=" + api_key; 
		// create dat url

		$.ajax({
			url: url,
		  	method: "GET"
		}).done(function(response) {
		  	var gifs = response.data;
		  	var limit = gifs.length;
		  	if(limit > 12){ // making sure we don't load more than 12 images
		  		limit = 12;
		  	}

		  	for(var i = 0; i < limit; i++){
		  		// create new image object and push it (and the animated gif address) to the image array
		  		image[i] = new Image();	
		  		image[i].src = gifs[i].images.fixed_height.url;
		  		var img = gifs[i].images.original_still.url;
		  		var rating = gifs[i].rating;
		  		$("#gif-list").append("<li><div><h6>Rating: " + rating + "</h6><img src='" + img + "'" +  "value='" + i + "'></img></div></li>");
		  	}
		});
	},
};

$(document).ready(function(){
	// populate the buttons from the original dinosaurs list
	for(var i = 0; i < app.dinosaurs.length; i++){
  		$("#gif-button-group").append("<button id=" + app.dinosaurs[i] + ">" + app.dinosaurs[i] + "</button>");
  	}

  	$("#gif-add").on("click", function(event){
  		// add another button
  		event.preventDefault();

  		if($("#gif-entry").val() !== ""){
  			// as long as the gif-entry field isn't empty, append the entry to another button
  			$("#gif-button-group").append("<button id=" + $("#gif-entry").val() + ">" + $("#gif-entry").val() + "</button>");
  			$("#gif-entry").val(""); // clear the entry field
  		}
  	});

	$("#gif-clear").on("click", function(event){
		event.preventDefault();
		// clear the entry field and clear the page

		$("#gif-entry").val("");
		$("#gif-list").empty();
	});

	$("#gif-submit").on("click", function(event){
		event.preventDefault();
		//as long as entry field isn't empty, do a search on that field's value 

		if($("#gif-entry").val() !== ""){
			app.search($("#gif-entry").val());
		}
	});

  	$(this).on("click", "button", function(event){
  		event.preventDefault();
  		// whenever clicking on a button, take that button's id and do a search
  		// but make sure that it's not doing unnecessary searches if the user clicks 
  		// on the buttons (or elements) below

  		var temp = $(this).attr('id');

		if(temp !== "gif-submit" && temp !== "gif-clear" && temp !== "gif-add" && 
		   temp !== "gif-entry" && temp !== "gif-button-group" && temp !== "sidebar" && 
		   temp !== ""){
			$("#gif-list").empty();
			$("#gif-entry").val("");
	  		app.search(temp);
	  	}
  	});

    $(this).on("click", "img", function(event){
    	event.preventDefault();
    	// whenever clicking on an image, take the image's src value(initially the still image), 
    	// and swap it with the URL in the image array (the URL for the animated gif)

    	var src = $(this).attr("src");
    	var alt = image[$(this).attr("value")].src;
    
    	// swap them back and forth, so the user can click the animated gif on and off
    	$(this).attr("src", alt);
    	image[$(this).attr("value")].src = src;
	});
});