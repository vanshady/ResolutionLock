function getDomainFromUrl(url) {
    var host = "null";
    if (typeof url == "undefined" || null == url)
        url = window.location.href;
    var regex = /.*\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if (typeof match != "undefined" && null != match)
        host = match[1];
    return host;
}

function checkForValidUrl(tabId, changeInfo, tab) {
    if (getDomainFromUrl(tab.url).toLowerCase() == "www.netflix.com"){
        chrome.pageAction.show(tabId);
    }
};

chrome.tabs.onUpdated.addListener(checkForValidUrl);

var webData = {};
webData.error = "Loading...";
chrome.runtime.onMessage.addListener(function(request, sender, sendRequest) {
    if (request.type !== "netflix-information")
        return;
    webData = request;
    webData.firstAccess = "Fetching...";
    if (!webData.error) {
        $.ajax({
            url: "http://localhost/first_access.php",
            cache: false,
            type: "POST",
            data: JSON.stringify({
                url: webData.url
            }),
            dataType: "json"
        }).done(function(msg) {
            if (msg.error) {
                webData.firstAccess = msg.error;
            } else {
                webData.firstAccess = msg.firstAccess;
            }
        }).fail(function(jqXHR, textStatus) {
            webData.firstAccess = textStatus;
        });
    }
});
