
/**
 * provides a very simple auto-scaling stage for a canvas game project
 */
export class Stage {
    /**
     * class constructor - sets up the canvas to aspect-ratio scale to fit the available browser space
     * @param {!HTMLCanvasElement} canvasElement - HTML5 canvas DOM element to use as the stage
     */
    constructor(canvasElement) {
        let stage = this;
        const htmlWidth = canvasElement.width;
        const htmlHeight = canvasElement.height;
        /**
         * width of the stage in logical pixels (actual pixels are scaled to fit browser)
         * @type {number}
         */
        stage.width = htmlWidth;
        /**
         * height of the stage in logical pixels (actual pixels are scaled to fit browser)
         * @type {number}
         */
        stage.height = htmlHeight;

        let context = canvasElement.getContext('2d');
        let aspectScaleStage = () => {
            let scale = Math.min(window.innerWidth / htmlWidth, window.innerHeight / htmlHeight);
            canvasElement.width = htmlWidth * scale;
            canvasElement.height = htmlHeight * scale;
            canvasElement.style.position = 'absolute';
            canvasElement.style.left = ((window.innerWidth - canvasElement.width) * 0.5) + 'px';
            canvasElement.style.top = ((window.innerHeight - canvasElement.height) * 0.5) + 'px';
            context.imageSmoothingEnabled = false;
            context.mozImageSmoothingEnabled = false;
        };
        window.addEventListener('resize', aspectScaleStage, false);
        aspectScaleStage();
        /** @private */
        stage.canvasElement = canvasElement;
        /** @private */
        stage.canvasContext = context;
    }

    /**
     * reference to the HTML5 canvas DOM element used by the Stage
     * @type {HTMLCanvasElement}
     */
    get canvas() {
        return this.canvasElement;
    }

    /**
     * reference to the 2D rendering context for the drawing surface of the {@link Stage#canvas}
     * @type {CanvasRenderingContext2D}
     */
    get context() {
        return this.canvasContext;
    }
}
