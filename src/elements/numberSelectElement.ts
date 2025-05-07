import { LaceElement } from "../laceElement";
import { SlSelect, SlOption } from '@shoelace-style/shoelace';

/**
 * Configuration options for a `NumberSelectElement`.
 * 
 * @property help - Optional help text to display with the select element.
 * @property previews - Optional array of preview image srcs to display.
 * @property previewSize - Optional size of the preview images in pixel.
 */
interface NumberSelectOptions {
    help?: string;
    previews? : string[];
    previewSize?: number;
}

/**
 * A select element that allows the user to choose a number from a predefined set of options.
 * 
 * @extends LaceElement
 */
export class NumberSelectElement extends LaceElement{
    private obj: any;
    private key: string;
    private select: SlSelect;

    /**
     * Creates a new `NumberSelectElement` instance.
     * 
     * @param label - The label for the select element.
     * @param obj - The object containing the numeric value.
     * @param key - The key of the numeric value in the object.
     * @param selectOptions - An object mapping option values to their display text.
     * @param options - Optional configuration for the number select element.
     */
    constructor(label: string, obj: any, key: string, selectOptions: { [key: number]: string } , options: NumberSelectOptions = {}) {
        const {help = "", previews = [], previewSize = 40} = options;
        if(!selectOptions[obj[key]]) selectOptions[obj[key]] = "Original";
        const select: SlSelect = document.createElement('sl-select');
        select.label = label;
        select.helpText = help;
        select.placeholder = '-';

        var index = 0;
        const showPreviews = previews.length > 0 && previews.length == Object.keys(selectOptions).length;
        if(!showPreviews) console.warn("Previews are not shown because the number of previews does not match the number of options.");

        for(const key in selectOptions){
            const option: SlOption = document.createElement('sl-option');
            option.value = key.toString();
            option.appendChild(document.createTextNode(selectOptions[key]));

            // Add preview images if provided
            if(showPreviews) {
                const img = document.createElement('img');
                img.src = previews[index];
                img.style.width = `${previewSize}px`;
                img.style.height = `${previewSize}px`;
                img.slot = "prefix";
                option.appendChild(img);
                index++;
            }

            select.appendChild(option);
        }

        select.defaultValue = obj[key].toString();

        select.addEventListener('sl-input', () => {
            obj[key] = select.value;
            this.changed();
        });

        super(label, select);

        this.obj = obj;
        this.key = key;
        this.select = select;
    }

    getObj(): any {
        return this.obj;
    }

    getKeys(): string[] {
        return [this.key];
    }

    update(): void {
        this.select.value = this.obj[this.key].toString();
    }

    setSize(size: "small" | "medium" | "large"): void {
        this.select.size = size;
    }
}