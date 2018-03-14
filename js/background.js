// http://developer.chrome.com/extensions/samples.html
// The onClicked callback function.


function onClickHandler(info, tab) {
  var sText = info.selectionText;
  // addHistory(sText);
  // openDefinitionPage(sText);
  seach_dict(sText);
  
};

function seach_dict(sText){
  
  var request = $.get( "https://fathomless-citadel-33718.herokuapp.com/finder/find/", { query: sText } );
  
  request.success(function(result) {
    var obj = JSON.parse(result);
    result_popup(obj.query, obj.meaning);

  });
  

}

function result_popup(query, meaning){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    
  chrome.tabs.sendMessage(tabs[0].id, {action: "show", query:query, meaning:meaning}, function(response) {
      //console.log(response.farewell);
    
    });
  });

}


// function openDefinitionPage(sText) {
//   var encodedQuery = encodeURIComponent("define " + sText);
//   var url = "https://www.google.com/search?q=" + encodedQuery;
//   //window.open(url, '_blank');
//   alert('url');
// }

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "Ovidhan";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});
    
});
