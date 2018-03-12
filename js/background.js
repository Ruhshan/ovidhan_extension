// http://developer.chrome.com/extensions/samples.html
// The onClicked callback function.


function onClickHandler(info, tab) {
  var sText = info.selectionText;
  // addHistory(sText);
  // openDefinitionPage(sText);
	result_popup(sText);
};


function result_popup(querytext){
  
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    
  chrome.tabs.sendMessage(tabs[0].id, {action: "show", query:querytext}, function(response) {
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
