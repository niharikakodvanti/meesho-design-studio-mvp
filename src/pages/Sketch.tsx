import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fabric } from 'fabric'
import { Trash2, Save, Sparkles, Palette, Square, Circle, Triangle, PenTool, Minus, Eraser } from 'lucide-react'

const TOOLBAR = [
  { key: 'freedraw', label: 'Free Draw', icon: <PenTool className="w-5 h-5" /> },
  { key: 'eraser', label: 'Eraser', icon: <Eraser className="w-5 h-5" /> },
  { key: 'line', label: 'Line', icon: <Minus className="w-5 h-5" /> },
  { key: 'rect', label: 'Rectangle', icon: <Square className="w-5 h-5" /> },
  { key: 'ellipse', label: 'Ellipse', icon: <Circle className="w-5 h-5" /> },
  { key: 'polygon', label: 'Polygon', icon: <Triangle className="w-5 h-5" /> },
  { key: 'curve', label: 'Curve', icon: <Sparkles className="w-5 h-5" /> },
  // { key: 'fill', label: 'Fill', icon: <Droplet className="w-5 h-5" /> }, // Optional
]

export default function Sketch() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null)
  const navigate = useNavigate()
  const [isDrawing, setIsDrawing] = useState(false)
  const [activeTool, setActiveTool] = useState('freedraw')
  const [strokeColor, setStrokeColor] = useState('#000000')
  const [fillColor, setFillColor] = useState('rgba(0,0,0,0)')
  const [strokeWidth, setStrokeWidth] = useState(5)
  const [polygonPoints, setPolygonPoints] = useState<any[]>([])
  const [drawingObject, setDrawingObject] = useState<any>(null)
  const [prompt, setPrompt] = useState('')

  // Helper to reset drawing state
  const resetDrawingState = () => {
    setPolygonPoints([])
    setDrawingObject(null)
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.isDrawingMode = false
      fabricCanvasRef.current.selection = true
      fabricCanvasRef.current.defaultCursor = 'default'
    }
  }

  // Tool switching logic
  useEffect(() => {
    if (!fabricCanvasRef.current) return
    const canvas = fabricCanvasRef.current
    resetDrawingState()
    if (activeTool === 'freedraw') {
      canvas.isDrawingMode = true
      canvas.freeDrawingBrush.width = strokeWidth
      canvas.freeDrawingBrush.color = strokeColor
      canvas.selection = false
    } else if (activeTool === 'eraser') {
      canvas.isDrawingMode = true
      // Use transparent color for eraser effect
      // (Fabric.js 5+ has EraserBrush, but for now, simulate by drawing white)
      canvas.freeDrawingBrush.width = strokeWidth * 2
      canvas.freeDrawingBrush.color = '#ffffff'
      canvas.selection = false
    } else {
      canvas.isDrawingMode = false
      canvas.selection = false
    }
  }, [activeTool, strokeColor, strokeWidth])

  // Canvas setup
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
        isDrawingMode: true
      })
      fabricCanvasRef.current = canvas
      canvas.freeDrawingBrush.width = strokeWidth
      canvas.freeDrawingBrush.color = strokeColor

      // Mouse events for shape tools
      let startX = 0, startY = 0, tempObj: any = null
      let polygonTempPoints: any[] = []
      let curvePath: any = null
      let isMouseDown = false

      const onMouseDown = (opt: any) => {
        if (activeTool === 'rect' || activeTool === 'ellipse' || activeTool === 'line' || activeTool === 'curve') {
          isMouseDown = true
          const pointer = canvas.getPointer(opt.e)
          startX = pointer.x
          startY = pointer.y
          if (activeTool === 'rect') {
            tempObj = new fabric.Rect({
              left: startX,
              top: startY,
              width: 0,
              height: 0,
              fill: fillColor,
              stroke: strokeColor,
              strokeWidth,
              selectable: false,
              evented: false
            })
            canvas.add(tempObj)
          } else if (activeTool === 'ellipse') {
            tempObj = new fabric.Ellipse({
              left: startX,
              top: startY,
              rx: 0,
              ry: 0,
              fill: fillColor,
              stroke: strokeColor,
              strokeWidth,
              selectable: false,
              evented: false
            })
            canvas.add(tempObj)
          } else if (activeTool === 'line') {
            tempObj = new fabric.Line([startX, startY, startX, startY], {
              stroke: strokeColor,
              strokeWidth,
              selectable: false,
              evented: false
            })
            canvas.add(tempObj)
          } else if (activeTool === 'curve') {
            // Start a quadratic curve (2 points, 1 control)
            curvePath = new fabric.Path(`M ${startX} ${startY} Q ${startX} ${startY} ${startX} ${startY}`, {
              stroke: strokeColor,
              strokeWidth,
              fill: 'rgba(0,0,0,0)',
              selectable: false,
              evented: false
            })
            canvas.add(curvePath)
          }
        } else if (activeTool === 'polygon') {
          const pointer = canvas.getPointer(opt.e)
          polygonTempPoints.push({ x: pointer.x, y: pointer.y })
          if (polygonTempPoints.length > 1) {
            if (drawingObject) canvas.remove(drawingObject)
            const poly = new fabric.Polygon(polygonTempPoints, {
              fill: fillColor,
              stroke: strokeColor,
              strokeWidth,
              selectable: false,
              evented: false
            })
            setDrawingObject(poly)
            canvas.add(poly)
          }
        }
      }

      const onMouseMove = (opt: any) => {
        if (!isMouseDown) return
        const pointer = canvas.getPointer(opt.e)
        if (activeTool === 'rect' && tempObj) {
          tempObj.set({
            width: Math.abs(pointer.x - startX),
            height: Math.abs(pointer.y - startY),
            left: Math.min(pointer.x, startX),
            top: Math.min(pointer.y, startY)
          })
          canvas.renderAll()
        } else if (activeTool === 'ellipse' && tempObj) {
          tempObj.set({
            rx: Math.abs(pointer.x - startX) / 2,
            ry: Math.abs(pointer.y - startY) / 2,
            left: Math.min(pointer.x, startX),
            top: Math.min(pointer.y, startY)
          })
          canvas.renderAll()
        } else if (activeTool === 'line' && tempObj) {
          tempObj.set({ x2: pointer.x, y2: pointer.y })
          canvas.renderAll()
        } else if (activeTool === 'curve' && curvePath) {
          // Update control point for quadratic curve
          const pathStr = `M ${startX} ${startY} Q ${(startX + pointer.x) / 2} ${(startY + pointer.y) / 2} ${pointer.x} ${pointer.y}`
          curvePath.set({ path: new fabric.Path(pathStr).path })
          canvas.renderAll()
        }
      }

      const onMouseUp = (opt: any) => {
        if (activeTool === 'rect' || activeTool === 'ellipse' || activeTool === 'line') {
          isMouseDown = false
          tempObj && tempObj.set({ selectable: true, evented: true })
          tempObj = null
        } else if (activeTool === 'curve') {
          isMouseDown = false
          curvePath && curvePath.set({ selectable: true, evented: true })
          curvePath = null
        }
      }

      // Polygon: double click to finish
      const onDblClick = (opt: any) => {
        if (activeTool === 'polygon' && polygonTempPoints.length > 2) {
          if (drawingObject) drawingObject.set({ selectable: true, evented: true })
          polygonTempPoints = []
          setDrawingObject(null)
        }
      }

      // Attach events
      canvas.on('mouse:down', onMouseDown)
      canvas.on('mouse:move', onMouseMove)
      canvas.on('mouse:up', onMouseUp)
      canvas.on('mouse:dblclick', onDblClick)

      return () => {
        canvas.off('mouse:down', onMouseDown)
        canvas.off('mouse:move', onMouseMove)
        canvas.off('mouse:up', onMouseUp)
        canvas.off('mouse:dblclick', onDblClick)
        canvas.dispose()
      }
    }
  }, [])

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

  const clearCanvas = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.clear()
      fabricCanvasRef.current.backgroundColor = '#ffffff'
      fabricCanvasRef.current.renderAll()
    }
  }

  const saveSketch = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL({
        format: 'png',
        quality: 1
      })
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
    // Sample base64 PNG (tiny transparent pixel for demo, replace with real sample for production)
    const sampleSketch =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='
    const samplePrompt = 'Lehenga with floral embroidery and pastel shades'
    localStorage.setItem('sketchImage', sampleSketch)
    localStorage.setItem('prompt', samplePrompt)
    localStorage.setItem('demoMode', 'true')
    // Optionally, you could also preload a sample AI output in GeneratedDesign.tsx if needed
    navigate('/design/generated')
  }

  // Color palette
  const COLORS = ['#000000', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFE66D', '#A8E6CF', '#FF8B94', '#FFA07A']

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-meesho-dark mb-2">Design Your Outfit</h1>
        <p className="text-gray-600">Sketch your ideas and let AI bring them to life!</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Toolbar */}
        <div className="lg:w-64 w-full flex flex-col gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-meesho-dark mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Tools
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {TOOLBAR.map((tool) => (
                <button
                  key={tool.key}
                  onClick={() => setActiveTool(tool.key)}
                  className={`flex flex-col items-center justify-center w-14 h-14 rounded-lg border-2 transition-colors ${activeTool === tool.key ? 'border-meesho-primary bg-meesho-primary/10' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
                  title={tool.label}
                >
                  {tool.icon}
                  <span className="text-xs mt-1">{tool.label}</span>
                </button>
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Stroke Color</label>
              <div className="flex gap-2 mb-2">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setStrokeColor(color)}
                    className="w-7 h-7 rounded-full border-2 border-gray-300 hover:border-meesho-primary transition-colors"
                    style={{ backgroundColor: color }}
                  />
                ))}
                <input
                  type="color"
                  value={strokeColor}
                  onChange={e => setStrokeColor(e.target.value)}
                  className="w-7 h-7 p-0 border-none bg-transparent cursor-pointer"
                  title="Custom color"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fill Color</label>
              <div className="flex gap-2 mb-2">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setFillColor(color)}
                    className="w-7 h-7 rounded-full border-2 border-gray-300 hover:border-meesho-primary transition-colors"
                    style={{ backgroundColor: color }}
                  />
                ))}
                <input
                  type="color"
                  value={fillColor.startsWith('rgba') ? '#ffffff' : fillColor}
                  onChange={e => setFillColor(e.target.value)}
                  className="w-7 h-7 p-0 border-none bg-transparent cursor-pointer"
                  title="Custom fill"
                />
                <button
                  onClick={() => setFillColor('rgba(0,0,0,0)')}
                  className="w-7 h-7 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs text-gray-500"
                  title="No fill"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Stroke Width</label>
              <input
                type="range"
                min={1}
                max={30}
                value={strokeWidth}
                onChange={e => setStrokeWidth(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-gray-500 mt-1">{strokeWidth}px</div>
            </div>
            <div className="space-y-3">
              <button
                onClick={clearCanvas}
                className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
              <button
                onClick={saveSketch}
                className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-meesho-secondary hover:bg-meesho-secondary/90 text-white rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Sketch</span>
              </button>
              <button
                onClick={generateAIDesign}
                disabled={isDrawing}
                className="w-full flex items-center justify-center space-x-2 py-2 px-4 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDrawing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate AI Design</span>
                  </>
                )}
              </button>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Describe your outfit idea</label>
                <textarea
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  placeholder="e.g. Lehenga with floral embroidery and pastel shades"
                  className="w-full p-2 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-meesho-primary focus:border-transparent"
                  rows={2}
                />
              </div>
              <button
                onClick={previewWithAI}
                className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-meesho-primary text-white rounded-lg transition-colors mt-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Preview with AI</span>
              </button>
              <button
                onClick={demoMode}
                className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-gray-300 text-gray-800 rounded-lg transition-colors mt-2"
              >
                <span role="img" aria-label="Demo">🎬</span>
                <span>Demo Mode</span>
              </button>
            </div>
          </div>
        </div>
        {/* Canvas */}
        <div className="flex-1">
          <div className="card">
            <div className="flex justify-center">
              <canvas
                ref={canvasRef}
                className="border border-gray-200 rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Instructions */}
      <div className="mt-8 card">
        <h3 className="text-lg font-semibold text-meesho-dark mb-3">How to Use</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <strong className="text-meesho-dark">1. Sketch Your Idea</strong>
            <p>Use the drawing tools to sketch your outfit design on the canvas.</p>
          </div>
          <div>
            <strong className="text-meesho-dark">2. Customize</strong>
            <p>Choose different colors and brush sizes to create your perfect design.</p>
          </div>
          <div>
            <strong className="text-meesho-dark">3. Generate AI Design</strong>
            <p>Click "Generate AI Design" to transform your sketch into a stunning dress.</p>
          </div>
        </div>
      </div>
    </div>
  )
} 