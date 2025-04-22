import { LaceElement } from "../laceElement";
import { SlIcon, SlInput } from '@shoelace-style/shoelace';

/**
 * Configuration options for a `TextureElement`.
 * 
 * @property size - Optional size of the texture image in pixels.
 */
interface TextureOptions {
    size?: number;
}

/**
 * A texture element that allows the user to upload and display an image.
 * 
 * @extends LaceElement
 */
export class TextureElement extends LaceElement{
    private obj: any;
    private key: string;
    private img: HTMLImageElement;
    private name: string;
    private size : number;

    /**
     * Creates a new `TextureElement` instance.
     * 
     * @param label - The label for the texture element.
     * @param obj - The object containing the image data.
     * @param key - The key of the image data in the object.
     * @param options - Optional configuration for the texture element.
     * 
     * @remarks
     * The representation of the texture should be a dataURL string, if the value is empty, it will show a placeholder image until the user uploads a new one.
     */
    constructor(label: string, obj: any, key: string, options: TextureOptions = {}) {
        const {size = 80} = options;
        const div = document.createElement('div');
        div.style.display = 'flex';
        div.style.flexDirection = 'row';
        div.style.alignItems = 'flex-start';
        div.style.justifyContent = 'space-between';

        const labelElement: HTMLLabelElement = document.createElement('label');
        labelElement.innerHTML = label;

        const imageContainer = document.createElement('div');
        imageContainer.style.position = 'relative';
        imageContainer.style.cursor = 'pointer';

        const img: HTMLImageElement = document.createElement('img');
        img.style.width = size + 'px';
        img.style.height = size + 'px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '3px';
        img.style.border = '1px solid var(--sl-color-neutral-300)';
        img.style.transition = 'filter 0.1s ease';
        imageContainer.appendChild(img);

        const uploadIcon: SlIcon = document.createElement('sl-icon');
        uploadIcon.name = 'arrow-up-from-line';
        uploadIcon.library = 'lucide';
        uploadIcon.style.position = 'absolute';
        uploadIcon.style.top = '50%';
        uploadIcon.style.left = '50%';
        uploadIcon.style.transform = 'translate(-50%, -50%)';
        uploadIcon.style.color = 'white';
        uploadIcon.style.opacity = '0';
        uploadIcon.style.transition = 'opacity 0.1s ease';
        imageContainer.appendChild(uploadIcon);

        div.appendChild(labelElement);
        div.appendChild(imageContainer);

        super(label, div);

        this.obj = obj;
        this.key = key;
        this.img = img;
        this.name = label;
        this.size = size;

        imageContainer.onclick = this.uploadImage.bind(this);
        imageContainer.onmouseover = () => {
            this.img.style.filter = 'brightness(50%)';
            uploadIcon.style.opacity = '1';
        };

        imageContainer.onmouseout = () => {
            this.img.style.filter = 'none';
            uploadIcon.style.opacity = '0';
        };

        this.update();
    }

    getObj(): any {
        return this.obj;
    }

    getKeys(): string[] {
        return [this.key];
    }

    update(): void {
        const dataURL = this.obj[this.key];
        this.img.src = this.isValidDataURL(dataURL) ? dataURL : `https://placehold.co/${this.size}?text=${this.name}&font=roboto`;
    }

    setSize(size: "small" | "medium" | "large"): void {}

    private uploadImage(): void {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.png, .jpg, .jpeg';
        input.onchange = (event: Event) => {
            try{
                const target = event.target as HTMLInputElement;
                const file = target.files?.item(0);
                if(file){
                    const reader = new FileReader();
                    reader.onload = (event: Event) => {
                        this.obj[this.key] = reader.result as string;
                        this.update();
                        this.changed();
                    };
                    reader.readAsDataURL(file);
                }
            }
            catch(e){
                console.warn("Error while loading image file: ", e);
            }
        };
        input.click();
    }

    private isValidDataURL(dataURL: string): boolean {
        const pattern = /^data:image\/(png|jpg|jpeg);base64,[A-Za-z0-9+/]+={0,2}$/;
        return pattern.test(dataURL);
    }
}