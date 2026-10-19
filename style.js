// DOM Element Cache Selectors Hooks
var inputField = document.getElementById('ios-input-field');
var keyboardPanel = document.getElementById('keyboard-panel');
var gifPicker = document.getElementById('ios-gif-picker');
var chatMessages = document.getElementById('chat-messages');
var notificationOverlay = document.getElementById('notification-overlay');
var lockscreen = document.getElementById('iphone-lockscreen');
var photoFileInput = document.getElementById('ios-photo-file');

// Real-Time System Clock Loop
function updateSystemTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    
    document.getElementById('status-time').innerText = hours + ':' + minutes + ' 🌐';
    document.getElementById('lock-time').innerText = hours + ':' + minutes;
    
    var options = { weekday: 'long', day: 'numeric', month: 'long' };
    document.getElementById('lock-date').innerText = now.toLocaleDateString('en-GB', options);
    document.getElementById('session-timestamp').innerText = 'Today ' + hours + ':' + minutes;
}
setInterval(updateSystemTime, 1000);
updateSystemTime();

function isLocked() {
    return lockscreen.classList.contains('active');
}

function openApp(appId) {
    if (isLocked()) return;
    var windows = document.querySelectorAll('.app-window');
    for (var i = 0; i < windows.length; i++) {
        windows[i].classList.remove('active');
    }
    document.getElementById(appId).classList.add('active');
    notificationOverlay.style.display = 'none';
}

function goHome() {
    if (isLocked()) return;
    keyboardPanel.classList.remove('active');
    gifPicker.style.display = 'none';
    openApp('app-home');
}

// Click Trigger Bindings Action Loops
document.getElementById('unlock-trigger').onclick = function() {
    lockscreen.classList.remove('active');
    openApp('app-home');
};

document.getElementById('lockscreen-notification').onclick = function() {
    lockscreen.classList.remove('active');
    openApp('app-messages');
};

document.getElementById('hardware-home-bar').onclick = function() {
    goHome();
};

document.getElementById('launch-messages').onclick = function() { openApp('app-messages'); };
document.getElementById('launch-store').onclick = function() { openApp('app-store'); };
document.getElementById('msg-back-btn').onclick = function() { goHome(); };

// Keyboard Interaction Controllers 
inputField.onclick = function() {
    keyboardPanel.classList.add('active');
    gifPicker.style.display = 'none';
};

document.getElementById('key-return').onclick = function() {
    keyboardPanel.classList.remove('active');
};

document.getElementById('key-delete').onclick = function() {
    inputField.value = inputField.value.slice(0, -1);
};

var charKeys = document.querySelectorAll('.kbd-char');
for (var j = 0; j < charKeys.length; j++) {
    charKeys[j].onclick = function(e) {
        var pressedValue = e.target.innerText;
        if (pressedValue === 'space') pressedValue = ' ';
        inputField.value += pressedValue;
    };
}

// Media Selection Dispatch Routers
document.getElementById('gif-trigger-btn').onclick = function() {
    if (gifPicker.style.display === 'none') {
        keyboardPanel.classList.remove('active');
        gifPicker.style.display = 'block';
    } else {
        gifPicker.style.display = 'none';
    }
};

document.getElementById('photo-trigger-btn').onclick = function() {
    photoFileInput.click();
};

photoFileInput.onchange = function(event) {
    var files = event.target.files;
    if (files.length > 0) {
        var localUrl = URL.createObjectURL(files[0]);
        appendMsgNode(localUrl, 'image');
    }
    event.target.value = '';
};

var gifTargets = document.querySelectorAll('.gif-target');
for (var k = 0; k < gifTargets.length; k++) {
    gifTargets[k].onclick = function(e) {
        appendMsgNode(e.target.src, 'image');
        gifPicker.style.display = 'none';
    };
}

document.getElementById('send-msg-btn').onclick = function() {
    var text = inputField.value.trim();
    if (text === '') return;
    appendMsgNode(text, 'text');
    inputField.value = '';
    keyboardPanel.classList.remove('active');
};

document.getElementById('top-status-bar').onclick = function() {
    if (isLocked()) return;
    notificationOverlay.style.display = (notificationOverlay.style.display === 'none') ? 'block' : 'none';
};

function appendMsgNode(content, dataType) {
    var row = document.createElement('div');
    row.className = 'msg-row';
    var bubble = document.createElement('div');
    bubble.className = 'msg-bubble';

    if (dataType === 'text') {
        bubble.innerText = content;
    } else {
        var img = document.createElement('img');
        img.src = content;
        bubble.appendChild(img);
    }

    row.appendChild(bubble);
    chatMessages.appendChild(row);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
