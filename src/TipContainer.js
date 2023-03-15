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
            div.style.background = '#f9f9f9';
            div.style.border = '1px solid #888';
            div.style.borderRadius = '3px'
            div.style.boxShadow = "#888 0px 0px 3px 0";
            div.style.left = '-100000px';
            div.style.maxHeight = '500px';
            div.style.minHeight = '20px';
            div.style.opacity = 0;
            div.style.overflow = 'auto';
            div.style.padding = "6px";
            div.style.position = 'absolute';
            div.style.top = '-100000px';
            div.style.width = '400px';
            div.style.zIndex = 10000;

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

    delayedClose(delayMs) {
        delayMs = typeof(delayMs) === 'number' && delayMs >= 0 ? delayMs : 100;
        this.rollOutTimeoutId = setTimeout(this.close.bind(this), delayMs)
    }

    setContent(content) {
        if (typeof content === 'string') {
            this.init().getContainer().innerHTML = content;
        } else if (content instanceof HTMLElement) {
            this.init().getContainer().appendChild(content);
        }

    }

    getContainer() {
        return this.init().div;
    }
}
