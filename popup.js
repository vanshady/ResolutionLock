document.addEventListener('DOMContentLoaded', function () {
    var data = chrome.extension.getBackgroundPage().webData;
    if (data.error) {
        $("#message").text(data.error);
        $("#content").hide();
    }
    else {
        $("#message").hide();
        $("#content").text('Success');
        // $("#content-title").text(data.title);
        // $("#content-author").text(data.author);
        // $("#content-date").text(data.postDate);
        // $("#content-first-access").text(data.firstAccess);
    }
});

function simulateKey() {
    var e = $.Event("keydown", { keyCode: 83 });
    e.shiftKey = 1;
    e.ctrlKey = 1;
    e.altKey = 1;
    e.which = 83;
    e.keyCode = 83; // # Some key code value
    $('body').trigger(e);
    console.log(e);
    
//     var event = new Event("keydown", {"ctrlKeyArg":true, "altKeyArg":true, "shiftKeyArg":true, "keyCodeArg":83});
// 
//     document.body.dispatchEvent(event);
//     console.log(event);
};
simulateKey();

console.log('What');