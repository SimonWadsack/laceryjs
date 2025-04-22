import { LaceElement } from "../laceElement";
import { SlInput } from '@shoelace-style/shoelace';

/**
 * Configuration options for a `NumberElement`.
 * 
 * @property help - Optional help text to display with the input.
 */
interface TextOptions {
    help?: string;
}

/**
 * A text input element that can be used to display and edit string values.
 * 
 * @extends LaceElement
 */
export class TextElement extends LaceElement{
    private obj: any;
    private key: string;
    private input: SlInput;

    /**
     * Creates a new `TextElement` instance.
     * 
     * @param label - The label for the element.
     * @param obj - The object containing the string value.
     * @param key - The key of the string value in the object.
     * @param options - Optional configuration for the text element.
     */
    constructor(label: string, obj: any, key: string, options: TextOptions = {}) {
        const {help = ""} = options;
        const input: SlInput = document.createElement('sl-input');
        input.label = label;
        input.helpText = help;
        input.type = 'text';
        input.autocomplete = 'off';
        input.value = obj[key];
        input.addEventListener('sl-input', () => {
            obj[key] = input.value;
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