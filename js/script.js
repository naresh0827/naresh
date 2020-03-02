$(document).ready(function() {
	var index = 1;
	var searchText;
	$('#searchForm').on('submit', function(e) {
		e.preventDefault();
		searchText = $('#search-movie').val();
		index = 1;
		getMoviesList(searchText, index);
	});

	$('.next').on('click', function(){
		index++;
		getMoviesList(searchText, index);
	});

	$('.prev').on('click', function(){
		console.log(index);
		if(index >= 2) {
			index--;
			getMoviesList(searchText, index);
		}
	});
});

function getMoviesList(searchText, pageNo){
	var omdbList = "http://www.omdbapi.com/?apikey=9625eee4&s="+searchText+"&page="+pageNo;
	$.ajax({
		url: omdbList,
		success: function(data) {
            if(data.Response == "False") {
            	$('.movie-list-container').empty().html(data.Error);
            	$('.actions').addClass('hide');
            }
            else {
            	var totalResults = data.totalResults;
            	var movieResult = data.Search;
            	if(totalResults > 10) $('.actions').removeClass('hide');
            	else $('.actions').addClass('hide');
            	
            	if(pageNo >= 2) $('.prev').removeClass('disabled');
            	else if(pageNo == 1) $('.prev').addClass('disabled');
            	else if(pageNo == totalResults) $('.next').addClass('disabled');
            	else if(pageNo <= totalResults) $('.next').removeClass('disabled');

            	$('.movie-list-container').empty();
            	for(var i=0; i < movieResult.length; i++) {
            		var listWrapper = "<div class='well text-center'><img class='img-responsive' src="+ movieResult[i].Poster
            						+"/><p>"+movieResult[i].Title + "<span> ("+ movieResult[i].Year+ ") </span></p><button class='btn btn-default'>See Details</button></div>";
            		$('.movie-list-container').append("<li class='item-list'>"+listWrapper+"</li>");
            	}
            }
        }

	});
}