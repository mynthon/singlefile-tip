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
            this.options
            , options ?? {}
        );

        return this;
    }

    attach(element, text, options) {
        element.addEventListener('mouseover', (e) => {
            const xy = this.positioner.getTooltipParameters(
                document.getElementById('test'),
                this.container.getContainer(),
                {
                    'fits': ['l', 'r', 't', 'r', 'b', 'l']
                }
            );
            this.container.setText(text);
            this.container.open(xy.x, xy.y);
        })

        element.addEventListener('mouseout', (e) => {
           this.container.delayedClose();
        })
    }
}
