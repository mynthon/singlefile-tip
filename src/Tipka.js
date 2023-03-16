import { Positioner } from "./Positioner";
import { TipContainer } from "./TipContainer";

export class Tipka {
    constructor() {
        this.container = new TipContainer();
        this.positioner = new Positioner();
        this.options = {};
    }

    setOptions(options) {
        this.options = Object.assign(
            this.options,
            options ?? {}
        );

        return this;
    }

    attach(element, content, options) {
        element.addEventListener('mouseover', (e) => {
            const xy = this.positioner.getTooltipParameters(
                element,
                this.container.getContainer(),
                {
                    'fits': ['l', 'r', 't', 'r', 'b', 'l'],
                }
            );

            if (typeof content === 'function') {
                content(this);
            } else {
                this.container.setContent(content);
            }

            this.container.open(xy.x, xy.y);
        });

        element.addEventListener('mouseout', (e) => {
           this.container.delayedClose();
        });
    }

    setText(content) {
        this.container.setContent(content);
    }
}
