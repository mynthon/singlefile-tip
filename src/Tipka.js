import { Positioner } from "./Positioner";
import { TipContainer } from "./TipContainer";

export class Tipka {
    constructor() {
        this.container = new TipContainer();
        this.positioner = new Positioner();
        this._rollOutCloseDelayTimeoutId = null;
        this.trigger = null;
        this._opts = {
            'fits': ['r', 't', 'b', 'l']
        };
        const divContainer = this.container.init().getContainer();

        divContainer.addEventListener('mouseenter', (e) => {
            clearTimeout(this._rollOutCloseDelayTimeoutId);
        })

        divContainer.addEventListener('mouseleave', (e) => {
            this.close();
        })
    }

    setDefaults(options) {
        this._opts = Object.assign(this._opts, options ?? {});

        return this;
    }

    attach(trigger, options = {}) {
        trigger.tipkaOpts = options;

        trigger.addEventListener('mouseover', (e) => {
            this.open(trigger);
        });

        trigger.addEventListener('mouseout', (e) => {
            this.delayedClose();
        });

        return this;
    }

    open(trigger) {
        clearTimeout(this._rollOutCloseDelayTimeoutId);

        this.trigger = trigger;
        const content = this.getOpt(trigger, 'content', null);
        const xy = this.positioner.getTooltipParameters(
            trigger,
            this.container.getContainer(),
            {
                'fits':  this.getOpt(trigger, 'fits', null),
            }
        );

        if (typeof content === 'function') {
            content(this);
        } else {
            this.container.setContent(content);
        }

        this.container.open(xy.x, xy.y);
    }

    close() {
        this.container.close();
    }

    delayedClose(delayMs) {
        delayMs = typeof(delayMs) === 'number' && delayMs >= 0 ? delayMs : 100;
        this._rollOutCloseDelayTimeoutId = setTimeout(this.close.bind(this), delayMs)
    }

    setText(content) {
        this.container.setContent(content);
    }

    getOpt(trigger, option, defaultVal) {
        return trigger.tipkaOpts[option] || this._opts[option] || defaultVal;
    }
}
