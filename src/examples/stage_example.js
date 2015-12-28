import {Stage} from '../canvas/Stage';

export default () => {

    let canvasElement = document.getElementById('gamecanvas');
    const stage = new Stage(canvasElement);
    const context = stage.context;
    context.fillStyle = '#203060';
    context.fillRect(0, 0, canvasElement.width, canvasElement.height);
    context.fillStyle = '#fafef0';
    context.font = '32px monospace';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.fillText('Hello, Modern Web Development World!', stage.width * 0.5, (stage.height - 32) * 0.5);
};
