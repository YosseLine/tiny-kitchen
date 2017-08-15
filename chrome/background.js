
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.query(
    { currentWindow: true, active: true },
    function (tabArray) {
      var success = function (data) { alert(data.title) }
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/recipe-sources",
        data: { url: tabArray[0].url },
        success: success,
        dataType: "json"
      });
    }
  )
});