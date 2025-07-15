import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Heart, MessageCircle, Share2, Download } from 'lucide-react'

interface Comment {
  id: string
  user: string
  text: string
  timestamp: string
}

export default function GeneratedDesign() {
  const { id } = useParams()
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(42)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: 'Sarah Designer',
      text: 'This is absolutely stunning! Love the color combination.',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      user: 'Mike Creative',
      text: 'The AI really captured the essence of your sketch perfectly!',
      timestamp: '1 hour ago'
    }
  ])

  // New state for AI image generation
  const [isGenerating, setIsGenerating] = useState(true)
  const [designImage, setDesignImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sketchImage, setSketchImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState<string | null>(null)

  const demoAIImage = "https://your-static-image-url.com/sample-ai-output.png";
  const demoSketch = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=';
  const demoPrompt = 'Lehenga with floral embroidery and pastel shades';

  useEffect(() => {
    // Detect demo mode
    const isDemo = localStorage.getItem('demoMode') === 'true';
    if (isDemo) {
      setPrompt(demoPrompt);
      setSketchImage(demoSketch);
      setDesignImage(demoAIImage);
      setIsGenerating(false);
      setError(null);
      // Optionally clear demoMode after use
      // localStorage.removeItem('demoMode');
      return;
    }
    // Retrieve sketch image and prompt from localStorage
    const img = localStorage.getItem('sketchImage')
    const userPrompt = localStorage.getItem('prompt') || 'Convert this sketch into a fashion outfit'
    setPrompt(userPrompt)
    setSketchImage(img)
    setIsGenerating(true)
    setError(null)
    setDesignImage(null)

    const generateDesign = async () => {
      try {
        const response = await fetch('/api/generate-design', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: userPrompt,
            sketchImage: img,
          }),
        })
        const data = await response.json()
        if (!response.ok || data.error) {
          setError('Failed to generate design')
          setIsGenerating(false)
          return
        }
        // If Replicate returns a status URL, poll it
        if (data.urls && data.urls.get) {
          let status = data.status
          let pollUrl = data.urls.get
          let pollResult = data
          while (status && status !== 'succeeded' && status !== 'failed' && status !== 'canceled') {
            await new Promise(res => setTimeout(res, 2000))
            const pollRes = await fetch(pollUrl)
            pollResult = await pollRes.json()
            status = pollResult.status
          }
          if (status === 'succeeded' && pollResult.output) {
            setDesignImage(Array.isArray(pollResult.output) ? pollResult.output[0] : pollResult.output)
            setIsGenerating(false)
          } else {
            setError('Failed to generate design')
            setIsGenerating(false)
          }
        } else if (data.output) {
          setDesignImage(Array.isArray(data.output) ? data.output[0] : data.output)
          setIsGenerating(false)
        } else {
          setError('Failed to generate design')
          setIsGenerating(false)
        }
      } catch (err) {
        setError('Failed to generate design')
        setIsGenerating(false)
      }
    }
    if (img) {
      generateDesign()
    } else {
      setError('No sketch image found')
      setIsGenerating(false)
    }
    // No timeout needed anymore
  }, [id])

  const handleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }

  const handleComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        user: 'You',
        text: newComment,
        timestamp: 'Just now'
      }
      setComments([comment, ...comments])
      setNewComment('')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-meesho-dark mb-2">Your AI-Generated Design</h1>
        <p className="text-gray-600">Share your creation with the community!</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Design Image */}
        <div className="card">
          {prompt && (
            <div style={{ marginBottom: '1rem', fontStyle: 'italic' }}>
              🧵 Prompt: {prompt}
            </div>
          )}
          <div className="relative min-h-[400px] flex items-center justify-center">
            {isGenerating && (
              <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-meesho-primary mb-4"></div>
                <span className="text-meesho-primary font-medium">Generating your design...</span>
                {sketchImage && (
                  <div className="mt-4">
                    <span className="block text-xs text-gray-400 mb-1">Your Sketch Preview</span>
                    <img src={sketchImage} alt="Sketch Preview" className="w-32 h-auto border rounded shadow" />
                  </div>
                )}
              </div>
            )}
            {error && !isGenerating && (
              <div className="flex flex-col items-center justify-center w-full h-full min-h-[400px]">
                <span className="text-red-500 font-medium mb-2">{error}</span>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setIsGenerating(true)
                    setError(null)
                    setDesignImage(null)
                    // Retry logic (simulate again)
                    setTimeout(() => {
                      setDesignImage('https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop')
                      setIsGenerating(false)
                    }, 2000)
                  }}
                >
                  Try Again
                </button>
              </div>
            )}
            {designImage && !isGenerating && !error && (
              <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ flex: '1 1 250px', minWidth: 0 }}>
                  <h4 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Your Sketch</h4>
                  <img
                    src={sketchImage || ''}
                    alt="User sketch"
                    style={{ maxWidth: '100%', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  />
                </div>
                <div style={{ flex: '1 1 250px', minWidth: 0 }}>
                  <h4 style={{ marginBottom: '0.5rem', fontWeight: 600 }}>AI Output</h4>
                  <img
                    src={designImage}
                    alt="Generated design"
                    style={{ maxWidth: '100%', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  />
                </div>
              </div>
            )}
            <div className="absolute top-4 right-4">
              <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors">
                <Download className="w-5 h-5 text-meesho-dark" />
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                liked 
                  ? 'bg-meesho-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              <span>{likes}</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{comments.length}</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Design Details */}
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-meesho-dark mb-4">Design Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Style:</span>
                <span className="font-medium">Elegant Evening Dress</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Color Palette:</span>
                <span className="font-medium">Rose Gold & Navy</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fabric:</span>
                <span className="font-medium">Silk & Lace</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Generated:</span>
                <span className="font-medium">2 hours ago</span>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="card">
              <h3 className="text-lg font-semibold text-meesho-dark mb-4">Comments</h3>
              
              {/* Add Comment */}
              <div className="mb-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-meesho-primary focus:border-transparent"
                  rows={3}
                />
                <button
                  onClick={handleComment}
                  disabled={!newComment.trim()}
                  className="mt-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post Comment
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-meesho-dark">{comment.user}</span>
                      <span className="text-xs text-gray-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-gray-700">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Designs */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-meesho-dark mb-6">More Designs You'll Love</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card p-0 overflow-hidden">
              <img
                src={`https://images.unsplash.com/photo-${1595777457583 + i}?w=300&h=400&fit=crop`}
                alt={`Design ${i}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-meesho-dark mb-2">Elegant Design {i}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>By Designer {i}</span>
                  <span>❤️ {Math.floor(Math.random() * 50) + 10}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 