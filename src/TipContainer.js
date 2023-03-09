export class TipContainer {
    constructor(options) {
        this.div = null;
        this.id = (new Date()).getTime() + '' + Math.round(Math.random() * 10000);
        this.rollOutTimeoutId = null;
    }

    init() {
        if (!document.getElementById(this.id)) {
            let div = document.createElement('div');
            div.id = this.id
            div.style.position = 'absolute';
            div.style.zIndex = 10000;
            div.style.width = '400px';
            div.style.height = '300px';
            div.style.border = '1px solid #bbb';
            div.style.background = '#fff';
            div.style.borderRadius = '5px'
            div.style.boxShadow = "#888 0px 0px 4px 0";
            div.style.padding = "6px";
            div.style.left = '-100000px';
            div.style.top = '-100000px';
            div.style.opacity = 0;

            div.addEventListener('mouseenter', (e) => {
                clearTimeout(this.rollOutTimeoutId);
            })

            div.addEventListener('mouseleave', (e) => {
                this.delayedClose();
            })

            document.querySelector('body').appendChild(div);

            this.div = div;
        }

        return this;
    }

    open(x, y) {
        clearTimeout(this.rollOutTimeoutId);

        const div = this.init().getContainer();

        div.style.left = x + 'px';
        div.style.top = y + 'px';
        div.style.opacity = 1;

        return this;
    }

    close() {
        const div = this.init().getContainer();

        div.style.left = '-100000px';
        div.style.top = '-100000px';
        div.style.opacity = 0;

        return this;
    }

    delayedClose() {
        this.rollOutTimeoutId = setTimeout(this.close.bind(this), 100)
    }

    setText(text) {
        this.init().getContainer().innerHTML = text;
    }

    getContainer() {
        return this.init().div;
    }
}
