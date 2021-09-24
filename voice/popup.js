document.getElementById('begin').onclick = function() {
    chrome.tabs.getSelected(null, function(tab) { //获取当前tab
        //向tab发送请求
        chrome.tabs.sendRequest(tab.id, { action: "GetBaiduKeyWord" });
    });
}
document.getElementById('end').onclick = function() {
    chrome.tabs.getSelected(null, function(tab) { //获取当前tab
        //向tab发送请求
        chrome.tabs.sendRequest(tab.id, { action: "GetBaiduKeyWord" });
    });
}
document.getElementById('progress').onchange = function() {
    chrome.tabs.getSelected(null, function(tab) { //获取当前tab
        //向tab发送请求
        // chrome.tabs.sendRequest(tab.id, { action: "GetBaiduKeyWord", value: document.getElementById('progress').value }, function(response) {
        //     console.log(response.ok)
        //     // handleSpeak(flag ? response.kw : '');
        // });
        chrome.tabs.sendRequest(tab.id, { action: "GetBaiduKeyWord", value: document.getElementById('progress').value });
    });
}