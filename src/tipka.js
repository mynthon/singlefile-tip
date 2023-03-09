import { Positioner } from "./Positioner";
import { TipContainer } from "./TipContainer";

var tipex = new TipContainer();
var pos = new Positioner();
document.getElementById('test').addEventListener('mouseover', (e) => {


    var xy = pos.getTooltipParameters(
        document.getElementById('test'),
        tipex.getContainer(),
        {
            'fits': ['l', 'r', 't', 'r', 'b', 'l']
        }
    );
    console.log(xy)
    tipex.setText( 'Some text');
    tipex.open(xy.x, xy.y);
})

document.getElementById('test').addEventListener('mouseout', (e) => {
   tipex.delayedClose();
})