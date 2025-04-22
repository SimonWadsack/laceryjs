import { LaceElement } from "../laceElement";
import { SlInput } from '@shoelace-style/shoelace';

/**
 * Configuration options for a `Vec2Element`.
 * 
 * @property help - Optional help text to display with the input.
 * @property xStep - Step value for the x input.
 * @property yStep - Step value for the y input.
 */
interface Vec2Options {
    help?: string;
    xStep?: number;
    yStep?: number;
}

/**
 * A vector 2D input element that can be used to display and edit numeric values.
 * 
 * @extends LaceElement
 */
export class Vec2Element extends LaceElement{
    private obj: any;
    private xKey: string;
    private yKey: string;
    private xInput: SlInput;
    private yInput: SlInput;

    /**
     * Creates a new `Vec2Element` instance.
     * 
     * @param label - The label for the element.
     * @param obj - The object containing the numeric values.
     * @param xKey - The key of the x value in the object.
     * @param yKey - The key of the y value in the object.
     * @param options - Optional configuration for the vector 2D element.
     */
    constructor(label: string, obj: any, xKey: string, yKey: string, options: Vec2Options = {}) {
        const {help = "", xStep = 1, yStep = 1} = options;

        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.flexDirection = 'row';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'space-between';

        const xInput: SlInput = document.createElement('sl-input');
        xInput.type = 'number';
        xInput.label = label;
        xInput.helpText = help;
        xInput.step = xStep;
        xInput.value = obj[xKey];

        const yInput: SlInput = document.createElement('sl-input');
        yInput.type = 'number';
        yInput.label = " ";
        yInput.step = yStep;
        yInput.value = obj[yKey];

        xInput.addEventListener('sl-input', () => {
            obj[xKey] = isNaN(parseFloat(xInput.value)) ? 0 : parseFloat(xInput.value);
            this.changed();
        });

        yInput.addEventListener('sl-input', () => {
            obj[yKey] = isNaN(parseFloat(yInput.value)) ? 0 : parseFloat(yInput.value);
            this.changed();
        });

        xInput.style.width = '45%';
        //xInput.style.marginRight = '1em';
        yInput.style.width = '45%';

        div.appendChild(xInput);
        div.appendChild(yInput);

        super(label, div);

        this.obj = obj;
        this.xKey = xKey;
        this.yKey = yKey;
        this.xInput = xInput;
        this.yInput = yInput;
    }

    getObj(): any{
        return this.obj;
    }

    getKeys(): string[]{
        return [this.xKey, this.yKey];
    }

    update(){
        this.xInput.value = this.obj[this.xKey];
        this.yInput.value = this.obj[this.yKey];
    }

    setSize(size: "small" | "medium" | "large"): void {
        this.xInput.size = size;
        this.yInput.size = size;
    }
}