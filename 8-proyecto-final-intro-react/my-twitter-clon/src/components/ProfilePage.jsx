"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Posts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [profileData, setProfileData] = useState({
    profilePhoto: "",
    headerImage: "",
    bio: "",
    location: "",
  });

  const { username } = useParams();
  const [tempData, setTempData] = useState({
    profilePhoto: "",
    headerImage: "",
    bio: "",
    location: "",
  });

  const profilePhotoRef = useRef(null);
  const headerImageRef = useRef(null);

  const tabs = ["Posts", "Respuestas", "Destacados", "Artículos", "Multimedia", "Me gusta"];

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("twitterProfileData");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setProfileData(parsed);
        setTempData(parsed);
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    setModalStep(1);
    setTempData(profileData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalStep(1);
  };

  const nextStep = () => {
    if (modalStep < 5) {
      setModalStep(modalStep + 1);
    }
  };

  const prevStep = () => {
    if (modalStep > 1) {
      setModalStep(modalStep - 1);
    }
  };

  const handleFileChange = (type, file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      setTempData((prev) => ({
        ...prev,
        [type]: result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    setProfileData(tempData);
    localStorage.setItem("twitterProfileData", JSON.stringify(tempData));
    closeModal();
  };

  const renderTabContent = () => {
    const mockPosts = [
      {
        id: 1,
        content:
          "Just shipped a new feature! 🚀 Really excited about this one.",
        time: "2h",
        likes: 24,
        retweets: 8,
        replies: 3,
      },
      {
        id: 2,
        content: "Beautiful sunset today ☀️ Nature never fails to amaze me.",
        time: "5h",
        likes: 156,
        retweets: 23,
        replies: 12,
      },
      {
        id: 3,
        content:
          "Working on something exciting... Can't wait to share it with everyone! 💻",
        time: "1d",
        likes: 89,
        retweets: 12,
        replies: 7,
      },
    ];

    const mockMedia = Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      src: `/placeholder.svg?height=200&width=200&text=Image${i + 1}`,
      alt: `Media ${i + 1}`,
    }));

    switch (activeTab) {
      case "Posts":
        return (
          <div className="space-y-4">
            {mockPosts.map((post) => (
              <div key={post.id} className="border-b border-gray-800 pb-4">
                <div className="flex space-x-3">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex-shrink-0 overflow-hidden">
                    {profileData.profilePhoto ? (
                      <img
                        src={profileData.profilePhoto || "/placeholder.svg"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-600"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white">John Doe</span>
                      <span className="text-gray-500">@johndoe</span>
                      <span className="text-gray-500">·</span>
                      <span className="text-gray-500">{post.time}</span>
                    </div>
                    <p className="mt-1 text-white">{post.content}</p>
                    <div className="flex space-x-6 mt-3 text-gray-500">
                      <button className="hover:text-blue-400 transition-colors">
                        💬 {post.replies}
                      </button>
                      <button className="hover:text-green-400 transition-colors">
                        🔄 {post.retweets}
                      </button>
                      <button className="hover:text-red-400 transition-colors">
                        ❤️ {post.likes}
                      </button>
                      <button className="hover:text-blue-400 transition-colors">
                        📤
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case "Media":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {mockMedia.map((media) => (
              <div
                key={media.id}
                className="aspect-square bg-gray-800 rounded-lg overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
              >
                <img
                  src={media.src || "/placeholder.svg"}
                  alt={media.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        );
      case "Replies":
        return (
          <div className="space-y-4">
            <div className="border-b border-gray-800 pb-4">
              <div className="flex space-x-3">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">John Doe</span>
                    <span className="text-gray-500">@johndoe</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-500">3h</span>
                  </div>
                  <p className="mt-1 text-white">
                    Replying to <span className="text-blue-400">@someone</span>
                  </p>
                  <p className="text-white">
                    Thanks for sharing this! Really helpful insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-12 text-gray-500">
            <p>No {activeTab.toLowerCase()} yet</p>
          </div>
        );
    }
  };

  const renderModalStep = () => {
    switch (modalStep) {
      case 1:
        return (
          <div className="text-center">
            <div className="mb-8">
              <img
                src={
                  tempData.profilePhoto ||
                  "/placeholder.svg?height=128&width=128&text=Profile"
                }
                alt="Profile"
                className="w-32 h-32 mx-auto rounded-full bg-gray-700 cursor-pointer hover:opacity-80 transition-opacity object-cover"
                onClick={() => profilePhotoRef.current?.click()}
              />
              <input
                ref={profilePhotoRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileChange("profilePhoto", file);
                }}
              />
            </div>
            <button
              onClick={nextStep}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                tempData.profilePhoto
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-black text-white border border-gray-600 hover:border-gray-500 hover:bg-gray-900"
              }`}
            >
              {tempData.profilePhoto ? "Next" : "Discard for now"}
            </button>
          </div>
        );
      case 2:
        return (
          <div className="text-center">
            <div className="mb-8">
              <img
                src={
                  tempData.headerImage ||
                  "/placeholder.svg?height=128&width=320&text=Header"
                }
                alt="Header"
                className="w-full h-32 mx-auto bg-gray-700 cursor-pointer hover:opacity-80 transition-opacity rounded-lg object-cover"
                onClick={() => headerImageRef.current?.click()}
              />
              <input
                ref={headerImageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileChange("headerImage", file);
                }}
              />
            </div>
            <button
              onClick={nextStep}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                tempData.headerImage
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-black text-white border border-gray-600 hover:border-gray-500 hover:bg-gray-900"
              }`}
            >
              {tempData.headerImage ? "Next" : "Discard for now"}
            </button>
          </div>
        );
      case 3:
        return (
          <div>
            <textarea
              value={tempData.bio}
              onChange={(e) =>
                setTempData((prev) => ({ ...prev, bio: e.target.value }))
              }
              placeholder="Tell the world about yourself..."
              className="w-full h-32 p-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500 mb-2"
              maxLength={160}
            />
            <div className="text-right text-gray-400 text-sm mb-8">
              {tempData.bio.length}/160
            </div>
            <div className="text-center">
              <button
                onClick={nextStep}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  tempData.bio.trim()
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-black text-white border border-gray-600 hover:border-gray-500 hover:bg-gray-900"
                }`}
              >
                {tempData.bio.trim() ? "Next" : "Discard for now"}
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <input
              type="text"
              value={tempData.location}
              onChange={(e) =>
                setTempData((prev) => ({ ...prev, location: e.target.value }))
              }
              placeholder="Where do you live?"
              className="w-full p-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 mb-8"
            />
            <div className="text-center">
              <button
                onClick={nextStep}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  tempData.location.trim()
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-black text-white border border-gray-600 hover:border-gray-500 hover:bg-gray-900"
                }`}
              >
                {tempData.location.trim() ? "Next" : "Discard for now"}
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="text-center">
            <p className="text-white text-lg mb-8">Click to save updates</p>
            <button
              onClick={saveProfile}
              className="px-6 py-2 rounded-full font-medium bg-white text-black hover:bg-gray-100 transition-colors"
            >
              Save
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <div className="px-4 md:px-8 pt-6">
          <h2 className="text-2xl font-bold">Perfil de {username}</h2>
        </div>

        {/* Profile Header Section */}
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-48 md:h-64 bg-gray-800 relative overflow-hidden">
            {profileData.headerImage ? (
              <img
                src={profileData.headerImage || "/placeholder.svg"}
                alt="Header"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
            )}
          </div>

          {/* Profile Photo */}
          <div className="absolute -bottom-16 left-4 md:left-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-black bg-gray-600 overflow-hidden">
              {profileData.profilePhoto ? (
                <img
                  src={profileData.profilePhoto || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-600"></div>
              )}
            </div>
          </div>
        </div>

        {/* Configure Profile Button */}
        <div className="px-4 md:px-8 pt-20 pb-4">
          <div className="flex justify-end mb-4">
            <button
              onClick={openModal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              Configure Profile
            </button>
          </div>

          {/* Profile Details */}
          <div>
            <h1 className="text-xl md:text-2xl font-bold">John Doe</h1>
            <p className="text-gray-400">@johndoe</p>
            {profileData.bio && (
              <p className="mt-3 text-white">{profileData.bio}</p>
            )}
            <div className="flex items-center space-x-4 mt-3 text-gray-400 text-sm">
              {profileData.location && (
                <div className="flex items-center space-x-1">
                  <span>📍</span>
                  <span>{profileData.location}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <span>📅</span>
                <span>Joined March 2020</span>
              </div>
            </div>
            <div className="flex space-x-6 mt-3 text-sm">
              <span>
                <strong className="text-white">1,234</strong>{" "}
                <span className="text-gray-400">Following</span>
              </span>
              <span>
                <strong className="text-white">5,678</strong>{" "}
                <span className="text-gray-400">Followers</span>
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800">
          <div className="flex overflow-x-auto scrollbar-hide px-4 md:px-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-4 py-4 text-sm font-medium transition-colors relative hover:bg-gray-900 ${
                  activeTab === tab
                    ? "text-blue-500"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 md:p-8 min-h-screen">{renderTabContent()}</div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-black border border-gray-800 rounded-2xl w-full max-w-md p-6 relative">
            {/* Back Arrow - Only visible from step 2 onward */}
            {modalStep > 1 && (
              <button
                onClick={prevStep}
                className="absolute top-4 left-4 p-2 hover:bg-gray-900 rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-gray-900 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="mt-8">{renderModalStep()}</div>
          </div>
        </div>
      )}
    </div>
  );
}
