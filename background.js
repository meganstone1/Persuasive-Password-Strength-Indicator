chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "keyup") {
        var userInput = request.value;
        chrome.tabs.sendMessage(sender.tab.id, {action: "display", value: userInput});
    }
});