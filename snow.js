class Snow {
    constructor(container, snow, size, color,display) {
        let div = document.createElement('div');
        div.classList.add('websnow_snow');
        div.style.display = display ?'inline':'none';

        container.appendChild(div);
        this.div = div;
        this.container = container;
    }

    setSize(size) {

    }

    setColor(color) {
        
    }

    remove() {
        this.container.removeChild(this.div);
    }

    updatePosition() {
        this.div.style.top = this.py + 'px';
        this.div.style.left = this.px + 'px';
    }

    show() {
        this.div.style.display = 'inline';
    }

    hide() {
        this.div.style.display = 'none';
    }
}

class TextSnow extends Snow {
    constructor(container, snowSrc, size, color, display)
    {
        super(container, snowSrc, size, color, display);
        this.setSize(size);
        this.setColor(color);
        this.div.innerText = snowSrc;
    }

    setSize(size) {
        this.div.style.fontSize = size + 'px';
    }

    setColor(color) {
        this.div.style.color = color;
    }
}

class ImgSnow extends Snow{
    constructor(container, snowSrc, size, color, display) {
        super(container, snowSrc, size, color, display);
        
        this.img = document.createElement('img');
        this.div.appendChild(this.img);
        this.img.classList.add('webSnow_SnowImg');
        this.img.src = snowSrc;
        
        this.setSize(size);
    }

    setSize(size) {
        this.div.style.width = size + 'px';
        this.div.style.height = size + 'px';
    }
}