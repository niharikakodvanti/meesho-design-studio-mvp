import { useState } from 'react'
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

  // Mock AI-generated design image
  const designImage = 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop'

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-meesho-dark mb-2">Your AI-Generated Design</h1>
        <p className="text-gray-600">Share your creation with the community!</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Design Image */}
        <div className="card">
          <div className="relative">
            <img
              src={designImage}
              alt="AI Generated Dress Design"
              className="w-full h-auto rounded-lg shadow-lg"
            />
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