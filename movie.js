$(document).ready(function() {
    $("#submit2").click(function () {
        var validate = Validate2();
        $("#message").html(validate);
        if (validate.length == 0){
            CallAPI2();
        }
    });


function CallAPI2() {
    $.ajax({
        url: "https://api.themoviedb.org/3/search/movie?api_key=dc662b7f1d2f741b834a79e3ebf185e5&query=" + $("#movieInput").val()+"&primary_release_year="+$("#yearInput").val(),
        dataType: "json",
        success: function (result2) {
            var resultHtml2 = $("<div class=\"resultDiv\"><p>Movies</p>");
             for (i = 0; i < result2["results"].length; i++) {

                        var image = result2["results"][i]["poster_path"] == null ? "Image/no-image.png" : "https://image.tmdb.org/t/p/w500/" + result2["results"][i]["poster_path"];
                        var date = result2["results"][i]["release_date"] == null ? "Unknown" : result2["results"][i]["release_date"].substr(0,4);

                        resultHtml2.append("<div class=\"result2\" resourceId=\"" + result2["results"][i]["id"] + "\">"
                        + "<img src=\"" + image + "\" />"
                        + "<p><a>" + result2["results"][i]["title"] + " "+ result2["results"][i]["original_language"] + "</a></p>"
                        + "<p><a>" + date +
                        "</a></p></div>")
                        console.log(result2);
                    }
                    
            
            resultHtml2.append("</div>");
            $("#message").html(resultHtml2);
        },
        error: function (xhr, status, error) {
            $("#message").html("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });
}

$("#message").on("click", ".result2", function () {
    var resourceId2 = $(this).attr("resourceId");
    $.ajax({
        url: "https://api.themoviedb.org/3/movie/" + resourceId2 +"?"+ "api_key=dc662b7f1d2f741b834a79e3ebf185e5&append_to_response=credits",
        
        dataType: 'json',
        success: function (result2) {
            $("#modalTitleH4").html(result2["title"]);

            var date = result2["release_date"] == null ? "Unknown" : result2["release_date"].substr(0,4);
            var language = result2["spoken_languages"] == null ? "No information available" : result2["spoken_languages"][0]["name"];
            var runtime = result2["runtime"] == null ? "" : "RunTime: "+result2["runtime"];
            var overview = result2["overview"] == null ? "Not available" : result2["overview"];
            
            

            var resultHtml2 = "<p>Release Year: "+date+"</p><p>" +"Language: "+ language + "</p>";
            resultHtml2 += "<p>"+runtime + "</p>" +"<p>"+ overview + "</p>"+"<p>"+"HomePage: <a href="+result2["homepage"]+">" + result2["homepage"]+ "</a></p><p>Genre: </p>";
            
        for (i = 0; i < result2["genres"].length; i++) {
           resultHtml2 += "<ul><li>"+result2["genres"][i]["name"]+"</li> </ul>";
                
        }

        resultHtml2 += "<p>Production Companies: </p>";

        for (i =0; i < result2["production_companies"].length; i++) {
           resultHtml2 += "<ul><li>"+result2["production_companies"][i]["name"]+"</li></ul>";
        }

       
        resultHtml2 += "<p>Cast: </p>";

        for (i = 0; i < result2["credits"]["cast"].length; i++) {
            resultHtml2 += "<ul><li>"+result2["credits"]["cast"][i]["name"]+" as "+result2["credits"]["cast"][i]["character"]+"</li></ul>";
        }

        resultHtml2 += "<p>Crew: </p>";

        for (i = 0; i < result2["credits"]["crew"].length; i++) {
            resultHtml2 += "<ul><li>"+result2["credits"]["crew"][i]["name"]+" -- "+result2["credits"]["crew"][i]["job"]+"</li></ul>";
        }
        
        

            
            

            $("#modalBodyDiv").html(resultHtml2)

            $("#myModal").modal("show");
        },
        
    });
});



function Validate2() {
    var errorMessage = "";
    if ($("#movieInput").val() == "") {
        errorMessage += "Enter Movie Name";
    }
    return errorMessage;
}
});
