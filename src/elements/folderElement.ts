import { Lace } from "../lace";
import { LaceElement } from "../laceElement";
import { GroupElement, GroupOptions } from "./groupElement";
import { SlDetails } from "@shoelace-style/shoelace";

/**
 * Configuration options for a `FolderElement`.
 * 
 * @property darkMode - Optional flag to enable dark mode styling.
 * @property small - Optional flag to use small size for the folder element.
 * @property open - Optional flag to set the folder as open by default.
 */
export interface FolderOptions {
    darkMode?: boolean;
    small?: boolean;
    open?: boolean;
}

/**
 * A folder element that can contain other elements.
 * 
 * @extends LaceElement
 */
export class FolderElement extends LaceElement{
    private details: SlDetails;
    private lace: Lace;
    private elements: LaceElement[] = [];
    private brs: Map<LaceElement, HTMLElement> = new Map();
    private small: boolean;

    constructor(label: string, lace: Lace, options: FolderOptions = {}) {
        const {darkMode = false, small = true, open = true} = options;
        const details: SlDetails = document.createElement('sl-details');
        details.summary = label;
        details.open = open;
        details.style.color = 'var(--sl-input-color) !important';

        if(darkMode){
            details.classList.add('sl-theme-dark');
        }

        super(label, details);

        this.details = details;
        this.lace = lace;
        this.small = small;
    }

    /**
     * Adds a `LaceElement` object.
     * 
     * @param element - The `LaceElement` to add.
     */
    add(element: LaceElement): void {
        element.setSize(this.small ? 'small' : 'medium');

        this.lace.connect(element);

        const br = document.createElement('br');
        this.elements.push(element);
        this.brs.set(element, br);
        this.details.appendChild(element.element);
        this.details.appendChild(br);
    }

    /**
     * Adds a folder element.
     * 
     * @param label - The label for the folder.
     * @param options - Optional configuration for the folder.
     * @returns The created `FolderElement`.
     */
    addFolder(label: string, options: FolderOptions = {}): FolderElement {
        const folder = new FolderElement(label, this.lace, options);
        this.add(folder);
        return folder;
    }

    /**
     * Adds a group element.
     * 
     * @param options - Optional configuration for the group.
     * @returns The created `GroupElement`.
     */
    addGroup(options: GroupOptions = {}): GroupElement{
        const group = new GroupElement(this.lace, options);
        this.add(group);
        return group;
    }

    /**
     * Hides a specific `LaceElement` object.
     * 
     * @param element - The `LaceElement` to hide.
     */
    hide(element: LaceElement): void {
        if(!this.elements.includes(element)) return;
        if(element.element.dataset.display ===  undefined) element.element.dataset.display = element.element.style.display;
        element.element.style.display = 'none';
        const br = this.brs.get(element);
        if(br) br.style.display = 'none';
    }

    /**
     * Shows a specific `LaceElement` object.
     * 
     * @param element - The `LaceElement` to show.
     */
    show(element: LaceElement): void {
        if(!this.elements.includes(element)) return;
        element.element.style.display = element.element.dataset.display || '';
        const br = this.brs.get(element);
        if(br) br.style.display = '';
    }

    getElements(): LaceElement[] {
        return this.elements;
    }

    getObj(): any { return null; }

    getKeys(): string[] { return []; }

    update(): void {
        this.elements.forEach(element => element.update());
    }

    setSize(size: "small" | "medium" | "large"): void {}
}