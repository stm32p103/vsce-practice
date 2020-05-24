export type PictureIdType = string;

export interface Picture {
    readonly id: PictureIdType;
    draw(drawable: Drawable): void;
    rotate(angle: number);
    position(x: number, y: number);
}

export interface Drawable {
    draw( picture: Picture ): void;
}

export interface Screen {
    readonly view: HTMLCanvasElement;
    create(id: PictureIdType): Picture;
    add(picture: Picture): void;
    remove(picture: Picture | PictureIdType): void;
    getById(id: PictureIdType): Picture;
    onTick(handler: ()=>void);
}