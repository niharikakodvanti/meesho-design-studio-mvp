import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fabric } from 'fabric'
import {
  Trash2, Save, Sparkles, Palette, Square, Circle, Triangle, PenTool, Minus, Eraser, Type, Undo2, Redo2, ImageDown, PaintBucket, MousePointer2, Download, Image as ImageIcon, Droplet, Star, Heart, Cloud, ArrowUpRight, Pencil, Brush, SprayCan, PenLine, PenTool as PenToolIcon
} from 'lucide-react'

// Toolbar tool definitions
// Note: BezierCurve icon is removed for now since it's not implemented yet.
const TOOLBAR = [
  { key: 'freedraw', label: 'Free Draw', icon: <PenTool className="w-5 h-5" /> },
  { key: 'eraser', label: 'Eraser', icon: <Eraser className="w-5 h-5" /> },
  { key: 'line', label: 'Line', icon: <Minus className="w-5 h-5" /> },
  { key: 'rect', label: 'Rectangle', icon: <Square className="w-5 h-5" /> },
  { key: 'ellipse', label: 'Ellipse', icon: <Circle className="w-5 h-5" /> },
  { key: 'polygon', label: 'Polygon', icon: <Triangle className="w-5 h-5" /> },
  { key: 'fill', label: 'Fill', icon: <PaintBucket className="w-5 h-5" /> },
  { key: 'text', label: 'Text', icon: <Type className="w-5 h-5" /> },
]

// Helper: Check if object is a closed shape
function isClosedShape(obj: any) {
  return (
    obj.type === 'rect' ||
    obj.type === 'ellipse' ||
    obj.type === 'polygon'
  );
}

