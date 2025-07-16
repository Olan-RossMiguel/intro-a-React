"use client"

import { useState, useEffect, useRef } from "react"
import {
  ImageIcon,
  FileImage,
  BarChart3,
  Smile,
  Calendar,
  MapPin,
  MessageCircle,
  Repeat2,
  Heart,
  Eye,
  Bookmark,
  Share,
  X,
} from "lucide-react"

// Mock user data for the feed
const mockUsers = {
  you: { name: "You", handle: "@you", profilePic: "/placeholder.svg?height=48&width=48&text=You" },
  elon: { name: "Elon Musk", handle: "@elonmusk", profilePic: "/placeholder.svg?height=48&width=48&text=E" },
  vercel: { name: "Vercel", handle: "@vercel", profilePic: "/placeholder.svg?height=48&width=48&text=V" },
  react: { name: "React", handle: "@reactjs", profilePic: "/placeholder.svg?height=48&width=48&text=R" },
  nextjs: { name: "Next.js", handle: "@nextjs", profilePic: "/placeholder.svg?height=48&width=48&text=N" },
}

// Mock posts for "For you" feed
const initialMockPosts = [
  {
    id: "mock1",
    userId: "elon",
    text: "Excited about the future of AI! It's going to change everything. #AI #Future",
    media: null,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    likes: 12345,
    retweets: 5678,
    comments: 1234,
    views: 123456,
  },
  {
    id: "mock2",
    userId: "vercel",
    text: "Building the Web, one deployment at a time. Check out our latest features: https://vercel.com/features",
    media: { type: "image", url: "/placeholder.svg?height=300&width=500&text=Vercel+Feature" },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    likes: 8765,
    retweets: 2345,
    comments: 567,
    views: 87654,
  },
  {
    id: "mock3",
    userId: "react",
    text: "New React docs are amazing! Learn more at https://react.dev",
    media: null,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    likes: 9876,
    retweets: 3456,
    comments: 789,
    views: 98765,
  },
  {
    id: "mock4",
    userId: "nextjs",
    text: "Server Components are a game changer for performance. What are your thoughts? #Nextjs #React",
    media: null,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(), // 10 hours ago
    likes: 7654,
    retweets: 1234,
    comments: 456,
    views: 76543,
  },
]

const initialFollowingPosts = [
  initialMockPosts[0], 
  initialMockPosts[2], 
]

