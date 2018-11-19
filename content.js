let snowContainer;
let textSnowTemplates = ['*', '✻', '❆'];
let snowCount = 100;
let snowSizeMax = 100;
let snowColor = '#ffffff';
JQ(document).ready(() => {
    loadCSSFile(chrome.runtime.getURL('snow.css'));

    snowContainer = document.createElement('div');
    snowContainer.classList.add('websnow_snowcontainer');
    snowControl.init(snowContainer);
    
    loadConfigs(() => {
        initSnows();
    })
});

function loadConfigs(callback) {
    chrome.runtime.sendMessage({ command: 'getConfigs' }, (res) => {
        snowCount = res.snowCount;
        snowSizeMax = res.snowSizeMax;
        snowColor = res.snowColor;

        snowControl.xMaxSpeed = res.snowXMaxSpeed;
        snowControl.yMaxSpeed = res.snowYMaxSpeed;
        snowControl.yMinSpeed = res.snowYMinSpeed;



        if (callback) callback();
    })
}

function initSnows() {
    snowControl.removeSnows();
    snowControl.setSnows(createSnows());
}


function createSnows() {
    let snows = [];
    for (let i = 0; i < snowCount; i++) {
        let snow = new TextSnow(snowContainer,
            textSnowTemplates[(Math.floor((Math.random() + 0.1) * 3)) % 3],
            snowSizeMax * Math.random(),
            snowColor,
            snowControl.snowing
        );

        snows[i] = snow;
    }
    return snows;
}

function loadCSSFile(URL) {
    try {
        let css = document.createElement('link');
        css.setAttribute('rel', 'stylesheet');
        css.setAttribute('type', 'text/css');
        css.setAttribute('href', URL);
        document.getElementsByTagName('head')[0].appendChild(css);
    }
    catch (e) {
        return false;
    }
    return true;
}

chrome.runtime.onMessage.addListener(
    (function (request /*, sender, sendResponse*/) {
        switch (request.command) {
            case 'snowSwitch':
                snowControl.snowSwitch()
                break;
            case 'configsChanged':
                {
                    loadConfigs(() => {
                        initSnows();
                    })
                    break;
                }
        }
    })
);