export default function Sketch() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<any>(null)
  const navigate = useNavigate()
  const [activeTool, setActiveTool] = useState('freedraw')
  const [strokeColor, setStrokeColor] = useState('#000000')
  const [fillColor, setFillColor] = useState('rgba(0,0,0,0)')
  const [strokeWidth, setStrokeWidth] = useState(5)
  const [drawingObject, setDrawingObject] = useState<any>(null)
  const [prompt, setPrompt] = useState('')
  const [isDrawing, setIsDrawing] = useState(false)
  // Undo/redo history stack
  const [history, setHistory] = useState<string[]>([])
  const [redoStack, setRedoStack] = useState<string[]>([])
  // Polygon/Bezier state
  const polygonPoints = useRef<{ x: number, y: number }[]>([])
  const bezierPoints = useRef<{ x: number, y: number }[]>([])
  const [isAddingText, setIsAddingText] = useState(false)
  // --- Persistent refs for temp object and mouse state (needed for shape drawing) ---
  const tempObjRef = useRef<any>(null)
  const isMouseDownRef = useRef(false)
  const startPointRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 })
  // Add refs for style pickers and tool
  const activeToolRef = useRef(activeTool)
  const strokeColorRef = useRef(strokeColor)
  const fillColorRef = useRef(fillColor)
  const strokeWidthRef = useRef(strokeWidth)
  // Add text tool state
  const [textFont, setTextFont] = useState('Inter');
  const [textSize, setTextSize] = useState(32);
  const [textColor, setTextColor] = useState('#000000');
  const textCreatedRef = useRef(false);
  // Add brush type state
  const [brushType, setBrushType] = useState('pencil');
  useEffect(() => { activeToolRef.current = activeTool }, [activeTool])
  useEffect(() => { strokeColorRef.current = strokeColor }, [strokeColor])
  useEffect(() => { fillColorRef.current = fillColor }, [fillColor])
  useEffect(() => { strokeWidthRef.current = strokeWidth }, [strokeWidth])

  // Helper: Save current canvas state to history
  const pushHistory = () => {
    if (fabricCanvasRef.current) {
      const json = fabricCanvasRef.current.toJSON()
      setHistory(prev => [...prev, JSON.stringify(json)])
      setRedoStack([]) // Clear redo stack on new action
    }
  }

  // Helper: Reset drawing state
  const resetDrawingState = () => {
    setDrawingObject(null)
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.isDrawingMode = false
      fabricCanvasRef.current.selection = true
      fabricCanvasRef.current.defaultCursor = 'default'
    }
    polygonPoints.current = []
    bezierPoints.current = []
    setIsAddingText(false)
  }

  // Tool switching logic
  useEffect(() => {
    if (!fabricCanvasRef.current) return;
    const canvas = fabricCanvasRef.current;
    resetDrawingState();
    if (activeTool === 'freedraw') {
      canvas.isDrawingMode = true;
      switch (brushType) {
        case 'pencil':
          canvas.freeDrawingBrush = new (fabric as any).PencilBrush(canvas);
          break;
        case 'marker':
          canvas.freeDrawingBrush = new (fabric as any).PencilBrush(canvas);
          canvas.freeDrawingBrush.width = strokeWidth * 2;
          break;
        case 'spray':
          canvas.freeDrawingBrush = new (fabric as any).SprayBrush(canvas);
          break;
        case 'crayon':
          canvas.freeDrawingBrush = new (fabric as any).PencilBrush(canvas);
          canvas.freeDrawingBrush.color = strokeColor + '80'; // semi-transparent
          break;
        case 'calligraphy':
          canvas.freeDrawingBrush = new (fabric as any).PencilBrush(canvas);
          canvas.freeDrawingBrush.width = strokeWidth * 0.7;
          break;
        case 'oil':
          canvas.freeDrawingBrush = new (fabric as any).PencilBrush(canvas);
          canvas.freeDrawingBrush.width = strokeWidth * 3;
          break;
        default:
          canvas.freeDrawingBrush = new (fabric as any).PencilBrush(canvas);
      }
      canvas.freeDrawingBrush.color = strokeColor;
      canvas.freeDrawingBrush.width = strokeWidth;
      canvas.selection = false;
    } else if (activeTool === 'eraser') {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new (fabric as any).PencilBrush(canvas);
      canvas.freeDrawingBrush.width = strokeWidth * 2;
      canvas.freeDrawingBrush.color = '#ffffff';
      canvas.selection = false;
    } else {
      // For all other tools, ensure free drawing is OFF
      canvas.isDrawingMode = false;
      canvas.selection = false;
    }
  }, [activeTool, brushType, strokeColor, strokeWidth]);

  // Canvas setup
  useEffect(() => {
    if (canvasRef.current) {
      const canvas: any = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
        isDrawingMode: false
      })
      fabricCanvasRef.current = canvas
      canvas.freeDrawingBrush.width = strokeWidth
      canvas.freeDrawingBrush.color = strokeColor
      // --- Mouse event handlers for tools ---
      // Mouse down
      const onMouseDown = (opt: any) => {
        const canvas = fabricCanvasRef.current;
        const pointer = canvas.getPointer(opt.e);
        const tool = activeToolRef.current;
        console.log('activeTool:', tool, 'strokeColor:', strokeColorRef.current, 'fillColor:', fillColorRef.current);
        // Only allow shape creation if not in drawing mode
        if (!canvas.isDrawingMode) {
          if (tool === 'rect' || tool === 'ellipse' || tool === 'line') {
            isMouseDownRef.current = true;
            startPointRef.current = { x: pointer.x, y: pointer.y };
            // Create a temp object for preview
            if (tool === 'rect') {
              tempObjRef.current = new fabric.Rect({
                left: pointer.x,
                top: pointer.y,
                width: 0,
                height: 0,
                fill: fillColorRef.current,
                stroke: strokeColorRef.current,
                strokeWidth: strokeWidthRef.current,
                selectable: false,
                evented: false
              });
              canvas.add(tempObjRef.current);
              console.log('Rectangle started');
            } else if (tool === 'ellipse') {
              tempObjRef.current = new fabric.Ellipse({
                left: pointer.x,
                top: pointer.y,
                rx: 0,
                ry: 0,
                fill: fillColorRef.current,
                stroke: strokeColorRef.current,
                strokeWidth: strokeWidthRef.current,
                selectable: false,
                evented: false
              });
              canvas.add(tempObjRef.current);
              console.log('Ellipse started');
            } else if (tool === 'line') {
              tempObjRef.current = new fabric.Line([
                pointer.x, pointer.y, pointer.x, pointer.y
              ], {
                stroke: strokeColorRef.current,
                strokeWidth: strokeWidthRef.current,
                selectable: false,
                evented: false
              });
              canvas.add(tempObjRef.current);
              console.log('Line started');
            }
          } else if (tool === 'polygon') {
            // Multi-click to add points
            polygonPoints.current.push({ x: pointer.x, y: pointer.y });
            if (polygonPoints.current.length > 1) {
              if (drawingObject) canvas.remove(drawingObject);
              // Show preview polygon
              const poly = new fabric.Polygon(polygonPoints.current, {
                fill: fillColorRef.current,
                stroke: strokeColorRef.current,
                strokeWidth: strokeWidthRef.current,
                selectable: false,
                evented: false
              });
              setDrawingObject(poly);
              canvas.add(poly);
              console.log('Polygon point added');
            }
          } else if (tool === 'text') {
            // Add a text box on single click, only if not already adding
            if (!textCreatedRef.current) {
              textCreatedRef.current = true;
              const text = new (fabric as any).Textbox('Type here', {
                left: pointer.x,
                top: pointer.y,
                fontSize: textSize,
                fontFamily: textFont,
                fill: textColor,
                editable: true,
                selectable: true
              });
              canvas.add(text);
              canvas.setActiveObject(text);
              text.enterEditing();
              text.selectAll();
              pushHistory();
              setTimeout(() => { textCreatedRef.current = false; }, 500); // allow new text after a short delay
              console.log('Text created', { font: textFont, size: textSize, color: textColor });
            }
          } else if (tool === 'fill') {
            // Fill tool: apply fillColor to closed shapes only
            const target = canvas.findTarget(opt.e, false);
            if (target && isClosedShape(target)) {
              target.set('fill', fillColorRef.current);
              canvas.renderAll();
              pushHistory();
              console.log('Fill applied', fillColorRef.current, 'to', target.type);
            }
          }
        }
      }
      // Mouse move
      const onMouseMove = (opt: any) => {
        if (!isMouseDownRef.current) return;
        const pointer = fabricCanvasRef.current.getPointer(opt.e);
        const tool = activeToolRef.current;
        // Update temp object for preview
        if (tool === 'rect' && tempObjRef.current) {
          const { x, y } = startPointRef.current;
          tempObjRef.current.set({
            width: Math.abs(pointer.x - x),
            height: Math.abs(pointer.y - y),
            left: Math.min(pointer.x, x),
            top: Math.min(pointer.y, y)
          });
          fabricCanvasRef.current.renderAll();
        } else if (tool === 'ellipse' && tempObjRef.current) {
          const { x, y } = startPointRef.current;
          tempObjRef.current.set({
            rx: Math.abs(pointer.x - x) / 2,
            ry: Math.abs(pointer.y - y) / 2,
            left: Math.min(pointer.x, x),
            top: Math.min(pointer.y, y)
          });
          fabricCanvasRef.current.renderAll();
        } else if (tool === 'line' && tempObjRef.current) {
          tempObjRef.current.set({ x2: pointer.x, y2: pointer.y });
          fabricCanvasRef.current.renderAll();
        }
      }
      // Mouse up
      const onMouseUp = (opt: any) => {
        const tool = activeToolRef.current
        if (tool === 'rect' || tool === 'ellipse' || tool === 'line') {
          if (tempObjRef.current) {
            tempObjRef.current.set({ selectable: true, evented: true })
            tempObjRef.current = null
            pushHistory()
          }
          isMouseDownRef.current = false
        }
      }
      // Polygon: double click to finish
      const onDblClick = () => {
        if (activeToolRef.current === 'polygon' && polygonPoints.current.length > 2) {
          if (drawingObject) {
            drawingObject.set({ selectable: true, evented: true })
            setDrawingObject(null)
            pushHistory()
          }
          polygonPoints.current = []
        }
      }
      // Attach events
      canvas.on('mouse:down', onMouseDown)
      canvas.on('mouse:move', onMouseMove)
      canvas.on('mouse:up', onMouseUp)
      canvas.on('mouse:dblclick', onDblClick)
      // Save initial state
      setTimeout(() => pushHistory(), 100)
      // --- Style pickers live update for selected objects ---
      canvas.on('selection:created', (e: any) => {
        const obj = e.target as any
        if (!obj) return
        if (isClosedShape(obj)) {
          obj.set({
            stroke: strokeColorRef.current,
            fill: fillColorRef.current,
            strokeWidth: strokeWidthRef.current
          })
          canvas.requestRenderAll()
        } else if (obj.type === 'line') {
          obj.set({
            stroke: strokeColorRef.current,
            strokeWidth: strokeWidthRef.current
          })
          canvas.requestRenderAll()
        } else if (obj.type === 'textbox' || obj.type === 'i-text' || obj.type === 'text') {
          obj.set({
            fill: fillColorRef.current,
            fontSize: 32,
            fontFamily: 'Inter'
          })
          canvas.requestRenderAll()
        }
      })
    }
  }, [])

  // --- Style pickers live update for active object ---
  useEffect(() => {
    if (!fabricCanvasRef.current) return
    const canvas: any = fabricCanvasRef.current
    const obj = canvas.getActiveObject()
    if (!obj) return
    if (isClosedShape(obj)) {
      obj.set({
        stroke: strokeColor,
        fill: fillColor,
        strokeWidth
      })
      canvas.requestRenderAll()
    } else if (obj.type === 'line') {
      obj.set({
        stroke: strokeColor,
        strokeWidth
      })
      canvas.requestRenderAll()
    } else if (obj.type === 'textbox' || obj.type === 'i-text' || obj.type === 'text') {
      obj.set({
        fill: fillColor,
        fontSize: 32,
        fontFamily: 'Inter'
      })
      canvas.requestRenderAll()
    }
  }, [strokeColor, fillColor, strokeWidth])

  // Update brush color/width on change
  useEffect(() => {
    if (fabricCanvasRef.current) {
      if (activeTool === 'freedraw') {
        fabricCanvasRef.current.freeDrawingBrush.color = strokeColor
        fabricCanvasRef.current.freeDrawingBrush.width = strokeWidth
      } else if (activeTool === 'eraser') {
        fabricCanvasRef.current.freeDrawingBrush.color = '#ffffff'
        fabricCanvasRef.current.freeDrawingBrush.width = strokeWidth * 2
      }
    }
  }, [strokeColor, strokeWidth, activeTool])

  // Undo/Redo logic
  const undo = () => {
    if (history.length > 1 && fabricCanvasRef.current) {
      const prev = history[history.length - 2]
      setRedoStack(r => [history[history.length - 1], ...r])
      setHistory(h => h.slice(0, h.length - 1))
      fabricCanvasRef.current.loadFromJSON(JSON.parse(prev), () => {
        fabricCanvasRef.current?.renderAll()
      })
    }
  }
  const redo = () => {
    if (redoStack.length > 0 && fabricCanvasRef.current) {
      const next = redoStack[0]
      setHistory(h => [...h, next])
      setRedoStack(r => r.slice(1))
      fabricCanvasRef.current.loadFromJSON(JSON.parse(next), () => {
        fabricCanvasRef.current?.renderAll()
      })
    }
  }

  // Clear canvas
  const clearCanvas = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.clear()
      fabricCanvasRef.current.backgroundColor = '#ffffff'
      fabricCanvasRef.current.renderAll()
      pushHistory()
    }
  }

  // Export canvas as image
  const exportImage = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL({ format: 'png', quality: 1 })
      const link = document.createElement('a')
      link.href = dataURL
      link.download = 'sketch.png'
      link.click()
    }
  }

  // Save sketch (navigate)
  const saveSketch = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL({ format: 'png', quality: 1 })
      // In a real app, you'd save this to Firebase Storage
      console.log('Sketch saved:', dataURL)
      navigate('/design/demo-123')
    }
  }

  const generateAIDesign = () => {
    if (fabricCanvasRef.current) {
      setIsDrawing(true)
      setTimeout(() => {
        setIsDrawing(false)
        navigate('/design/demo-123')
      }, 2000)
    }
  }

  const previewWithAI = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL({ format: 'png', quality: 1 })
      localStorage.setItem('sketchImage', dataURL)
      localStorage.setItem('prompt', prompt)
      navigate('/design/generated')
    }
  }

  // Demo Mode: Preload a sample sketch and prompt, then navigate
  const demoMode = () => {
    const sampleSketch =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='
    const samplePrompt = 'Lehenga with floral embroidery and pastel shades'
    localStorage.setItem('sketchImage', sampleSketch)
    localStorage.setItem('prompt', samplePrompt)
    localStorage.setItem('demoMode', 'true')
    navigate('/design/generated')
  }

  // Color palette
  const COLORS = ['#000000', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFE66D', '#A8E6CF', '#FF8B94', '#FFA07A']

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Toolbar (Ribbon) */}
      <div className="bg-white shadow flex flex-col border-b border-gray-200">
        <div className="flex items-center px-4 py-2 gap-4">
          {/* File/Actions */}
          <button onClick={undo} title="Undo" className="toolbar-btn"><Undo2 /></button>
          <button onClick={redo} title="Redo" className="toolbar-btn"><Redo2 /></button>
          <button onClick={exportImage} title="Export as Image" className="toolbar-btn"><Download /></button>
          <button onClick={saveSketch} title="Save Sketch" className="toolbar-btn"><Save /></button>
          <button onClick={clearCanvas} title="Clear All" className="toolbar-btn"><Trash2 /></button>
          <div className="w-px h-6 bg-gray-200 mx-2" />
          {/* Tool Group: Selection */}
          <button onClick={() => setActiveTool('select')} className={`toolbar-btn ${activeTool === 'select' ? 'bg-meesho-primary/10 border-meesho-primary' : ''}`} title="Select"><MousePointer2 /></button>
          {/* Brushes Dropdown */}
          <div className="relative group">
            <button className={`toolbar-btn ${activeTool === 'freedraw' ? 'bg-meesho-primary/10 border-meesho-primary' : ''}`} title="Brushes"><Brush /></button>
            <div className="absolute left-0 top-full mt-1 bg-white border rounded shadow-lg z-10 hidden group-hover:block min-w-[120px]">
              <button onClick={() => { setActiveTool('freedraw'); setBrushType('pencil'); }} className="flex items-center gap-2 px-3 py-1 w-full hover:bg-gray-100"><Pencil className="w-4 h-4" /> Pencil</button>
              <button onClick={() => { setActiveTool('freedraw'); setBrushType('marker'); }} className="flex items-center gap-2 px-3 py-1 w-full hover:bg-gray-100"><PenLine className="w-4 h-4" /> Marker</button>
              <button onClick={() => { setActiveTool('freedraw'); setBrushType('spray'); }} className="flex items-center gap-2 px-3 py-1 w-full hover:bg-gray-100"><SprayCan className="w-4 h-4" /> Spray</button>
              <button onClick={() => { setActiveTool('freedraw'); setBrushType('crayon'); }} className="flex items-center gap-2 px-3 py-1 w-full hover:bg-gray-100"><PenToolIcon className="w-4 h-4" /> Crayon</button>
              <button onClick={() => { setActiveTool('freedraw'); setBrushType('calligraphy'); }} className="flex items-center gap-2 px-3 py-1 w-full hover:bg-gray-100"><PenTool className="w-4 h-4" /> Calligraphy</button>
              <button onClick={() => { setActiveTool('freedraw'); setBrushType('oil'); }} className="flex items-center gap-2 px-3 py-1 w-full hover:bg-gray-100"><Brush className="w-4 h-4" /> Oil</button>
            </div>
          </div>
          {/* Shapes Dropdown */}
          <div className="relative group">
            <button className={`toolbar-btn ${(activeTool === 'line' || activeTool === 'rect' || activeTool === 'ellipse' || activeTool === 'polygon' || activeTool === 'arrow' || activeTool === 'star' || activeTool === 'heart' || activeTool === 'cloud' || activeTool === 'rounded-rect') ? 'bg-meesho-primary/10 border-meesho-primary' : ''}`} title="Shapes"><Square /></button>
            <div className="absolute left-0 top-full mt-1 bg-white border rounded shadow-lg z-10 hidden group-hover:block min-w-[120px]">
              <button onClick={() => setActiveTool('line')} className="flex items-center gap-2 px-3 py-1 w-full hover:bg-gray-100"><Minus className="w-4 h-4" /> Line</button>
              <button onClick={() => setActiveTool('rect')} className="flex items-center gap-2 px-3 py-1 w-full hover:bg-gray-100"><Square className="w-4 h-4" /> Rectangle</button>
              <button onClick={() => setActiveTool('rounded-rect')} className="flex items-center gap-2 px-3 py-1 w-full hover:bg-gray-100"><Square className="w-4 h-4" /> Rounded Rectangle</button>
              <button onClick={() => setActiveTool('ellipse')} className="flex items-center gap-2 px-3 py-1 w-full hover:bg-gray-100"><Circle className="w-4 h-4" /> Ellipse</button>
              <button onClick={() => setActiveTool('polygon')} className="flex items-center gap-2 px-3 py-1 w-full hover:bg-gray-100"><Triangle className="w-4 h-4" /> Polygon</button>
              <button onClick={() => setActiveTool('arrow')} className="flex items-center gap-2 px-3 py-1 w-full hover:bg-gray-100"><ArrowUpRight className="w-4 h-4" /> Arrow</button>
              <button onClick={() => setActiveTool('star')} className="flex items-center gap-2 px-3 py-1 w-full hover:bg-gray-100"><Star className="w-4 h-4" /> Star</button>
              <button onClick={() => setActiveTool('heart')} className="flex items-center gap-2 px-3 py-1 w-full hover:bg-gray-100"><Heart className="w-4 h-4" /> Heart</button>
              <button onClick={() => setActiveTool('cloud')} className="flex items-center gap-2 px-3 py-1 w-full hover:bg-gray-100"><Cloud className="w-4 h-4" /> Cloud</button>
            </div>
          </div>
          {/* Fill, Text, Image, Eyedropper, Eraser */}
          <button onClick={() => setActiveTool('fill')} className={`toolbar-btn ${activeTool === 'fill' ? 'bg-meesho-primary/10 border-meesho-primary' : ''}`} title="Fill"><PaintBucket /></button>
          <button onClick={() => setActiveTool('text')} className={`toolbar-btn ${activeTool === 'text' ? 'bg-meesho-primary/10 border-meesho-primary' : ''}`} title="Text"><Type /></button>
          <button onClick={() => setActiveTool('image')} className={`toolbar-btn ${activeTool === 'image' ? 'bg-meesho-primary/10 border-meesho-primary' : ''}`} title="Insert Image"><ImageIcon /></button>
          <button onClick={() => setActiveTool('eyedropper')} className={`toolbar-btn ${activeTool === 'eyedropper' ? 'bg-meesho-primary/10 border-meesho-primary' : ''}`} title="Color Picker"><Droplet /></button>
          <button onClick={() => setActiveTool('eraser')} className={`toolbar-btn ${activeTool === 'eraser' ? 'bg-meesho-primary/10 border-meesho-primary' : ''}`} title="Eraser"><Eraser /></button>
        </div>
        {/* Color Palette Bar */}
        <div className="flex items-center px-4 py-2 gap-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-gray-500" />
            <span className="text-xs text-gray-600">Stroke</span>
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setStrokeColor(color)}
                className={`w-6 h-6 rounded-full border-2 ${strokeColor === color ? 'border-meesho-primary' : 'border-gray-300'} transition-colors`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            <input type="color" value={strokeColor} onChange={e => setStrokeColor(e.target.value)} className="w-6 h-6 p-0 border-none bg-transparent cursor-pointer" title="Custom stroke color" />
          </div>
          <div className="flex items-center gap-2 ml-8">
            <Palette className="w-5 h-5 text-gray-500" />
            <span className="text-xs text-gray-600">Fill</span>
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setFillColor(color)}
                className={`w-6 h-6 rounded-full border-2 ${fillColor === color ? 'border-meesho-primary' : 'border-gray-300'} transition-colors`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            <input type="color" value={fillColor.startsWith('rgba') ? '#ffffff' : fillColor} onChange={e => setFillColor(e.target.value)} className="w-6 h-6 p-0 border-none bg-transparent cursor-pointer" title="Custom fill color" />
            <button onClick={() => setFillColor('rgba(0,0,0,0)')} className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs text-gray-500" title="No fill">×</button>
          </div>
          <div className="flex items-center gap-2 ml-8">
            <span className="text-xs text-gray-600">Stroke Width</span>
            <input type="range" min={1} max={30} value={strokeWidth} onChange={e => setStrokeWidth(Number(e.target.value))} className="w-32" />
            <span className="text-xs text-gray-500">{strokeWidth}px</span>
          </div>
          {/* Text tool options */}
          {activeTool === 'text' && (
            <div className="flex items-center gap-2 ml-8">
              <span className="text-xs text-gray-600">Font</span>
              <select value={textFont} onChange={e => setTextFont(e.target.value)} className="border rounded px-2 py-1">
                <option value="Inter">Inter</option>
                <option value="Arial">Arial</option>
                <option value="Courier New">Courier New</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Georgia">Georgia</option>
              </select>
              <span className="text-xs text-gray-600">Size</span>
              <input type="number" min={8} max={96} value={textSize} onChange={e => setTextSize(Number(e.target.value))} className="border rounded px-2 py-1 w-16" title="Font size" />
              <span className="text-xs text-gray-600">Text Color</span>
              <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-6 h-6 p-0 border-none bg-transparent cursor-pointer" title="Text color" />
            </div>
          )}
        </div>
      </div>
      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-2 flex items-center justify-center" style={{ minHeight: 650, minWidth: 900 }}>
          <canvas ref={canvasRef} className="border-none" />
        </div>
      </div>
      {/* Status Bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-1 text-xs text-gray-600 flex items-center gap-4">
        <span>Tool: <b>{activeTool}</b></span>
        <span>Stroke: <span style={{ color: strokeColor }}>{strokeColor}</span></span>
        <span>Fill: <span style={{ color: fillColor }}>{fillColor}</span></span>
        {/* Optionally add mouse coordinates, etc. */}
      </div>
    </div>
  )
} 