var float_div = document.createElement('div');

float_div.innerHTML = `<div id="ov-bubble-close">X</div>
<div id="gdx-bubble-query-row" class="">
    <div id="gdx-bubble-query">el·e·mentaa</div>
    <div id="gdx-bubble-audio-icon" class=""></div>
</div>
<div id="gdx-bubble-meaning">A part or aspect of something abstract, especially one that is essential or characteristic.</div>`;

float_div.id = "ov-bubble-main";

// float_div.className = "floating_div";
        
document.body.appendChild(float_div);


var s = document.createElement('script');
// TODO: add "script.js" to web_accessible_resources in manifest.json
s.src = chrome.extension.getURL('js/script.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

function getScrollPostion() { 
    if (window.pageYOffset != undefined) { 
        return [pageXOffset, pageYOffset]; 
    } else { 
        var sx, sy, d = document, r = d.documentElement, b = d.body; sx = r.scrollLeft || b.scrollLeft || 0; sy = r.scrollTop || b.scrollTop || 0; 
        return [sx, sy]; } }

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      
      if (request.action == "show")
        
        var query = request.query;
        var meaning = request.meaning;

        //console.log("query "+query);
        //console.log("meaning "+meaning);

        var bubble_main = document.getElementById("ov-bubble-main");
        
        bubble_main.setAttribute("style","display: block");

        // var bubble_height = document.getElementById("ov-bubble-main").clientHeight;
        
        var bubble_query = document.getElementById("gdx-bubble-query-row");
        
        bubble_query.innerHTML = '<b>'+query+'</b>';

        var bubble_meaning = document.getElementById("gdx-bubble-meaning");
        bubble_meaning.innerHTML = meaning;
        //scroll_pos = getScrollPostion();
        // console.log(scrollY);
        // console.log(scroll_pos);
        //console.log(bubble_height);

        var rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
        var l = rect.x-150+(rect.width / 2);
        var t = (scrollY+rect.y) - document.getElementById("ov-bubble-main").clientHeight-3;

        //console.log(t);

        bubble_main.setAttribute("style","left:" +l+"px; top:"+t+"px; display: block");

    });