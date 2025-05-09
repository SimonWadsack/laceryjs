import { LaceElement } from "../laceElement";
import { SlButton, SlDropdown, SlMenu, SlMenuItem } from '@shoelace-style/shoelace';

/**
 * Configuration options for a `ButtonSelectElement`.
 * 
 * @property variant - The variant of the button. Can be "default", "primary", "success", "neutral", "warning", or "danger".
 * @property outline - Optional flag to display the button as an outline button.
 * @property pill - Optional flag to display the button as a pill button.
 * @property previews - Optional array of preview image srcs to display.
 * @property previewSize - Optional size of the preview images in pixel.
 */
interface ButtonSelectOptions {
    variant?: "default" | "primary" | "success" | "neutral" | "warning" | "danger";
    outline?: boolean;
    pill?: boolean;
    previews? : string[];
    previewSize?: number;
}

/**
 * A select element that allows the user to click a button from a predefined set of options.
 * 
 * @extends LaceElement
 */
export class ButtonSelectElement extends LaceElement{
    private button: SlButton;

    /**
     * Creates a new `ButtonSelectElement` instance.
     * 
     * @param label - The label for the select element.
     * @param selectOptions - An object mapping option values to their display text.
     * @param onClick - The function to be called when one of the options is selected. The selected key is passed as an argument.
     * @param options - Optional configuration for the number select element.
     */
    constructor(label: string, selectOptions: { [key: string]: string }, onClick: (key: string) => void, options: ButtonSelectOptions = {}) {
        const { variant = 'default', outline = true, pill = false, previews = [], previewSize = 40} = options;

        const dropdown: SlDropdown = document.createElement('sl-dropdown');
        dropdown.style.width = '100%';
        dropdown.style.paddingBottom = '1rem'

        const button: SlButton = document.createElement('sl-button');
        button.slot = "trigger";
        button.caret = true;
        button.variant = variant;
        button.outline = outline;
        button.pill = pill;
        button.style.width = '100%';
        button.appendChild(document.createTextNode(label));
        dropdown.appendChild(button);

        const menu: SlMenu = document.createElement('sl-menu');
        dropdown.appendChild(menu);

        var index = 0;
        const showPreviews = previews.length > 0 && previews.length == Object.keys(selectOptions).length;
        if(!showPreviews) console.warn("Previews are not shown because the number of previews does not match the number of options.");

        for(const key in selectOptions){
            const item: SlMenuItem = document.createElement('sl-menu-item');
            item.value = key;
            item.classList.add('lacery-menu-item');
            item.appendChild(document.createTextNode(selectOptions[key]));

            // Add preview images if provided
            if(showPreviews) {
                const img = document.createElement('img');
                img.src = previews[index];
                img.style.width = `${previewSize}px`;
                img.style.height = `${previewSize}px`;
                img.slot = "prefix";
                item.appendChild(img);
                index++;
            }

            menu.appendChild(item);
        }

        menu.addEventListener('sl-select', (event: CustomEvent) => {
            const selectedItem = event.detail.item as SlMenuItem;
            const selectedKey = selectedItem.value;
            onClick(selectedKey);
        });

        super(label, dropdown);

        this.button = button;
    }

    getObj(): any { return null; }

    getKeys(): string[] { return []; }

    update(): void {}

    setSize(size: "small" | "medium" | "large"): void {
        this.button.size = size;
    }
}