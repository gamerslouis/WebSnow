import defaultConfgis from "./defaultConfig.js";

window.onload = function () {
    chrome.browserAction.onClicked.addListener(() => {
        chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { command: "snowSwitch" });
        });
    });

    chrome.runtime.onInstalled.addListener((details) => {
        if (details.OnInstalledReason != 'update') {
            chrome.storage.local.set({ 'configs': defaultConfgis });
        }
    })

    chrome.storage.onChanged.addListener(() => {
        chrome.tabs.query({}, (tabs) => {
            for (let tab of tabs) {
                chrome.tabs.sendMessage(tab.id, { command: "configsChanged" });
            }
        });
    });

    chrome.runtime.onMessage.addListener(
        (function (request , sender, sendResponse) {
            switch (request.command) {
                case 'getConfigs':
                    chrome.storage.local.get(['configs'], res => {
                        sendResponse(res.configs);
                    })
                    return true;
                    break;
            }
        })
    );
};
