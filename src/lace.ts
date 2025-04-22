import { LaceElement } from "./laceElement";
import { FolderElement, FolderOptions } from "./elements/folderElement";
import { GroupElement, GroupOptions } from "./elements/groupElement";
import { TabElement, TabOptions } from "./elements/tabElement";

/**
 * Represents the configuration options for a lace component.
 *
 * @property darkMode - Optional, default: `false`. Enables dark mode styling for the components.
 * @property small - Optional, default: `true`. Renders the component in a smaller and more compact size.
 */
interface LaceOptions {
    darkMode?: boolean;
    small?: boolean;
}

/**
 * The main container for lacery.js elements.
 * 
 * Provides functionality to add, hide, show elements.
 */
export class Lace{
    private container: HTMLElement;
    private elements: LaceElement[] = [];
    private brs: Map<LaceElement, HTMLElement> = new Map();
    private small: boolean;

    /**
     * Creates a new `Lace` instance.
     * 
     * @param container - The HTML container element where the Lace UI will be rendered.
     * @param options - Optional configuration for the Lace instance.
     */
    constructor(container: HTMLElement, options: LaceOptions = {}){
        const {darkMode = false, small = true} = options;
        this.small = small;
        const div = document.createElement('div');
        div.className = 'lace';
        div.style.padding = '1em';
        div.style.border = 'solid 1px var(--sl-color-neutral-300)';
        div.style.borderRadius = 'var(--sl-border-radius-small)';
        div.style.backgroundColor = 'var(--sl-color-neutral-0)';
        div.style.height = '100%';
        div.style.overflow = 'auto';
        div.style.color = 'var(--sl-input-color) !important';
        div.style.fontFamily = 'var(--sl-font-sans)'

        if(darkMode){
            div.classList.add('sl-theme-dark');
        }

        container.appendChild(div);

        this.container = div;

        this.injectStyles();
    }

    /**
     * Adds a `LaceElement` object.
     * 
     * @param element - The `LaceElement` to add.
     */
    public add(element: LaceElement){
        element.setSize(this.small ? 'small' : 'medium');

        this.connect(element);

        const br = document.createElement('br');
        this.elements.push(element);
        this.brs.set(element, br);
        this.container.appendChild(element.element);
        this.container.appendChild(br);
    }

    /**
     * Adds a folder element.
     * 
     * @param label - The label for the folder.
     * @param options - Optional configuration for the folder.
     * @returns The created `FolderElement`.
     */
    public addFolder(label: string, options: FolderOptions = {}): FolderElement {
        const folder = new FolderElement(label, this, options);
        this.add(folder);
        return folder;
    }

    /**
     * Adds a group element.
     * 
     * @param options - Optional configuration for the group.
     * @returns The created `GroupElement`.
     */
    public addGroup(options: GroupOptions = {}): GroupElement {
        const group = new GroupElement(this, options);
        this.add(group);
        return group;
    }

    /**
     * Adds a tab element.
     * 
     * @param options - Optional configuration for the tab.
     * @returns The created `TabElement`.
     */
    public addTab(options: TabOptions = {}): TabElement {
        const tab = new TabElement(this, options);
        this.add(tab);
        return tab;
    }

    /**
     * Hides a specific `LaceElement` object.
     * 
     * @param element - The `LaceElement` to hide.
     */
    public hide(element: LaceElement): void {
        if(!this.elements.includes(element)) return;
        if(element.element.dataset.display === undefined) element.element.dataset.display = element.element.style.display;
        element.element.style.display = 'none';
        const br = this.brs.get(element);
        if(br) br.style.display = 'none';
    }

    /**
     * Hides all `LaceElement` objects.
     */
    public hideAll(): void {
        for(const element of this.elements){
            this.hide(element);
        }
    }

    /**
     * Shows a specific `LaceElement` object.
     * 
     * @param element - The `LaceElement` to show.
     */
    public show(element: LaceElement): void {
        if(!this.elements.includes(element)) return;
        element.element.style.display = element.element.dataset.display || '';
        const br = this.brs.get(element);
        if(br) br.style.display = '';
    }

    /**
     * Shows all `LaceElement` objects.
     */
    public showAll(): void {
        for(const element of this.elements){
            this.show(element);
        }
    }

    /**
     * Connects a `LaceElement` to other elements with the same object and keys.
     * Synchronizes updates between connected elements.
     * 
     * @remarks
     * This method is primarily intended for internal use within the `Lace` class
     * to manage synchronization between elements. While it is publicly accessible,
     * it is not typically used directly by external consumers of the API.
     * 
     * @param element - The `LaceElement` to connect.
     * 
     * @internal
     */
    public connect(element: LaceElement): void {
        if(element instanceof FolderElement) return;
        if(element instanceof GroupElement) return;

        const sameKeyElements = this.findSameObjectAndKeyElements(element);
        for(const sameKeyElement of sameKeyElements){
            sameKeyElement.registerUpdateCallback(() => element.update());
            element.registerUpdateCallback(() => sameKeyElement.update());
        }
    }
    
    /**
     * Disconnects a `LaceElement` from other elements with the same object and keys.
     * 
     * @remarks
     * This method is primarily intended for internal use within the `Lace` class
     * to manage synchronization between elements. While it is publicly accessible,
     * it is not typically used directly by external consumers of the API.
     * 
     * @param element - The `LaceElement` to disconnect.
     * 
     * @internal
     */
    public disconnect(element: LaceElement): void {
        if(element instanceof FolderElement) return;
        if(element instanceof GroupElement) return;

        const sameKeyElements = this.findSameObjectAndKeyElements(element);
        for(const sameKeyElement of sameKeyElements){
            sameKeyElement.deregisterUpdateCallback(() => element.update());
            element.deregisterUpdateCallback(() => sameKeyElement.update());
        }
    }

    /**
     * Finds elements with the same object and keys as the provided element.
     * 
     * @param element - The `LaceElement` to compare against.
     * @returns An array of `LaceElement` objects that match the criteria.
     */
    private findSameObjectAndKeyElements(element: LaceElement): LaceElement[]{
        var foundElements: LaceElement[] = [];

        var workingElements = this.elements.slice();
        while(workingElements.length > 0){
            const currentElement = workingElements.shift();
            if(currentElement === undefined) break;

            if(currentElement instanceof FolderElement){
                workingElements.push(...currentElement.getElements());
            }
            else{
                if(element.getObj() === currentElement.getObj()){
                    const keys = element.getKeys();
                    for(const key of keys){
                        if(currentElement.getKeys().includes(key)){
                            foundElements.push(currentElement);
                        }
                    }
                }
            }
        }

        return foundElements;
    }

    /**
     * Injects styles for some Lace elements into the document head.

     */
    private injectStyles(): void {
        if(document.getElementById('lacery-style')) return;

        const style = document.createElement('style');
        style.id = 'lacery-style';
        style.textContent = `
            .tab-panel::part(base){
                padding-left: 0.5rem;
            }

            .small::part(form-control-label){
                font-size: var(--sl-input-label-font-size-small);
            }
        `;
        document.head.appendChild(style);
    }
}