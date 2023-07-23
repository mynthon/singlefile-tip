import { Positioner } from "./Positioner";
import { TipContainer } from "./TipContainer";

export class Tipka {
    /**
     *
     * @param {*} options Configuration options.
     * @param {Array} options.fits Preffered position for tooltip. Can be 't', 'r', 'b', 'l'.
     * @param {Object} options.containerCss Object with additional stylec for tooltip.
     * @param {*} options.content Content to be displayed. It can be string or HTMLElement.
     */
    constructor(options) {
        this._opts = {
            'fits': options?.fits ?? ['r', 't', 'b', 'l'],
            'content': options?.content ?? '' // to be fixed with tooltip function
        };

        this.container = new TipContainer({divCss: options?.containerCss ?? {}});
        this.positioner = new Positioner();
        this._rollOutCloseDelayTimeoutId = null;

        const divContainer = this.container.init().getContainer();

        divContainer.addEventListener('mouseenter', (e) => {
            clearTimeout(this._rollOutCloseDelayTimeoutId);
        })

        divContainer.addEventListener('mouseleave', (e) => {
            this.close();
        })
    }

    /**
     *
     * @param {*} options Configuration options
     * @param {Array} options.fits Preffered position for tooltip. Can be 't', 'r', 'b', 'l'
     * @param {Object} options.containerCss Object with additional stylec for tooltip
     */
    setOptions(options) {
        this._opts = Object.assign(this._opts, options ?? {});

        return this;
    }

    /**
     * Attaches tooltip to trigger.
     *
     * @param {*} trigger Element that triggers tooltip;
     * @param {*} options See constructor options;
     * @returns
     */
    attach(trigger, options) {
        // @todo: support for title attribute ahould be addes moewhere here
        trigger.addEventListener('mouseover', (e) => {
            this.open(trigger, options);
        });

        trigger.addEventListener('mouseout', (e) => {
            this.delayedClose();
        });

        return this;
    }

    /**
     * Open tooltip for trigger.
     *
     * @param {*} trigger Element that triggers tooltip;
     * @param {*} options See constructor options;
     * @returns
     */
    open(trigger, options) {
        trigger.tipkaOpts = options;
        clearTimeout(this._rollOutCloseDelayTimeoutId);

        const content = this.getOpt(trigger, 'content', null);

        if (typeof content === 'function') {
            content(this, trigger);
        } else {
            this.container.setContent(content);
        }

        const xy = this.positioner.getTooltipParameters(
            trigger,
            this.container.getContainer(),
            {
                'fits':  this.getOpt(trigger, 'fits', null),
            }
        );

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
