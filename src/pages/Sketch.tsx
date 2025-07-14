import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fabric } from 'fabric'
import { Trash2, Save, Sparkles, Palette } from 'lucide-react'

export default function Sketch() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null)
  const navigate = useNavigate()
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
        isDrawingMode: true,
        brushWidth: 5,
        brushColor: '#000000'
      })

      fabricCanvasRef.current = canvas

      // Set up drawing mode
      canvas.freeDrawingBrush.width = 5
      canvas.freeDrawingBrush.color = '#000000'

      return () => {
        canvas.dispose()
      }
    }
  }, [])

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
      
      // For demo purposes, we'll navigate to the generated design page
      navigate('/design/demo-123')
    }
  }

  const generateAIDesign = () => {
    if (fabricCanvasRef.current) {
      // Simulate AI generation
      setIsDrawing(true)
      
      setTimeout(() => {
        setIsDrawing(false)
        // Navigate to generated design page
        navigate('/design/demo-123')
      }, 2000)
    }
  }

  const setBrushColor = (color: string) => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.freeDrawingBrush.color = color
    }
  }

  const setBrushSize = (size: number) => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.freeDrawingBrush.width = size
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-meesho-dark mb-2">Design Your Outfit</h1>
        <p className="text-gray-600">Sketch your ideas and let AI bring them to life!</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tools Panel */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-lg font-semibold text-meesho-dark mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Drawing Tools
            </h3>
            
            {/* Color Palette */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Colors</h4>
              <div className="grid grid-cols-4 gap-2">
                {['#000000', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFE66D', '#A8E6CF', '#FF8B94', '#FFA07A'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setBrushColor(color)}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-meesho-primary transition-colors"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Brush Size */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Brush Size</h4>
              <div className="space-y-2">
                {[2, 5, 10, 15].map((size) => (
                  <button
                    key={size}
                    onClick={() => setBrushSize(size)}
                    className="w-full py-2 px-3 text-left text-sm rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div 
                        className="bg-black rounded-full mr-3"
                        style={{ width: size, height: size }}
                      />
                      {size}px
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={clearCanvas}
                className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear Canvas</span>
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
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="lg:col-span-3">
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