import { LaceElement } from "../laceElement";
import { SlColorPicker } from '@shoelace-style/shoelace';

/**
 * Configuration options for a `ColorElement`.
 */
interface ColorOptions {
}

/**
 * A color picker element that allows the user to select a color value.
 * 
 * @extends LaceElement
 */
export class ColorElement extends LaceElement{
    private obj: any;
    private key: string;
    private colorPicker: SlColorPicker;
    private labelElement: HTMLLabelElement;

    /**
     * Creates a new `ColorElement` instance.
     * 
     * @param label - The label for the element.
     * @param obj - The object containing the color value.
     * @param key - The key of the color value in the object.
     * @param options - Optional configuration for the color element.
     */
    constructor(label: string, obj: any, key: string, options: ColorOptions = {}) {
        const {} = options;
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.flexDirection = 'row';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'space-between';

        const colorPicker: SlColorPicker = document.createElement('sl-color-picker');
        colorPicker.format = 'rgb';
        colorPicker.noFormatToggle = true;
        colorPicker.swatches = ["#27ae60", "#2980b9", "#8e44ad", "#16a085", "#f39c12", "#d35400", "#c0392b", "#7f8c8d"];
        colorPicker.value = obj[key];
        colorPicker.addEventListener('sl-input', () => {
            obj[key] = colorPicker.value;
            this.changed();
        });

        const labelElement: HTMLLabelElement = document.createElement('label');
        labelElement.innerHTML = label;

        div.appendChild(labelElement);
        div.appendChild(colorPicker);

        super(label, div);

        this.obj = obj;
        this.key = key;
        this.colorPicker = colorPicker;
        this.labelElement = labelElement;
    }

    getObj(): any {
        return this.obj;
    }

    getKeys(): string[] {
        return [this.key];
    }

    update(): void {
        this.colorPicker.value = this.obj[this.key];
    }

    setSize(size: "small" | "medium" | "large"): void {
        this.colorPicker.size = size;
        this.labelElement.style.fontSize = size === 'small' ? 'var(--sl-input-label-font-size-small)' : size === 'medium' ? 'var(--sl-input-label-font-size-medium)' : 'var(--sl-input-label-font-size-large)';
    }
}