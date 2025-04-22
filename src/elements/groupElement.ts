import { Lace } from "../lace";
import { LaceElement } from "../laceElement";
import { FolderElement, FolderOptions } from "./folderElement";

/**
 * Configuration options for a `GroupElement`.
 * 
 * @property small - Optional flag to use small size for the group element.
 */
export interface GroupOptions {
    small?: boolean;
}

/**
 * A group element that can contain other elements.
 * 
 * @extends LaceElement
 */
export class GroupElement extends LaceElement{
    private container: HTMLElement;
    private lace: Lace;
    private elements: LaceElement[] = [];
    private brs: Map<LaceElement, HTMLElement> = new Map();
    private small: boolean;

    constructor(lace: Lace, options: GroupOptions = {}) {
        const {small = true} = options;
        const div = document.createElement('div');
        div.style.color = 'var(--sl-input-color) !important';

        super("laceGroup", div);

        this.container = div;
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

        element.registerUpdateCallback(() => { this.changed(); });

        if(this.elements.length > 0){
            const br = document.createElement('br');
            this.brs.set(element, br);
            this.container.appendChild(br);
        }
        
        this.elements.push(element);
        this.container.appendChild(element.element);
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
     * Resets the group element, removing all child elements and clearing the internal state.
     * 
     * @warning This method will remove all child elements and clear the internal state of the group element.
     * This action cannot be undone. Use with caution.
     */
    reset(): void {
        this.elements.forEach(element => {
            this.lace.disconnect(element);
        });
        this.container.innerHTML = '';
        this.elements = [];
        this.brs.clear();
    }

    /**
     * Hides a specific `LaceElement` object.
     * 
     * @param element - The `LaceElement` to hide.
     */
    hide(element: LaceElement): void {
        if(!this.elements.includes(element)) return;
        if(element.element.dataset.display === undefined) element.element.dataset.display = element.element.style.display;
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