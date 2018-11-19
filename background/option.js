import defaultConfgis from "./defaultConfig.js";
let currentConfigs = new Object();

function applyConfig(key, value) {
    let elements = document.getElementsByName(key);
    if (elements.length != 0) {
        switch (elements[0].type) {
            case 'number':
                {
                    elements[0].value = value;
                }
            case 'text':
                {
                    elements[0].value = value;
                }
            default:
                {
                    break;
                }
        }
    }
}

function saveConfigs(callback) {
    let newConfigs = JQ('input').toArray();
    chrome.storage.local.get(['configs'], (res) => {
        let configs = res.configs;
        if (configs == false)//configs not ready
        {
            setTimeout(init, 500);
            return;
        }

        for (let config of newConfigs) {
            configs[config.name] = config.value;
        }

        chrome.storage.local.set({ 'configs': configs });
        if(callback)callback();
    });
}

function loadconfigs(callback) {
    chrome.storage.local.get(['configs'], (res) => {
        let configs = res.configs;
        currentConfigs = res.configs;
        if (configs == false)//configs not ready
        {
            setTimeout(init, 500);
            return;
        }
        for (let [key, value] of Object.entries(configs)) {
            applyConfig(key, value);
        }
        if (callback)callback();
    });
}

function init() {
    loadconfigs(() => {
        chrome.runtime.onMessage.addListener(
            function (request, sender, sendResponse) {
                if (request.command) {
                    switch (request.command) {
                        case 'onConfigChange':
                            {
                                applyConfig(key, value);
                                break;
                            }
                    }
                }
            }
        );

        document.getElementById('save').addEventListener('click', () => {
            saveConfigs();
        });

        document.getElementById('defaultSetting').addEventListener('click', () => {
            chrome.storage.local.set({ 'configs': defaultConfgis }, () => {
                loadconfigs();
            });
        });

        document.getElementById('testSnow').addEventListener('click', (e) => {
            if (snowControl.snowing) {
                e.target.innerText = "隱藏所有設定項，並下雪";
                JQ('.configs').show();
                document.body.style.backgroundColor = "#FFFFFF";
                snowControl.stopSnow();
                
            }
            else {
                e.target.innerText = "停止下雪";
                JQ('.configs').hide();
                document.body.style.backgroundColor = currentConfigs.optionPageBackGroundColor;
                snowControl.startSnow();
            }
            
        });

        chrome.storage.onChanged.addListener(() => {
            loadconfigs();
        });

        JQ('#snowColor_colorpicker').farbtastic('#snowColor');
        JQ('#optionPageBackGroundColor_colorpicker').farbtastic('#optionPageBackGroundColor');
    });
}

window.onload = init;