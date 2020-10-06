$(document).ready(function() {
    $("#submit").click(function () {
        var validate = Validate();
        $("#message").html(validate);
        if (validate.length == 0){
            CallAPI();
        }
    });

    $("#message").on("click", ".result", function () {
        var resourceId = $(this).attr("resourceId");
        $.ajax({
            url: "https://api.themoviedb.org/3/person/" + resourceId+"?"+ "api_key=dc662b7f1d2f741b834a79e3ebf185e5&append_to_response=credits",
            
            dataType: 'json',
            success: function (result) {
                $("#modalTitleH4").html(result["name"]);

                var activity = result["known_for_department"] == null ? "Unknown" : result["known_for_department"]
                var biography = result["biography"] == null ? "No information available" : result["biography"];
                var deceased = result["deathday"] == null ? "" : "  /  "+result["deathday"];
                var homepage = result["homepage"] == null ? "" : result["homepage"];

                var resultHtml = "<p>Job: "+activity+"</p><p>" + biography + "</p>";
                resultHtml += "<p>Birthday: " + result["birthday"]  + deceased + "</p><p>Place of Birth: " + result["place_of_birth"]+"</p><p>HomePage: <a href="+homepage+">" + homepage+ "</a></p>";

                for (i = 0; i < result["credits"]["cast"].length; i++) {
                    resultHtml += "<ul><li>"+result["credits"]["cast"][i]["title"]+" --- "+result["credits"]["cast"][i]["release_date"].substr(0,4)+" --- Acting"+"</li></ul>"
                }

                for (i = 0; i < result["credits"]["crew"].length; i++) {
                    resultHtml += "<ul><li>"+result["credits"]["crew"][i]["title"]+" ----  "+result["credits"]["crew"][i]["release_date"].substr(0,4)+" ----  " +result["credits"]["crew"][i]["job"]+"</li></ul>"
                }
                

                $("#modalBodyDiv").html(resultHtml)

                $("#myModal").modal("show");
            },
            
        });
    });

   

    function CallAPI() {
        $.ajax({
            url: "https://api.themoviedb.org/3/search/person?&query=" + $("#personInput").val(),
            data: { "api_key": "dc662b7f1d2f741b834a79e3ebf185e5" },
            dataType: "json",
            success: function (result) {
                var resultHtml = $("<div class=\"resultDiv\"><p>Names</p>");
                 for (i = 0; i < result["results"].length; i++) {

                            var image = result["results"][i]["profile_path"] == null ? "Image/no-image.png" : "https://image.tmdb.org/t/p/w500/" + result["results"][i]["profile_path"];

                            resultHtml.append("<div class=\"result\" resourceId=\"" + result["results"][i]["id"] + "\">" + "<img src=\"" + image + "\" />" + "<p><a>" + result["results"][i]["name"] + "</a></p>" + "<p><a>" + result["results"][i]["known_for_department"] + "</a></p></div>")

                        }
                
                
                $("#message").html(resultHtml);
            },
           
        });
    }

    function Validate() {
        var errorMessage = "";
        if ($("#personInput").val() == "") {
            errorMessage += "Enter Person Name";
        }
        return errorMessage;
    }
   
    
    
});