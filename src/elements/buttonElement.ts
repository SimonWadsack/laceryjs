import { LaceElement } from "../laceElement";
import { SlButton } from '@shoelace-style/shoelace';

/**
 * Configuration options for a `ButtonElement`.
 * 
 * @property variant - The variant of the button. Can be "default", "primary", "success", "neutral", "warning", or "danger".
 * @property outline - Optional flag to display the button as an outline button.
 * @property pill - Optional flag to display the button as a pill button.
 * @property prefixIcon - Optional icon to be displayed before the button label.
 * @property suffixIcon - Optional icon to be displayed after the button label.
 * @property iconLibrary - Optional icon library to be used for the icons.
 */
interface ButtonOptions {
    variant?: "default" | "primary" | "success" | "neutral" | "warning" | "danger";
    outline?: boolean;
    pill?: boolean;
    prefixIcon?: string;
    suffixIcon?: string;
    iconLibrary?: string;
}

/**
 * A button element that can be used to trigger actions or events.
 * 
 * @extends LaceElement
 */
export class ButtonElement extends LaceElement{
    private button: SlButton;

    /**
     * Creates a new `SeperatorElement` instance.
     * 
     * @param label - The label of the button.
     * @param onClick - The function to be called when the button is clicked.
     * @param options - Optional configuration options for the button.
     */
    constructor(label: string, onClick: () => void, options: ButtonOptions = {}) {
        const { variant = "default", outline = false, pill = false, prefixIcon = "", suffixIcon = "", iconLibrary = "" } = options;
        const newButton: SlButton = document.createElement('sl-button');
        
        newButton.onclick = onClick;

        newButton.variant = variant;
        newButton.outline = outline;
        newButton.pill = pill;
        newButton.style.width = "100%";
        newButton.style.display = "block";

        if(prefixIcon !== ""){
            const prefixIconElement = document.createElement('sl-icon');
            prefixIconElement.name = prefixIcon;
            prefixIconElement.library = iconLibrary;
            prefixIconElement.slot = "prefix";
            newButton.appendChild(prefixIconElement);
        }

        const labelElement = document.createTextNode(label);
        newButton.appendChild(labelElement);

        if (suffixIcon !== "") {
            const suffixIconElement = document.createElement('sl-icon');
            suffixIconElement.name = suffixIcon;
            suffixIconElement.library = iconLibrary;
            suffixIconElement.slot = "suffix";
            newButton.appendChild(suffixIconElement);
        }

        super(label, newButton);

        this.button = newButton;
    }

    /**
     * Sets if the button should be loading or not. This disables the button and shows a loading spinner.
     * 
     * @param loading - If true, the button will show a loading spinner and be disabled.
     */
    public setLoading(loading: boolean): void {
        this.button.loading = loading;
    }

    /**
     * Sets if the button should be disabled or not. This disables the button and makes it unclickable.
     * 
     * @param disabled - If true, the button will be disabled and not clickable.
     */
    public setDisabled(disabled: boolean): void {
        this.button.disabled = disabled;
    }

    getObj(): any { return null; }

    getKeys(): string[] { return []; }

    update(): void {}

    setSize(size: "small" | "medium" | "large"): void {
        this.button.size = size;
    }
}