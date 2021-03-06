


function wait_for_run_button() {

    var element = document.getElementById("run-btn");
    if (!element) {
        setTimeout(wait_for_run_button, 10);
        return;
    }
    document.getElementById("run-btn").addEventListener("click", clicked);
}


function clicked() {
    check_for_changes()
}

// function upvote(index) {

//     if (solution_values[index] == 1)
//         return

//     var request = new XMLHttpRequest();
//     var type = "upvote";
//     var link = solution_links[index];
//     var value = 1;
//     request.open("POST", 'https://ariaabrishamdar.pythonanywhere.com/', true);
//     var msg = { type, error_type, link, value };
//     var msgjson = JSON.stringify(msg);
//     request.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
//     request.send(msgjson);

//     var element = document.getElementById("score-" + index.toString());
//     if (element) {
//         var text = document.getElementById("score-" + index.toString()).innerHTML;

//         var is_negative = false;
//         if (text.includes("-"))
//             is_negative = true;

//         var number = parseInt(text.match(/\d+/)[0]);
//         if (is_negative)
//             number = -number;

//         number += 1;

//         document.getElementById("score-" + index.toString()).innerHTML = ("Score: " + number.toString());
//     }


//     if (solution_values[index] == -1) {
//         solution_values[index] = 0;
//         upvote(index);
//     }
//     else
//         solution_values[index] = 1;
//     return;
// }

// function downvote(index) {

//     if (solution_values[index] == -1)
//         return

//     var request = new XMLHttpRequest();
//     var type = "downvote";
//     var link = solution_links[index];
//     var value = -1;
//     request.open("POST", 'https://ariaabrishamdar.pythonanywhere.com/', true);
//     var msg = { type, error_type, link, value };
//     var msgjson = JSON.stringify(msg);
//     request.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
//     request.send(msgjson);

//     var element = document.getElementById("score-" + index.toString());
//     if (element) {
//         var text = document.getElementById("score-" + index.toString()).innerHTML;

//         var is_negative = false;
//         if (text.includes("-"))
//             is_negative = true;

//         var number = parseInt(text.match(/\d+/)[0]);
//         if (is_negative)
//             number = -number;

//         number -= 1;

//         document.getElementById("score-" + index.toString()).innerHTML = ("Score: " + number.toString());
//     }

//     if (solution_values[index] == 1) {
//         solution_values[index] = 0;
//         downvote(index);
//     }
//     else
//         solution_values[index] = -1;
//     return;
// }


function check_for_changes() {

    var content = document.getElementById("wrap").innerText;

    var list = document.querySelectorAll(".warning,.error");

    var error_message = "";

    if (list.length <= 0) {
      setTimeout(check_for_changes, 100);
      return;
    }

    for (let i = 0; i < list.length; i++) {
      error_message += list[i].innerText;
    }


    var editor = document.getElementById("editor");
    var code = editor.getElementsByClassName("ace_layer ace_text-layer")[0].innerText;


    setTimeout(send_text_to_server.bind(null, error_message, code), 250);
}


function send_text_to_server(error, code) {

    var request = new XMLHttpRequest();

     request.onreadystatechange = function() {
        if (request.readyState === 4) {

            //var str = request.response;

            var json_data = JSON.parse(request.response).items;
            var str = "";

            solution_links = []
            solution_values = []

            for (let i = 0; i < json_data.length; i++) {

                str += json_data[i].body;
                str += json_data[i].link_text;
                //str += '<button id="upvote-button-' + i.toString() + '"><img src=' + chrome.extension.getURL('images/upvote.png') + '></button>';
                str += '     ';
                //str += '<button id="downvote-button-' + i.toString() + '"><img src=' + chrome.extension.getURL('images/downvote.png') + '></button>';
                str += '<p style="font-size:18px;" id=score-' + i.toString() + '> Score: ' + json_data[i].score +  ' </p>';

                solution_links.push(json_data[i].link);
                solution_values.push(0);
                error_type = json_data[i].error_type;
            }

            set_output_text(str);

            for (let i = 0; i < json_data.length; i++) {
                var element_1 = document.getElementById("upvote-button-" + i.toString());
                var element_2 = document.getElementById("downvote-button-" + i.toString());
                if (element_1)
                    document.getElementById("upvote-button-" + i.toString()).addEventListener("click", function(){
                        upvote(i);
                    }, false);
                if (element_2)
                    document.getElementById("downvote-button-" + i.toString()).addEventListener("click", function(){
                        downvote(i);
                    }, false);
            }
        }
    }
    //var type = "find_solutions";
    request.open("POST", 'https://neginaryapour.pythonanywhere.com/run', true); //'http://127.0.0.1:5000/' https://neginaryapour.pythonanywhere.com/run
    var msg = { error, code };
    var msgjson = JSON.stringify(msg);
    request.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
    request.send(msgjson);
}


function set_output_text(text) {

    var output_text = text;
    var current_content = document.getElementById("wrap").innerHTML;
    document.getElementById("wrap").innerHTML =  current_content +'<p id="term-input">\n\n' + output_text + '</p>';

    wait_for_run_button()
}



wait_for_run_button()

document.getElementById("d").style.height = "calc(100% - 2.5px)";

var error_type = "";
var solution_links = [];
var solution_values = [];




