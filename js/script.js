
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // Adding streetview from google API
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;
    $greeting.text('So you want to live at ' + address + '?');
    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    console.log(streetviewUrl);
    $body.append('<img class="bgimg" src="'+streetviewUrl+'">');

    //loading NY Times Articles
    var nytimesUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=687c77a994fc4add8341a12a78754f2f'
    $.getJSON(nytimesUrl, function(data){
        $nytHeaderElem.text("New York Times Articles About " + cityStr);
        articles = data.response.docs;
        for(var i = 0; i<articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class="article">' + 
                '<a href=""' + article.web_url + '">' + article.headline.main + '</a>' +
                '<p>' + article.snippet + '</p>' +
            '</li>'); 
        };
    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    })

    return false;


};

$('#form-container').submit(loadData);

