import { useEffect, useRef, useState } from "react";
import { Canvas, Circle, Line, Rect, Polygon, Path, Group, TEvent, Object as FabricObject } from "fabric";
import type { SymbolType } from "./SymbolLibrary";

interface DrawingCanvasProps {
  onObjectSelected: (object: FabricObject | null) => void;
  selectedSymbol: SymbolType | null;
  isLineDrawingMode: boolean;
  onLineDrawingComplete: () => void;
  onCanvasReady?: (canvas: Canvas) => void;
}

export default function DrawingCanvas({ 
  onObjectSelected, 
  selectedSymbol, 
  isLineDrawingMode,
  onLineDrawingComplete,
  onCanvasReady
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const [lineStart, setLineStart] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      width: canvasRef.current.parentElement?.clientWidth || 800,
      height: canvasRef.current.parentElement?.clientHeight || 600,
      backgroundColor: '#FFFFFF',
    });

    fabricCanvasRef.current = canvas;
    
    if (onCanvasReady) {
      onCanvasReady(canvas);
    }

    canvas.on('selection:created', (e: any) => {
      onObjectSelected(e.selected?.[0] || null);
    });

    canvas.on('selection:updated', (e: any) => {
      onObjectSelected(e.selected?.[0] || null);
    });

    canvas.on('selection:cleared', () => {
      onObjectSelected(null);
    });

    const handleResize = () => {
      if (canvasRef.current?.parentElement) {
        canvas.setWidth(canvasRef.current.parentElement.clientWidth);
        canvas.setHeight(canvasRef.current.parentElement.clientHeight);
        canvas.renderAll();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.dispose();
    };
  }, [onObjectSelected]);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
          canvas.remove(activeObject);
          canvas.renderAll();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !selectedSymbol || selectedSymbol === "Cable") return;

    let obj: FabricObject | null = null;

    switch (selectedSymbol) {
      case "ODC": {
        const triangle = new Polygon([
          { x: 30, y: 10 },
          { x: 50, y: 50 },
          { x: 10, y: 50 }
        ], {
          fill: 'transparent',
          stroke: 'red',
          strokeWidth: 2
        });
        const innerTriangle = new Polygon([
          { x: 30, y: 20 },
          { x: 42, y: 42 },
          { x: 18, y: 42 }
        ], {
          fill: 'transparent',
          stroke: 'red',
          strokeWidth: 1
        });
        const line1 = new Line([22, 34, 38, 34], { stroke: 'red', strokeWidth: 1 });
        const line2 = new Line([26, 26, 34, 26], { stroke: 'red', strokeWidth: 1 });
        obj = new Group([triangle, innerTriangle, line1, line2]);
        break;
      }
      case "ODP Wall": {
        obj = new Polygon([
          { x: 30, y: 50 },
          { x: 10, y: 10 },
          { x: 50, y: 10 }
        ], {
          fill: 'red'
        });
        break;
      }
      case "ODP Tiang": {
        obj = new Polygon([
          { x: 30, y: 10 },
          { x: 50, y: 50 },
          { x: 10, y: 50 }
        ], {
          fill: 'red'
        });
        break;
      }
      case "ODP Pedestal": {
        const triangle = new Polygon([
          { x: 30, y: 50 },
          { x: 10, y: 10 },
          { x: 50, y: 10 }
        ], {
          fill: 'red'
        });
        const line = new Line([10, 10, 50, 10], { stroke: 'red', strokeWidth: 3 });
        obj = new Group([triangle, line]);
        break;
      }
      case "Tiang Eksisting": {
        obj = new Circle({
          radius: 15,
          left: 15,
          top: 15,
          fill: 'white',
          stroke: 'black',
          strokeWidth: 2
        });
        break;
      }
      case "Tiang Baru": {
        obj = new Circle({
          radius: 15,
          left: 15,
          top: 15,
          fill: 'red'
        });
        break;
      }
      case "MSAN / MDU": {
        const building = new Rect({
          left: 15,
          top: 20,
          width: 30,
          height: 20,
          fill: 'red'
        });
        const window1 = new Rect({
          left: 18,
          top: 24,
          width: 8,
          height: 6,
          fill: 'white'
        });
        const window2 = new Rect({
          left: 34,
          top: 24,
          width: 8,
          height: 6,
          fill: 'white'
        });
        obj = new Group([building, window1, window2]);
        break;
      }
      case "Closure Penuh": {
        const circle = new Circle({
          radius: 15,
          left: 15,
          top: 15,
          fill: 'transparent',
          stroke: 'red',
          strokeWidth: 2
        });
        const line = new Line([15, 30, 45, 30], { stroke: 'red', strokeWidth: 2 });
        obj = new Group([circle, line]);
        break;
      }
      case "Closure Suntik": {
        const circle = new Circle({
          radius: 15,
          left: 15,
          top: 15,
          fill: 'transparent',
          stroke: 'red',
          strokeWidth: 2
        });
        const line = new Line([18, 18, 42, 42], { stroke: 'red', strokeWidth: 2 });
        obj = new Group([circle, line]);
        break;
      }
      case "Manhole": {
        obj = new Rect({
          left: 15,
          top: 22,
          width: 30,
          height: 16,
          fill: 'transparent',
          stroke: 'red',
          strokeWidth: 2
        });
        break;
      }
      case "Grounding": {
        const line1 = new Line([30, 15, 30, 35], { stroke: 'red', strokeWidth: 2 });
        const line2 = new Line([22, 35, 38, 35], { stroke: 'red', strokeWidth: 2 });
        const line3 = new Line([24, 40, 36, 40], { stroke: 'red', strokeWidth: 2 });
        const line4 = new Line([26, 45, 34, 45], { stroke: 'red', strokeWidth: 2 });
        obj = new Group([line1, line2, line3, line4]);
        break;
      }
    }

    if (obj) {
      obj.set({
        left: 100,
        top: 100,
        customType: selectedSymbol,
        customName: selectedSymbol
      } as any);
      canvas.add(obj);
      canvas.setActiveObject(obj);
      canvas.renderAll();
    }
  }, [selectedSymbol]);

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    if (isLineDrawingMode) {
      canvas.defaultCursor = 'crosshair';
      canvas.selection = false;
      
      const handleCanvasClick = (e: TEvent) => {
        const pointer = canvas.getPointer(e.e);
        
        if (!lineStart) {
          setLineStart({ x: pointer.x, y: pointer.y });
        } else {
          const line = new Line([lineStart.x, lineStart.y, pointer.x, pointer.y], {
            stroke: 'black',
            strokeWidth: 2,
            selectable: true,
            customType: 'Cable',
            customName: 'Cable'
          } as any);
          canvas.add(line);
          canvas.renderAll();
          setLineStart(null);
          onLineDrawingComplete();
        }
      };

      canvas.on('mouse:down', handleCanvasClick);

      return () => {
        canvas.off('mouse:down', handleCanvasClick);
      };
    } else {
      canvas.defaultCursor = 'default';
      canvas.selection = true;
      setLineStart(null);
    }
  }, [isLineDrawingMode, lineStart, onLineDrawingComplete]);

  return (
    <div className="flex-1 h-full bg-white relative" data-testid="canvas-container">
      {isLineDrawingMode && lineStart && (
        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm z-10">
          Click to place end point
        </div>
      )}
      {isLineDrawingMode && !lineStart && (
        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm z-10">
          Drawing Cable Mode - Click to place start point
        </div>
      )}
      <canvas ref={canvasRef} data-testid="fabric-canvas" />
    </div>
  );
}
