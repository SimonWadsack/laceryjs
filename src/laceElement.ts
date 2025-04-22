/**
 * An abstract base class representing a generic LaceElement.
 * This class provides a framework for managing changes, update callbacks,
 * and abstract methods for specific implementations.
 */
export abstract class LaceElement{
    /**
     * A callback function that is triggered when the element changes.
     * Defaults to a no-op function.
     */
    private onChangeCallback: () => void = () => {};

    /**
     * A list of callback functions to be executed during updates.
     */
    private updateCallbacks: (() => void)[] = [];

    /**
     * Constructs a new LaceElement instance.
     * 
     * @param label - A string representing the label of the element.
     * @param element - The associated HTML element.
     */
    constructor(public label: string, public element: HTMLElement) {}

    /**
     * Registers a callback to be executed when the element changes.
     * 
     * @param callback - The callback function to execute on change.
     * @returns The current instance of LaceElement for method chaining.
     */
    public onChange(callback: () => void): LaceElement{
        this.onChangeCallback = callback;
        return this;
    }

    /**
     * Triggers the change event, executing the onChange callback and all registered update callbacks.
     * This method is intended to be called by subclasses when the element changes.
     */
    protected changed(){
        this.onChangeCallback();
        for(const callback of this.updateCallbacks){
            callback();
        }
    }

    /**
     * Registers a callback to be executed during updates.
     * 
     * @param callback - The callback function to register.
     */
    public registerUpdateCallback(callback: () => void){
        this.updateCallbacks.push(callback);
    }

    /**
     * Deregisters a previously registered update callback.
     * 
     * @param callback - The callback function to deregister.
     */
    public deregisterUpdateCallback(callback: () => void){
        const index = this.updateCallbacks.indexOf(callback);
        if(index !== -1){
            this.updateCallbacks.splice(index, 1);
        }
    }

    /**
     * Method to retrieve the object bound to the element.
     * 
     * @returns The object bound to the element.
     */
    public abstract getObj(): any;

    /**
     * Method to retrieve the keys of the object bound to the element.
     * 
     * @returns An array of strings representing the keys.
     */
    public abstract getKeys(): string[];

    /**
     * Method to update the element.
     */
    public abstract update(): void;

    /**
     * Method to set the size of the element.
     * 
     * @param size - The size to set, which can be "small", "medium", or "large".
     */
    public abstract setSize(size: "small" | "medium" | "large"): void;
}