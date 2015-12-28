import {describe, it, expect} from '../imports';
import {Stage} from '../../src/canvas/Stage';

describe('Stage', () => {
    it('is available', () => {
        expect(Stage).not.to.be.null;
    });

    let canvasElement = document.getElementById('gamecanvas');
    let stage = new Stage(canvasElement);

    it('is instantiable', () => {
        expect(stage).not.to.be.null;
    });

    it('has the proper internal size', () => {
        expect(stage.width).to.equal(960);
        expect(stage.height).to.equal(540);
    });
});
