import { LaceElement } from "../laceElement";
import { SlRange, SlInput } from '@shoelace-style/shoelace';

/**
 * Configuration options for a `SliderElement`.
 * 
 * @property help - Optional help text to display with the slider.
 * @property min - Minimum value for the slider.
 * @property max - Maximum value for the slider.
 * @property step - Step value for the slider.
 */
interface SliderOptions {
    help?: string;
    min?: number;
    max?: number;
    step?: number;
}

/**
 * A slider element that allows the user to select a numeric value from a range.
 * 
 * @extends LaceElement
 */
export class SliderElement extends LaceElement{
    private obj: any;
    private key: string;
    private range: SlRange;
    private input: SlInput;

    /**
     * Creates a new `SliderElement` instance.
     * 
     * @param label - The label for the slider element.
     * @param obj - The object containing the numeric value.
     * @param key - The key of the numeric value in the object.
     * @param options - Optional configuration for the slider element.
     */
    constructor(label: string, obj: any, key: string, options: SliderOptions = {}) {
        const {help = "", min = 0, max = 100, step = 1} = options;
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.flexDirection = 'row';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'space-between';

        const range: SlRange = document.createElement('sl-range');
        range.label = label;
        range.helpText = help;
        range.min = min;
        range.max = max;
        range.step = step;
        range.value = obj[key];

        const input: SlInput = document.createElement('sl-input');
        input.type = 'number';
        input.min = min;
        input.max = max;
        input.step = step;
        input.value = obj[key];

        range.addEventListener('sl-input', () => {
            obj[key] = range.value;
            input.value = range.value.toString();
            this.changed();
        });

        input.addEventListener('sl-input', () => {
            obj[key] = parseFloat(input.value);
            range.value = parseFloat(input.value);
            this.changed();
        });

        range.style.width = '60%';
        range.style.marginRight = '1em';
        input.style.width = '40%';

        div.appendChild(range);
        div.appendChild(input);

        super(label, div);

        this.obj = obj;
        this.key = key;
        this.range = range;
        this.input = input;
    }

    getObj() {
        return this.obj;
    }

    getKeys(){
        return [this.key];
    }

    update(){
        this.range.value = this.obj[this.key];
        this.input.value = this.obj[this.key].toString();
    }

    setSize(size: "small" | "medium" | "large"): void {
        this.input.size = size;
        if(size === "small") this.range.classList.add('small');
        this.range.style.setProperty('--thumb-size', size === 'small' ? '15px' : size === 'medium' ? '20px' : '25px');
        this.range.style.setProperty('--track-height', size === 'small' ? '5px' : size === 'medium' ? '6px' : '7px');
    }

    setMin(min: number): void {
        this.range.min = min;
        this.input.min = min;
    }

    setMax(max: number): void {
        this.range.max = max;
        this.input.max = max;
    }
}