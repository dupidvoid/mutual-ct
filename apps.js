// Variable DOM Element Cache Mappings
var inputField = document.getElementById('ios-input-field');
var keyboardPanel = document.getElementById('keyboard-panel');
var gifPicker = document.getElementById('ios-gif-picker');
var chatMessages = document.getElementById('chat-messages');
var notificationOverlay = document.getElementById('notification-overlay');
var lockscreen = document.getElementById('iphone-lockscreen');
var phoneScreen = document.getElementById('global-phone-screen');
var wallpaperFileInput = document.getElementById('ios-wallpaper-file');

// Default System Fallback Gradient Wallpaper
var defaultWallpaper = "linear-gradient(180deg, #1e3a8a 0%, #581c87 100%)";

// Load Saved Custom Wallpaper from LocalStorage on Launch
function loadSavedWallpaper() {
    var savedBg = localStorage.getItem('iphone_simulator_bg');
    
    // Hide the top drop tray from leaking text entries into lockscreen on launch
    document.getElementById('notification-overlay').style.display = 'none';
    
    if (savedBg) {
        phoneScreen.style.background = savedBg;
        lockscreen.style.background = savedBg;
    } else {
        phoneScreen.style.background = defaultWallpaper;
        lockscreen.style.background = "url('https://unsplash.com') center/cover";
    }
}
loadSavedWallpaper();

// Real-Time 24-Hour System Clock Loop
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

// Helper to determine if the lock screen overlay state layer is active
function isLocked() {
    return lockscreen.classList.contains('active');
}

// Router Workspace Panel App Switch Switcher Engine
function openApp(appId) {
    if (isLocked()) return; // Keeps apps from opening accidentally underneath the lock screen
    
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

// --- SYSTEM UNLOCK FIX ENGINES ---
document.getElementById('unlock-trigger').onclick = function() {
    lockscreen.classList.remove('active'); // Remove lock layer BEFORE calling app routers
    openApp('app-home');                   // Safely loads the home icon wallpaper canvas
};

document.getElementById('lockscreen-notification').onclick = function() {
    lockscreen.classList.remove('active'); // Remove lock layer BEFORE calling app routers
    openApp('app-messages');               // Directs user straight into the iMessage view panel
};

// Global Hardware Button Click Triggers
document.getElementById('hardware-home-bar').onclick = function() {
    goHome();
};

document.getElementById('launch-messages').onclick = function() { openApp('app-messages'); };
document.getElementById('launch-store').onclick = function() { openApp('app-store'); };
document.getElementById('launch-settings').onclick = function() { openApp('app-settings'); };
document.getElementById('msg-back-btn').onclick = function() { goHome(); };
document.getElementById('settings-back-btn').onclick = function() { goHome(); };

// Settings App - Wallpaper Upload Processors
document.getElementById('wallpaper-upload-row').onclick = function() {
    wallpaperFileInput.click();
};

wallpaperFileInput.onchange = function(event) {
    var files = event.target.files;
    if (files.length > 0) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var backgroundUrlString = "url('" + e.target.result + "') center/cover";
            
            phoneScreen.style.background = backgroundUrlString;
            lockscreen.style.background = backgroundUrlString;
            
            localStorage.setItem('iphone_simulator_bg', backgroundUrlString);
        };
        reader.readAsDataURL(files[0]);
    }
    event.target.value = '';
};

document.getElementById('reset-wallpaper-btn').onclick = function() {
    localStorage.removeItem('iphone_simulator_bg');
    phoneScreen.style.background = defaultWallpaper;
    lockscreen.style.background = "url('https://unsplash.com') center/cover";
};

// Virtual iOS Keyboard Core Routines
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

// iMessage Attachments & Send Triggers
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
