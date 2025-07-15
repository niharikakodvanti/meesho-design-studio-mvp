declare module 'fabric' {
  export namespace fabric {
    class Canvas {
      constructor(element: HTMLCanvasElement | string, options?: any);
      isDrawingMode: boolean;
      selection: boolean;
      defaultCursor: string;
      backgroundColor: string;
      freeDrawingBrush: any;
      add(object: any): void;
      remove(object: any): void;
      clear(): void;
      renderAll(): void;
      getObjects(): any[];
      getPointer(e: any): any;
      on(event: string, handler: (e: any) => void): void;
      off(event: string, handler?: (e: any) => void): void;
      toDataURL(options?: any): string;
      loadFromJSON(json: any, callback?: () => void): void;
      toJSON(): any;
      dispose(): void;
    }
    
    class Path {
      constructor(path: string, options?: any);
      path: any;
      set(options: any): void;
    }
    
    class Rect {
      constructor(options?: any);
      set(options: any): void;
    }
    
    class Circle {
      constructor(options?: any);
      set(options: any): void;
    }
    
    class Ellipse {
      constructor(options?: any);
      set(options: any): void;
    }
    
    class Line {
      constructor(points: number[], options?: any);
      set(options: any): void;
    }
    
    class Polygon {
      constructor(points: any[], options?: any);
      set(options: any): void;
    }
  }
}