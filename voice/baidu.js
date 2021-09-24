const synth = window.speechSynthesis;
const msg = new SpeechSynthesisUtterance();
let read = false
chrome.extension.onRequest.addListener( //监听扩展程序进程或内容脚本发送的请求
    function(request, sender, sendResponse) {
        sendResponse('ok')
        if (request.action == "GetBaiduKeyWord") {
            if (request.value) {
                handleStop()
                handleSpeak(window.getSelection().toString(), request.value)
            } else {
                if (read) {
                    handleStop()
                    generateReadButton()
                    document.removeEventListener('mouseup', voiceIcon)
                    document.removeEventListener('mousedown', removeVoiceIcon)
                    document.getElementById('read-content-icon') && document.getElementById('read-content-icon').remove()
                } else {
                    initinfo()
                }
                read = !read
            }
        }
    }
);

function initinfo() {
    generateReadButton()
    document.addEventListener('mouseup', voiceIcon)
    document.addEventListener('mousedown', removeVoiceIcon)
}

function voiceIcon(e) {
    if (window.getSelection().toString()) {
        if (!document.getElementById('read-content-icon') || document.getElementById('read-content-icon').length == 0) {
            let img = document.createElement('img')
            img.setAttribute('id', 'read-content-icon')
            img.setAttribute('src', 'chrome-extension://mjonpbbngcmojjggfikeicgeggbmhelf/voice.png')
            img.setAttribute('style', `width: 25px;position: fixed;left:${e.clientX}px;top:${e.clientY}px;cursor:pointer;z-index:9999999`)
            document.body.appendChild(img)
        }
    }
}

function removeVoiceIcon(e) {
    if (e.target == document.getElementById('read-content-icon')) {
        handleSpeak(window.getSelection().toString())
    } else {
        document.getElementById('read-content-icon') && document.getElementById('read-content-icon').remove()
    }
}

function generateReadButton() {
    if (!document.getElementById('read-content-plugin')) {
        let button = document.createElement('div')
        button.innerText = 'R'
        button.setAttribute('style', 'position:fixed;top:0;right:0;z-index:10000;width:50px;height:50px;font-size:40px;line-height:50px;text-align:center;border-radius:50%;background: rgba(0,0,0,0.4);color:#fff')
        button.setAttribute('id', 'read-content-plugin')
        document.body.appendChild(button)
    } else {
        document.getElementById('read-content-plugin').remove()
    }
}

function handleSpeak(text, value) {
    if (!text) handleStop()
    msg.text = text;
    msg.lang = 'zh-CN';
    msg.volume = '1';
    msg.rate = value || 1;
    msg.pitch = 1;
    msg.localService = true
    synth.speak(msg);
}
// 语音停止
function handleStop(e) {
    msg.text = e;
    msg.lang = 'zh-CN';
    synth.cancel(msg);
}