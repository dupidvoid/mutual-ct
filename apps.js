// Variable DOM Element Cache Mappings
var inputField = document.getElementById('ios-input-field');
var keyboardPanel = document.getElementById('keyboard-panel');
var gifPicker = document.getElementById('ios-gif-picker');
var chatMessages = document.getElementById('chat-messages');
var notificationOverlay = document.getElementById('notification-overlay');
var lockscreen = document.getElementById('iphone-lockscreen');
var photoFileInput = document.getElementById('ios-photo-file');

// Hardware Authentication Parameters 
var TARGET_PASSCODE = "19473";
var currentPasscodeBuffer = "";

// --- LIVE REAL-TIME OS CLOCK ENGINE ---
function updateSystemTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    
    // Add leading zero if values are less than 10 (e.g., 09:05)
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    
    var timeString = hours + ':' + minutes;
    
    // 1. Update Top Status Bar Clock Live
    if (document.getElementById('status-time')) {
        document.getElementById('status-time').innerText = timeString + ' 🌐';
    }
    // 2. Update Lock Screen Big Clock Live
    if (document.getElementById('lock-time')) {
        document.getElementById('lock-time').innerText = timeString;
    }
    
    // 3. Update Lock Screen Calendar Date Node Dynamically
    var options = { weekday: 'long', day: 'numeric', month: 'long' };
    if (document.getElementById('lock-date')) {
        document.getElementById('lock-date').innerText = now.toLocaleDateString('en-US', options);
    }
    // 4. Update Chat Room Conversation Timestamp Log
    if (document.getElementById('session-timestamp')) {
        document.getElementById('session-timestamp').innerText = 'Today ' + timeString;
    }
}
// Run the timer loop every 1000 milliseconds (1 second) to keep time perfectly synchronized
setInterval(updateSystemTime, 1000);
updateSystemTime(); // Initial core load trigger execution on page wake up

function openApp(appId) {
    var windows = document.querySelectorAll('.app-window');
    for (var i = 0; i < windows.length; i++) {
        windows[i].classList.remove('active');
    }
    var targetWindow = document.getElementById(appId);
    if (targetWindow) {
        targetWindow.classList.add('active');
    }
    if (notificationOverlay) {
        notificationOverlay.style.display = 'none';
    }
}

function goHome() {
    if (lockscreen && lockscreen.classList.contains('active')) return;
    if (keyboardPanel) keyboardPanel.classList.remove('active');
    if (gifPicker) gifPicker.style.display = 'none';
    openApp('app-home');
}

// Passcode Operational Grid UI Routines
function revealPasscodeOverlay() {
    document.getElementById('lock-date').style.display = 'none';
    document.getElementById('lock-time').style.display = 'none';
    document.getElementById('lockscreen-notification').style.display = 'none';
    document.getElementById('unlock-trigger').style.display = 'none';
    
    document.getElementById('passcode-view-panel').classList.add('revealed');
}

function hidePasscodeOverlay() {
    document.getElementById('passcode-view-panel').classList.remove('revealed');
    currentPasscodeBuffer = "";
    updatePasscodeDotsDisplay();
    
    document.getElementById('lock-date').style.display = 'block';
    document.getElementById('lock-time').style.display = 'block';
    document.getElementById('lockscreen-notification').style.display = 'block';
    document.getElementById('unlock-trigger').style.display = 'block';
}

function updatePasscodeDotsDisplay() {
    for (var i = 0; i < 5; i++) {
        var dot = document.getElementById('dot-' + i);
        if (dot) {
            if (i < currentPasscodeBuffer.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled');
            }
        }
    }
}

// Bind Passcode Grid Number Taps
var passcodeButtons = document.querySelectorAll('.passcode-num-btn');
for (var i = 0; i < passcodeButtons.length; i++) {
    passcodeButtons[i].onclick = function(e) {
        if (currentPasscodeBuffer.length >= 5) return;
        
        currentPasscodeBuffer += e.target.value;
        updatePasscodeDotsDisplay();
        
        if (currentPasscodeBuffer.length === 5) {
            if (currentPasscodeBuffer === TARGET_PASSCODE) {
                document.getElementById('passcode-status-msg').innerText = "Success";
                setTimeout(function() {
                    if (lockscreen) lockscreen.classList.remove('active');
                    hidePasscodeOverlay();
                    openApp('app-home');
                    document.getElementById('passcode-status-msg').innerText = "Enter Passcode";
                }, 300);
            } else {
                var panel = document.getElementById('passcode-view-panel');
                panel.style.animation = "shake 0.4s ease";
                document.getElementById('passcode-status-msg').innerText = "Incorrect Passcode";
                document.getElementById('passcode-status-msg').style.color = "#ff3b30";
                
                setTimeout(function() {
                    panel.style.animation = "";
                    currentPasscodeBuffer = "";
                    updatePasscodeDotsDisplay();
                }, 400);
            }
        }
    };
}

