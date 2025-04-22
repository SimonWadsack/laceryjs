import { SlIcon, SlTab, SlTabGroup, SlTabPanel } from "@shoelace-style/shoelace";
import { Lace } from "../lace";
import { LaceElement } from "../laceElement";
import { FolderElement, FolderOptions } from "./folderElement";
import { GroupElement, GroupOptions } from "./groupElement";

/**
 * Configuration options for a `TabElement`.
 * 
 * @property vertical - Optional flag to display tabs vertically.
 * @property onTabChange - Optional callback function to be called when the active tab changes.
 */
export interface TabOptions {
    vertical?: boolean;
    onTabChange?: Function;
}

/**
 * A tab element that allows the user to switch between different content panels.
 * 
 * @extends LaceElement
 */
export class TabElement extends LaceElement{
    private tabGroup: SlTabGroup;
    private lace: Lace;
    private tabs: {name: string, tabPanel: SlTabPanel, tab: SlTab}[] = [];
    private laceTabs: Map<string, LaceTab> = new Map();
    private eventFunctions: Map<string, {onSel: Function, onDeSel: Function}> = new Map();
    private vertical: boolean;
    private activeTab: string = "";

    constructor(lace: Lace, options: TabOptions = {}) {
        const {vertical = false, onTabChange = (() => {})} = options;
        const tabGroup: SlTabGroup = document.createElement('sl-tab-group');
        tabGroup.placement = vertical ? 'start' : 'top';
        tabGroup.style.marginRight = "-1em";
        tabGroup.style.marginBottom = "-1em";
        tabGroup.style.marginLeft = "-1em";

        super("laceTab", tabGroup);

        this.tabGroup = tabGroup;
        this.lace = lace;
        this.vertical = vertical;

        this.tabGroup.addEventListener('sl-tab-show', (event: CustomEvent) => {
            const tabName = event.detail.name;
            if(this.eventFunctions.has(tabName)){
                const {onSel, onDeSel} = this.eventFunctions.get(tabName)!;
                onSel();
            }
            onTabChange();
            this.activeTab = tabName;
        });
        this.tabGroup.addEventListener('sl-tab-hide', (event: CustomEvent) => {
            const tabName = event.detail.name;
            if(this.eventFunctions.has(tabName)){
                const {onSel, onDeSel} = this.eventFunctions.get(tabName)!;
                onDeSel();
            }
        });
    }

    /**
     * Adds a tab element.
     * 
     * @param label - The label for the tab.
     * @param iconName - The name of the icon to be displayed in the tab.
     * @returns The `LaceTab` instance representing the added tab.
     */
    addTab(label: string, iconName: string): LaceTab {
        const tabPanel: SlTabPanel = document.createElement('sl-tab-panel');
        tabPanel.name = label;
        tabPanel.classList.add('tab-panel');

        const tab: SlTab = document.createElement('sl-tab');
        tab.slot = 'nav';
        tab.panel = label;
        
        const icon: SlIcon = document.createElement('sl-icon');
        icon.library = 'lucide';
        icon.name = iconName;
        icon.style.fontSize = '1.3em';
        tab.appendChild(icon);

        this.tabGroup.appendChild(tab);
        this.tabGroup.appendChild(tabPanel);

        const laceTab = new LaceTab(tabPanel, this.lace, this.changed.bind(this), (onSel: Function, onDeSel: Function) => this.registerEventFunctions(label, onSel, onDeSel), this.vertical);
        this.laceTabs.set(label, laceTab);
        this.tabs.push({name: label, tabPanel: tabPanel, tab: tab});

        return laceTab;
    }

    private registerEventFunctions(name: string, onSel: Function, onDeSel: Function): void {
        this.eventFunctions.set(name, {onSel, onDeSel});
    }

    /**
     * Focuses on a specific tab by its label.
     * 
     * @param label - The label of the tab to focus on.
     */
    public show(label: string): void {
        this.tabGroup.show(label);
        this.eventFunctions.get(label)!.onSel();
        this.activeTab = label;
    }

    /**
     * Get the currently active tab label.
     * 
     * @returns The currently active tab label.
     */
    public getActiveTab(): string{
        return this.activeTab;
    }

    /**
     * Show the next tab in the list. If the last tab is active, it will loop back to the first tab.
     */
    public next(): void{
        const tabs = this.tabs.map(tab => tab.name);
        const index = tabs.indexOf(this.activeTab);
        if(index === tabs.length - 1) this.show(tabs[0]);
        else this.show(tabs[index + 1]);
    }

    getObj(): any { return null; }

    getKeys(): string[] { return []; }

    update(): void {
        this.laceTabs.forEach(tab => tab.update());
    }

    setSize(size: "small" | "medium" | "large"): void {}
}

/**
 * The actual `LaceTab` inside the `TabElement`.
 */
export class LaceTab{
    private tabPanel: SlTabPanel;
    private lace: Lace;
    private onChange: Function;
    private container: HTMLElement;
    private elements: LaceElement[] = [];
    private brs: Map<LaceElement, HTMLElement> = new Map();
    private onSelected: Function | null = null;
    private onDeSelected: Function | null = null;

    constructor(tabPanel: SlTabPanel, lace: Lace, onChange: Function, register: (onSel: Function, onDeSel: Function) => void, vertical: boolean) {
        const div = document.createElement('div');
        if(vertical) div.style.paddingLeft = '0.5em';
        else div.style.paddingTop = '0.5em';
        div.style.height = '100%';
        div.style.color = 'var(--sl-input-color) !important';

        tabPanel.appendChild(div);

        this.tabPanel = tabPanel;
        this.lace = lace;
        this.onChange = onChange;
        this.container = div;

        register(this.select.bind(this), this.deselect.bind(this));
    }

    private select(): void {
        if(this.onSelected) this.onSelected();
    }

    private deselect(): void {
        if(this.onDeSelected) this.onDeSelected();
    }

    registerOnSelected(callback: Function): void {
        this.onSelected = callback;
    }

    registerOnDeSelected(callback: Function): void {
        this.onDeSelected = callback;
    }

    /**
     * Adds a `LaceElement` object.
     * 
     * @param element - The `LaceElement` to add.
     */
    add(element: LaceElement): void {
        element.setSize('small');

        this.lace.connect(element);

        element.registerUpdateCallback(() => { this.onChange(); });

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

    /**
     * Updates all the elements in the tab.
     */
    update(): void {
        this.elements.forEach(element => element.update());
    }
}