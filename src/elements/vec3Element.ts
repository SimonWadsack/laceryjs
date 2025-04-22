import { LaceElement } from "../laceElement";
import { SlInput } from '@shoelace-style/shoelace';

/**
 * Configuration options for a `Vec3Element`.
 * 
 * @property help - Optional help text to display with the input.
 * @property xStep - Step value for the x input.
 * @property yStep - Step value for the y input.
 * @property zStep - Step value for the z input.
 */
interface Vec3Options {
    help?: string;
    xStep?: number;
    yStep?: number;
    zStep?: number;
}

/**
 * A vector 3D input element that can be used to display and edit numeric values.
 * 
 * @extends LaceElement
 */
export class Vec3Element extends LaceElement{
    private obj: any;
    private xKey: string;
    private yKey: string;
    private zKey: string;
    private xInput: SlInput;
    private yInput: SlInput;
    private zInput: SlInput;

    /**
     * Creates a new `Vec3Element` instance.
     * 
     * @param label - The label for the element.
     * @param obj - The object containing the numeric values.
     * @param xKey - The key of the x value in the object.
     * @param yKey - The key of the y value in the object.
     * @param zKey - The key of the z value in the object.
     * @param options - Optional configuration for the vector 3D element.
     */
    constructor(label: string, obj: any, xKey: string, yKey: string, zKey: string, options: Vec3Options = {}) {
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

        const zInput: SlInput = document.createElement('sl-input');
        zInput.type = 'number';
        zInput.label = " ";
        zInput.step = yStep;
        zInput.value = obj[zKey];

        xInput.addEventListener('sl-input', () => {
            obj[xKey] = isNaN(parseFloat(xInput.value)) ? 0 : parseFloat(xInput.value);
            this.changed();
        });

        yInput.addEventListener('sl-input', () => {
            obj[yKey] = isNaN(parseFloat(yInput.value)) ? 0 : parseFloat(yInput.value);
            this.changed();
        });

        zInput.addEventListener('sl-input', () => {
            obj[zKey] = isNaN(parseFloat(zInput.value)) ? 0 : parseFloat(zInput.value);
            this.changed();
        });

        xInput.style.width = '30%';
        yInput.style.width = '30%';
        zInput.style.width = '30%';

        div.appendChild(xInput);
        div.appendChild(yInput);
        div.appendChild(zInput);

        super(label, div);

        this.obj = obj;
        this.xKey = xKey;
        this.yKey = yKey;
        this.zKey = zKey;
        this.xInput = xInput;
        this.yInput = yInput;
        this.zInput = zInput;
    }

    getObj(): any{
        return this.obj;
    }

    getKeys(): string[]{
        return [this.xKey, this.yKey, this.zKey];
    }

    update(){
        this.xInput.value = this.obj[this.xKey];
        this.yInput.value = this.obj[this.yKey];
        this.zInput.value = this.obj[this.zKey];
    }

    setSize(size: "small" | "medium" | "large"): void {
        this.xInput.size = size;
        this.yInput.size = size;
        this.zInput.size = size;
    }
}