export default function Home() {
  const [activeFeedTab, setActiveFeedTab] = useState("For you") // "For you" or "Following"
  const [postText, setPostText] = useState("")
  const [selectedMedia, setSelectedMedia] = useState(null) // { type: 'image'|'video', url: string, name: string }
  const [posts, setPosts] = useState([]) // User-created posts
  const fileInputRef = useRef(null)


  useEffect(() => {
    const savedPosts = localStorage.getItem("twitterUserPosts")
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts))
      } catch (error) {
        console.error("Error loading user posts:", error)
      }
    }
  }, [])


  useEffect(() => {
    localStorage.setItem("twitterUserPosts", JSON.stringify(posts))
  }, [posts])

  const handleImageSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedMedia({
          type: file.type.startsWith("video/") ? "video" : "image",
          url: e.target.result,
          name: file.name,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeMedia = () => {
    setSelectedMedia(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handlePost = () => {
    if (postText.trim() || selectedMedia) {
      const newPost = {
        id: Date.now().toString(),
        userId: "you", // This post is from the current user
        text: postText,
        media: selectedMedia,
        timestamp: new Date().toISOString(),
        likes: 0,
        retweets: 0,
        comments: 0,
        views: 0,
      }

      setPosts([newPost, ...posts]) // Add new post to the top
      setPostText("")
      setSelectedMedia(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const postTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - postTime.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "now"
    if (diffInMinutes < 60) return `${diffInMinutes}m`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`
    return `${Math.floor(diffInMinutes / 1440)}d`
  }

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const renderPostContent = (text) => {
    // Regex to find URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = text.split(urlRegex)

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {part}
          </a>
        )
      }
      return part
    })
  }

  const isPostButtonEnabled = postText.trim().length > 0 || selectedMedia

  // Combine user posts with mock posts based on the active tab
  const displayedPosts =
    activeFeedTab === "For you" ? [...posts, ...initialMockPosts] : [...posts, ...initialFollowingPosts]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto border-x border-gray-800">
        {/* Header with Tabs */}
        <div className="sticky top-0 bg-black bg-opacity-80 backdrop-blur-md border-b border-gray-800 z-10">
          <div className="flex">
            <button
              onClick={() => setActiveFeedTab("For you")}
              className={`flex-1 py-4 text-center font-bold relative transition-colors ${
                activeFeedTab === "For you" ? "text-white" : "text-gray-500 hover:bg-gray-900"
              }`}
            >
              For you
              {activeFeedTab === "For you" && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-14 bg-blue-500 rounded-full"></div>
              )}
            </button>
            <button
              onClick={() => setActiveFeedTab("Following")}
              className={`flex-1 py-4 text-center font-bold relative transition-colors ${
                activeFeedTab === "Following" ? "text-white" : "text-gray-500 hover:bg-gray-900"
              }`}
            >
              Following
              {activeFeedTab === "Following" && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-14 bg-blue-500 rounded-full"></div>
              )}
            </button>
          </div>
        </div>

        {/* Post Composer */}
        <div className="border-b border-gray-800 p-4">
          <div className="flex space-x-3">
            {/* Profile Picture */}
            <div className="w-12 h-12 bg-gray-600 rounded-full flex-shrink-0 overflow-hidden">
              <img
                src={mockUsers.you.profilePic || "/placeholder.svg"}
                alt="Your profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Content */}
            <div className="flex-1">
              {/* Text Area */}
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="What's happening?"
                className="w-full bg-transparent text-xl placeholder-gray-500 resize-none border-none outline-none min-h-[120px]"
                maxLength={280}
              />

              {/* Media Preview */}
              {selectedMedia && (
                <div className="relative mt-3 rounded-2xl overflow-hidden border border-gray-700">
                  <button
                    onClick={removeMedia}
                    className="absolute top-2 left-2 bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-1 transition-colors z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  {selectedMedia.type === "image" ? (
                    <img
                      src={selectedMedia.url || "/placeholder.svg"}
                      alt="Selected media"
                      className="w-full max-h-96 object-cover"
                    />
                  ) : (
                    <video src={selectedMedia.url} controls className="w-full max-h-96" />
                  )}
                </div>
              )}

              {/* Actions Row */}
              <div className="flex items-center justify-between mt-4">
                {/* Left Icons */}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 p-2 rounded-full transition-colors"
                    aria-label="Add image or video"
                  >
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <button
                    className="text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 p-2 rounded-full transition-colors"
                    aria-label="Add GIF"
                  >
                    <FileImage className="w-5 h-5" /> {/* Using FileImage for GIF as per common practice */}
                  </button>
                  <button
                    className="text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 p-2 rounded-full transition-colors"
                    aria-label="Add poll"
                  >
                    <BarChart3 className="w-5 h-5" />
                  </button>
                  <button
                    className="text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 p-2 rounded-full transition-colors"
                    aria-label="Add emoji"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                  <button
                    className="text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 p-2 rounded-full transition-colors"
                    aria-label="Schedule post"
                  >
                    <Calendar className="w-5 h-5" />
                  </button>
                  <button
                    className="text-blue-500 hover:bg-blue-500 hover:bg-opacity-10 p-2 rounded-full transition-colors"
                    aria-label="Add location"
                  >
                    <MapPin className="w-5 h-5" />
                  </button>
                </div>

                {/* Character Count and Post Button */}
                <div className="flex items-center space-x-3">
                  {postText.length > 0 && <div className="text-sm text-gray-500">{280 - postText.length}</div>}
                  <button
                    onClick={handlePost}
                    disabled={!isPostButtonEnabled}
                    className={`px-6 py-2 rounded-full font-bold transition-colors ${
                      isPostButtonEnabled
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "bg-blue-500 bg-opacity-50 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Post
                  </button>
                </div>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div>
          {displayedPosts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No posts yet. Share what's happening!</p>
            </div>
          ) : (
            displayedPosts.map((post) => {
              const user = mockUsers[post.userId] || mockUsers.you // Fallback to 'you' if user not found
              return (
                <div
                  key={post.id}
                  className="border-b border-gray-800 p-4 hover:bg-gray-950 transition-colors cursor-pointer"
                >
                  <div className="flex space-x-3">
                    {/* Profile Picture */}
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex-shrink-0 overflow-hidden">
                      <img
                        src={user.profilePic || "/placeholder.svg"}
                        alt={`${user.name}'s profile`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Post Content */}
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">{user.name}</span>
                        <span className="text-gray-500">{user.handle}</span>
                        <span className="text-gray-500">·</span>
                        <span className="text-gray-500">{formatTimestamp(post.timestamp)}</span>
                      </div>

                      {/* Post Text */}
                      {post.text && (
                        <p className="mt-1 text-white whitespace-pre-wrap">{renderPostContent(post.text)}</p>
                      )}

                      {/* Post Media */}
                      {post.media && (
                        <div className="mt-3 rounded-2xl overflow-hidden border border-gray-700">
                          {post.media.type === "image" ? (
                            <img
                              src={post.media.url || "/placeholder.svg"}
                              alt="Post media"
                              className="w-full max-h-96 object-cover"
                            />
                          ) : (
                            <video src={post.media.url} controls className="w-full max-h-96" />
                          )}
                        </div>
                      )}

                      {/* Interaction Icons */}
                      <div className="flex items-center justify-between mt-3 max-w-md">
                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group">
                          <div className="p-2 rounded-full group-hover:bg-blue-500 group-hover:bg-opacity-10">
                            <MessageCircle className="w-5 h-5" />
                          </div>
                          <span className="text-sm">{formatNumber(post.comments)}</span>
                        </button>

                        <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors group">
                          <div className="p-2 rounded-full group-hover:bg-green-500 group-hover:bg-opacity-10">
                            <Repeat2 className="w-5 h-5" />
                          </div>
                          <span className="text-sm">{formatNumber(post.retweets)}</span>
                        </button>

                        <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors group">
                          <div className="p-2 rounded-full group-hover:bg-red-500 group-hover:bg-opacity-10">
                            <Heart className="w-5 h-5" />
                          </div>
                          <span className="text-sm">{formatNumber(post.likes)}</span>
                        </button>

                        <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group">
                          <div className="p-2 rounded-full group-hover:bg-blue-500 group-hover:bg-opacity-10">
                            <Eye className="w-5 h-5" />
                          </div>
                          <span className="text-sm">{formatNumber(post.views)}</span>
                        </button>

                        <div className="flex items-center space-x-1">
                          <button
                            className="text-gray-500 hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-blue-500 hover:bg-opacity-10"
                            aria-label="Bookmark post"
                          >
                            <Bookmark className="w-5 h-5" />
                          </button>
                          <button
                            className="text-gray-500 hover:text-blue-500 transition-colors p-2 rounded-full hover:bg-blue-500 hover:bg-opacity-10"
                            aria-label="Share post"
                          >
                            <Share className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