document.getElementById('passcode-cancel-trigger').onclick = function() {
    hidePasscodeOverlay();
};

document.getElementById('unlock-trigger').onclick = function() {
    revealPasscodeOverlay();
};

document.getElementById('lockscreen-notification').onclick = function() {
    revealPasscodeOverlay();
};

// Global System Click Triggers
document.getElementById('hardware-home-bar').onclick = function() {
    goHome();
};

if (document.getElementById('launch-messages')) {
    document.getElementById('launch-messages').onclick = function() { openApp('app-messages'); };
}
if (document.getElementById('launch-store')) {
    document.getElementById('launch-store').onclick = function() { openApp('app-store'); };
}
if (document.getElementById('msg-back-btn')) {
    document.getElementById('msg-back-btn').onclick = function() { goHome(); };
}

// Virtual iOS Keyboard Entry Logic Mappings
if (inputField) {
    inputField.onclick = function() {
        if (keyboardPanel) keyboardPanel.classList.add('active');
        if (gifPicker) gifPicker.style.display = 'none';
    };
}

if (document.getElementById('key-return')) {
    document.getElementById('key-return').onclick = function() {
        if (keyboardPanel) keyboardPanel.classList.remove('active');
    };
}

if (document.getElementById('key-delete')) {
    document.getElementById('key-delete').onclick = function() {
        if (inputField) inputField.value = inputField.value.slice(0, -1);
    };
}

var charKeys = document.querySelectorAll('.kbd-char');
for (var j = 0; j < charKeys.length; j++) {
    charKeys[j].onclick = function(e) {
        var pressedValue = e.target.innerText;
        if (pressedValue === 'space') pressedValue = ' ';
        if (inputField) inputField.value += pressedValue;
    };
}

// Media Attachment Dropdown Dispatches
if (document.getElementById('gif-trigger-btn')) {
    document.getElementById('gif-trigger-btn').onclick = function() {
        if (gifPicker) {
            if (gifPicker.style.display === 'none' || gifPicker.style.display === '') {
                if (keyboardPanel) keyboardPanel.classList.remove('active');
                gifPicker.style.display = 'block';
            } else {
                gifPicker.style.display = 'none';
            }
        }
    };
}

if (document.getElementById('photo-trigger-btn')) {
    document.getElementById('photo-trigger-btn').onclick = function() {
        if (photoFileInput) photoFileInput.click();
    };
}

if (photoFileInput) {
    photoFileInput.onchange = function(event) {
        var files = event.target.files;
        if (files && files.length > 0) {
            var localUrl = URL.createObjectURL(files[0]);
            appendMsgNode(localUrl, 'image');
        }
        event.target.value = '';
    };
}

var gifTargets = document.querySelectorAll('.gif-target');
for (var k = 0; k < gifTargets.length; k++) {
    gifTargets[k].onclick = function(e) {
        appendMsgNode(e.target.src, 'image');
        if (gifPicker) gifPicker.style.display = 'none';
    };
}

if (document.getElementById('send-msg-btn')) {
    document.getElementById('send-msg-btn').onclick = function() {
        if (!inputField) return;
        var text = inputField.value.trim();
        if (text === '') return;
        appendMsgNode(text, 'text');
        inputField.value = '';
        if (keyboardPanel) keyboardPanel.classList.remove('active');
    };
}

if (document.getElementById('top-status-bar')) {
    document.getElementById('top-status-bar').onclick = function() {
        if (lockscreen && lockscreen.classList.contains('active')) return;
        if (notificationOverlay) {
            notificationOverlay.style.display = (notificationOverlay.style.display === 'none') ? 'block' : 'none';
        }
    };
}

function appendMsgNode(content, dataType) {
    if (!chatMessages) return;
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
