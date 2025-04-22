import { LaceElement } from "../laceElement";
import { SlDivider } from '@shoelace-style/shoelace';

/**
 * Configuration options for a `SeperatorElement`.
 * 
 * @property width - Optional width of the separator in pixels.
 */
interface SeperatorOptions {
    width?: number;
}

/**
 * A separator element that visually divides sections of a UI.
 * 
 * @extends LaceElement
 */
export class SeperatorElement extends LaceElement{

    /**
     * Creates a new `SeperatorElement` instance.
     * 
     * @param options - Optional configuration for the separator element.
     */
    constructor(options: SeperatorOptions = {}) {
        const { width = 1 } = options;
        const divider: SlDivider = document.createElement('sl-divider');
        divider.style.setProperty('--width', `${width}px`);

        super("laceSeperator", divider);
    }

    getObj(): any { return null; }

    getKeys(): string[] { return []; }

    update(): void {}

    setSize(size: "small" | "medium" | "large"): void {}
}