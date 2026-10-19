(function() {
    const cssStyleNode = document.createElement("style");
    cssStyleNode.textContent = `
        * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
        body { background-color: #0f172a; height: 100vh; display: flex; justify-content: center; align-items: center; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        
        /* Flagship Hardware Outer Frame Wrap - Real 19.5:9 Display Scale Aspect Ratio */
        .iphone-frame {
            width: 360px;
            height: 780px;
            background-color: #1e1e24;
            border-radius: 44px;
            padding: 10px;
            box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8);
            border: 4px solid #3f3f46;
            position: relative;
            display: flex;
            flex-direction: column;
        }
        
        /* Inner Screen display boundary */
        .iphone-screen {
            flex: 1;
            background: linear-gradient(180deg, #1e3a8a 0%, #581c87 100%);
            border-radius: 36px;
            overflow: hidden;
            position: relative;
            display: flex;
            flex-direction: column;
        }

        /* Apple Hardware Dynamic Status Bar & Notch */
        .iphone-notch {
            width: 110px;
            height: 28px;
            background-color: #000000;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            border-bottom-left-radius: 16px;
            border-bottom-right-radius: 16px;
            z-index: 100;
        }
        .status-bar {
            height: 38px;
            padding: 14px 22px 0 22px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: white;
            font-size: 11px;
            font-weight: 500;
            z-index: 90;
        }

        /* Screen States Window Framework Routing Controls */
        .app-window { display: none; width: 100%; height: 100%; position: absolute; top: 0; left: 0; padding-top: 38px; padding-bottom: 28px; flex-direction: column; }
        .app-window.active { display: flex; }

        /* Screen State A: iOS Apps Home Launcher */
        .home-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; padding: 24px; margin-top: 20px; }
        .app-icon-wrapper { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
        .app-icon { width: 56px; height: 56px; border-radius: 13px; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); transition: transform 0.1s; }
        .app-icon:active { transform: scale(0.9); }
        .app-label { color: white; font-size: 11px; margin-top: 6px; text-shadow: 0 1px 2px rgba(0,0,0,0.6); }

        /* Screen State B: iMessage Main Window Layout */
        #app-messages { background-color: #ffffff; }
        .chat-header { background-color: #f4f4f5; padding: 12px 16px; border-bottom: 1px solid #e4e4e7; display: flex; align-items: center; gap: 8px; }
        .back-btn { font-size: 18px; color: #007aff; cursor: pointer; background: none; border: none; }
        .chat-title { font-size: 14px; font-weight: 600; color: #18181b; }
        .messages-feed { flex: 1; padding: 12px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background-color: #ffffff; }
        .msg-row { display: flex; justify-content: flex-end; }
        .msg-bubble { background-color: #007aff; color: white; padding: 8px 14px; border-radius: 16px; border-bottom-right-radius: 2px; max-width: 75%; font-size: 14px; word-break: break-word; line-height: 1.4; }
        .msg-bubble img { max-width: 100%; border-radius: 10px; display: block; max-height: 140px; object-fit: cover; }
        .input-bar { padding: 8px 12px; display: flex; align-items: center; gap: 8px; border-top: 1px solid #e4e4e7; background-color: #f4f4f5; }
        .ios-input-box { flex: 1; background-color: #ffffff; border: 1px solid #d4d4d8; border-radius: 20px; padding: 6px 12px; font-size: 14px; outline: none; }
        .action-icon-btn { font-size: 20px; background: none; border: none; cursor: pointer; color: #007aff; }

        /* Dynamic iOS On-Screen Keyboard System Display Panel */
        .ios-keyboard {
            background-color: #d1d5db;
            padding: 8px 4px 28px 4px;
            display: none;
            flex-direction: column;
            gap: 6px;
            box-shadow: 0 -4px 12px rgba(0,0,0,0.08);
        }
        .ios-keyboard.active { display: flex; }
        .kbd-row { display: flex; justify-content: center; gap: 4px; width: 100%; }
        .kbd-key {
            flex: 1;
            height: 42px;
            background-color: #ffffff;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: #000000;
            box-shadow: 0 1px 1px rgba(0,0,0,0.25);
            cursor: pointer;
        }
        .kbd-key:active { background-color: #abb1b6; }
        .kbd-key.wide { flex: 1.5; background-color: #abb1b6; font-size: 13px; }
        .kbd-key.space { flex: 5; }

        /* Hardware Global iOS System Bottom Home Indicator Bar */
        .iphone-home-bar {
            width: 120px;
            height: 5px;
            background-color: #ffffff;
            position: absolute;
            bottom: 8px;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 3px;
            cursor: pointer;
            z-index: 100;
        }
        #app-messages ~ .iphone-home-bar, #app-store ~ .iphone-home-bar { background-color: #000000; }
        
        /* App Store Specific Mock Tab Screen Styling */
        #app-store { background-color: #ffffff; color: black; padding: 55px 20px 20px 20px; }
        .store-header { font-size: 26px; font-weight: 800; border-bottom: 2px solid #e4e4e7; padding-bottom: 10px; margin-bottom: 15px; }
        .store-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f4f4f5; }
        .store-img { width: 48px; height: 48px; border-radius: 10px; font-size: 22px; display: flex; align-items: center; justify-content: center; background-color: #f4f4f5; }
        .store-btn { background-color: #f4f4f5; color: #007aff; font-weight: bold; font-size: 12px; padding: 4px 12px; border-radius: 20px; border: none; cursor: pointer; }
    `;
    document.head.appendChild(cssStyleNode);
})();
