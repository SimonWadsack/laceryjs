import { LaceElement } from "../laceElement";
import { SlInput } from '@shoelace-style/shoelace';

/**
 * Configuration options for a `NumberElement`.
 * 
 * @property help - Optional help text to display with the input.
 * @property step - Optional step value for the input.
 */
interface NumberOptions {
    help?: string;
    step?: number;
}

/**
 * A number input element that can be used to display and edit numeric values.
 * 
 * @extends LaceElement
 */
export class NumberElement extends LaceElement{
    private obj: any;
    private key: string;
    private input: SlInput;

    /**
     * Creates a new `NumberElement` instance.
     * 
     * @param label - The label for the element.
     * @param obj - The object containing the numeric value.
     * @param key - The key of the numeric value in the object.
     * @param options - Optional configuration for the number element.
     */
    constructor(label: string, obj: any, key: string, options: NumberOptions = {}) {
        const {help = "", step = 1} = options;
        const input: SlInput = document.createElement('sl-input');
        input.label = label;
        input.step = step;
        input.helpText = help;
        input.type = 'number';
        input.value = obj[key];
        input.addEventListener('sl-input', () => {
            obj[key] = isNaN(parseFloat(input.value)) ? 0 : parseFloat(input.value);
            this.changed();
        });

        super(label, input);

        this.obj = obj;
        this.key = key;
        this.input = input;
    }

    getObj(): any {
        return this.obj;
    }

    getKeys(): string[] {
        return [this.key];
    }

    update(): void {
        this.input.value = this.obj[this.key];
    }

    setSize(size: "small" | "medium" | "large"): void {
        this.input.size = size;
    }
}