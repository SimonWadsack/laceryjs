import { LaceElement } from "../laceElement";
import { SlCheckbox } from '@shoelace-style/shoelace';

/**
 * Configuration options for a `BooleanElement`.
 * 
 * @property help - Optional help text for the checkbox.
 */
interface BooleanOptions {
    help?: string;
}

/**
 * A checkbox element that allows the user to toggle a boolean value.
 * 
 * @extends LaceElement
 */
export class BooleanElement extends LaceElement{
    private obj: any;
    private key: string;
    private checkbox: SlCheckbox;

    /**
     * Creates a new `BooleanElement` instance.
     * 
     * @param label - The label for the element.
     * @param obj - The object containing the boolean value.
     * @param key - The key of the boolean value in the object.
     * @param options - Optional configuration for the boolean element.
     */
    constructor(label: string, obj: any, key: string, options: BooleanOptions = {}) {
        const {help = ""} = options;
        const checkbox: SlCheckbox = document.createElement('sl-checkbox');
        checkbox.style.display = "block";
        checkbox.textContent = label;
        checkbox.helpText = help;
        checkbox.checked = obj[key];
        checkbox.addEventListener('sl-change', () => {
            obj[key] = checkbox.checked;
            this.changed();
        });

        super(label, checkbox);

        this.obj = obj;
        this.key = key;
        this.checkbox = checkbox;
    }

    getObj(): any {
        return this.obj;
    }

    getKeys(): string[]{
        return [this.key];
    }

    update(): void {
        this.checkbox.checked = this.obj[this.key];
    }

    setSize(size: "small" | "medium" | "large"): void {
        this.checkbox.size = size;
    }
}