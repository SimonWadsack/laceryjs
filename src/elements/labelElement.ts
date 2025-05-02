import { LaceElement } from "../laceElement";
import { SlDivider } from '@shoelace-style/shoelace';

/**
 * Configuration options for a `LabelElement`.
 * 
 * @property block - Optional flag to display the label as a block element.
 * @property newLine - Optional flag to add a new line after the label.
 * @property bold - Optional flag to make the label text bold.
 * @property italic - Optional flag to make the label text italic.
 */
interface LabelOptions {
    block?: boolean;
    newLine?: boolean;
    bold?: boolean;
    italic?: boolean;
}

/**
 * A label element that can be used to display text.
 * 
 * @extends LaceElement
 */
export class LabelElement extends LaceElement{
    
    /**
     * Creates a new `LabelElement` instance.
     * 
     * @param text - The text to display in the label.
     * @param options - Optional configuration for the label element.
     */
    constructor(text: string, options: LabelOptions = {}) {
        const { block = false, newLine = true, bold = false, italic = false } = options;
        const span: HTMLSpanElement = document.createElement('span');
        span.style.fontSize = "var(--sl-input-label-font-size-small)";
        span.style.fontWeight = bold ? "bold" : "normal";
        span.style.fontStyle = italic ? "italic" : "normal";
        span.innerHTML = text;
        span.innerHTML = block ? "<div style='text-align: justify'>" + span.innerHTML + "</div>" : span.innerHTML;
        span.innerHTML += newLine ? "<br>" : "";

        super("laceLabel", span);
    }

    getObj(): any { return null; }

    getKeys(): string[] { return []; }

    update(): void {}

    setSize(size: "small" | "medium" | "large"): void {}
}