export class TipContainer {
    constructor(options) {
        this.div = null;
        this.id = (new Date()).getTime() + '' + Math.round(Math.random() * 10000);

        this.divCss = Object.assign({
            background: '#f9f9f9',
            border: '1px solid #888',
            borderRadius: '3px',
            boxShadow: "#888 0px 0px 3px 0",
            left: '-100000px',
            maxHeight: '500px',
            minHeight: '20px',
            opacity: 0,
            overflow: 'auto',
            padding: "6px",
            position: 'absolute',
            top: '-100000px',
            transition: 'opacity 200ms',
            minWidth: '100px',
            maxWidth: '600px',
            zIndex: 10000,
        }, options?.divCss ?? {});
    }

    init() {
        if (!document.getElementById(this.id)) {
            let div = document.createElement('div');
            div.id = this.id;
            this.setStyles(div, this.divCss);
            document.querySelector('body').appendChild(div);
            this.div = div;
        }

        return this;
    }

    setStyles(target, stylesObject = {}) {
        Object.keys(stylesObject).forEach(rule => {
            target.style[rule] = stylesObject[rule];
        });
    }

    open(x, y) {
        const div = this.init().getContainer();

        div.classList.add('tipka-opened');
        this.setStyles(div, {
            left: x + 'px',
            top: y + 'px',
            opacity: 1,
        });

        return this;
    }

    close() {
        const div = this.init().getContainer();

        div.classList.remove('tipka-opened');
        this.setStyles(div, {
            left: '-100000px',
            top: '-100000px',
            opacity: 0,
        });

        return this;
    }

    setContent(content) {
        if (typeof content === 'string') {
            this.init().getContainer().innerHTML = content;
        } else if (content instanceof HTMLElement) {
            const container = this.init().getContainer();
            container.innerHTML = '';
            container.appendChild(content);
        }

    }

    getContainer() {
        return this.init().div;
    }
}
