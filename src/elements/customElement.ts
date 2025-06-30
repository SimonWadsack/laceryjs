import { LaceElement } from "../laceElement";

/**
 * A custom element that can show any HTML element.
 * 
 * @extends LaceElement
 */
export class CustomElement extends LaceElement {

    /**
     * Creates a new `CustomElement` instance.
     * 
     * @param element - The HTML element to be used as the custom element.
     */
    constructor(element: HTMLElement) {
        super("laceCustom", element);
    }

    getObj(): any { return null; }

    getKeys(): string[] { return []; }

    update(): void {}

    setSize(size: "small" | "medium" | "large"): void {}
}