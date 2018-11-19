snowControl = new (class {
    constructor() {
        //Constants -- Dont touch here
        this.speedFactor = 0.1;
        this.flamec = 0;
        //User Variables
        this.xMaxSpeed = 15;
        this.yMaxSpeed = 70;
        this.yMinSpeed = 7;


        //Runtime Variables
        this.windowWidth;
        this.windowHeight;
        this.snowContainer;
        this.snowing = false;
        this.snows = [];
    }

    init(snowContainer) {
        //Create Dom container for snows
        this.snowContainer = snowContainer;
        document.body.appendChild(this.snowContainer);
        this.loadWindowSize();
    }

    setSnows(snows) {
        this.snows = snows;
        for (let i = 0; i < this.snows.length; i++) {

            snows[i].py = -400 * Math.random() - 150;
            snows[i].px = this.windowWidth * Math.random();
            snows[i].updatePosition();

            snows[i].xSpeed = this.xMaxSpeed * (Math.random() * 1.5 - 0.5);
            snows[i].ySpeed = (this.yMaxSpeed - this.yMinSpeed) * Math.random() + this.yMinSpeed;
        }
    }

    removeSnows() {
        //Remove old snows
        if (this.snows.length != 0) {
            for (let i = 0; i < this.snows.length; i++)
                this.snows[i].remove();
            this.snows.length = 0;
        }
    }

    loadWindowSize() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
    }

    resetPosition(snow) {
        snow.py = -150;
        snow.px = this.windowWidth * Math.random();
    }
 
    updateSnow() {
        if (this.flamec++ % 2) {
            requestAnimationFrame(this.updateSnow.bind(this));
            return 0;
        }
        let snows = this.snows;
        if (!this.snowing) return;
        for (let i = 0; i < snows.length; i++) {
            snows[i].py += snows[i].ySpeed * this.speedFactor;
            snows[i].px += snows[i].xSpeed * this.speedFactor;
            if (snows[i].py > this.windowHeight || snows[i].px > this.windowWidth) {
                this.resetPosition(snows[i]);
            }
            snows[i].updatePosition();
        }
        requestAnimationFrame(this.updateSnow.bind(this));
    }

    startSnow() {
        this.snowing = true;
        for (let i = 0; i < this.snows.length; i++) {
            this.snows[i].show();
        }
        this.updateSnow();
    }

    stopSnow() {
        this.snowing = false;
        for (let i = 0; i < this.snows.length; i++) {
            this.snows[i].hide();
        }
    }

    snowSwitch() {
        if (this.snowing) {
            this.stopSnow();
        }
        else {
            this.startSnow();
        }
    }
})();


JQ(window).resize(() => {
    snowControl.loadWindowSize()
});