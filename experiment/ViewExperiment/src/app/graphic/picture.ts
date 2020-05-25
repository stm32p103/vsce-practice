import { Graphics, Application } from 'pixi.js';
import { Picture, Drawable, PictureIdType, Screen } from './interface';

class PixiPicture implements Picture {
    readonly graphic: Graphics = new Graphics();
    constructor(readonly id: PictureIdType){}
    draw(drawable: Drawable) {
        drawable.draw(this);
    }
    rotate(angle: number) {
        this.graphic.rotation += angle;
    }

    position(x: number, y: number) {
        this.graphic.position.x = x;
        this.graphic.position.y = y;
    }
}

export function createScreen(element?: HTMLCanvasElement): Screen {
    return new PixiScreen(element);
}

export class PixiDrawable implements Drawable {
    draw(Picture: Picture) {
        if(Picture instanceof PixiPicture) {
            Picture.graphic.beginFill(0xFF00FF);
            Picture.graphic.drawCircle(0,0,30);
            Picture.graphic.drawCircle(100,100,10);
            Picture.graphic.drawCircle(50,0,10);
            Picture.graphic.drawCircle(-90,0,10);
            Picture.graphic.drawCircle(0,-40,10);
            Picture.graphic.drawCircle(0,200,10);
            Picture.graphic.endFill();
        }
    }
}

class PixiScreen implements Screen {
    readonly pixi: Application;
    readonly view: HTMLCanvasElement;
    private map: {[id: string]: PixiPicture} = {};

    constructor(element?: HTMLCanvasElement) {
        this.pixi = new Application( { view: element } );
        this.view = this.pixi.view;
    }

    create(id: PictureIdType) {
        let picture: PixiPicture;
        if(!!id) {
            picture = new PixiPicture(id);
            this.map[id] = picture;
            this.pixi.stage.addChild(picture.graphic);
        }
        return picture;
    }

    add(picture: Picture) {
        const tmp = this.map[picture.id];
        if(!(picture instanceof PixiPicture)) {
            throw new Error('NG');
        }

        if(!tmp) {
            this.map[picture.id] = picture;
            this.pixi.stage.addChild(picture.graphic);
        }
    }

    remove(picture: Picture | PictureIdType) {
        let id: PictureIdType;
        if(picture instanceof PixiPicture) {
            id = picture.id;
        }
        if(typeof picture == 'string' ) {
            id = picture;
        }
        if(!!id) {
            const removed = this.map[id];
            delete this.map[id];
            this.pixi.stage.removeChild(removed.graphic);
        }
    }

    getById(id: PictureIdType) {
        return this.map[id];
    }

    onTick(handler: ()=>void) {
        this.pixi.ticker.add( handler );
    }
}
