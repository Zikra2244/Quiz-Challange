import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiUser,
  FiMapPin,
  FiLink,
  FiTwitter,
  FiGithub,
  FiLinkedin,
  FiSave,
} from "react-icons/fi";
import Button from "../../../../components/ui/Button/Button";
import useClickOutside from "../../../../hooks/useClickOutside";

const EditProfileModal = ({ isOpen, onClose, profile, onSave }) => {
  const modalRef = useClickOutside(onClose);

  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    location: "",
    website: "",
    twitter: "",
    github: "",
    linkedin: "",
  });

  const [selectedAvatar, setSelectedAvatar] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        displayName: profile.displayName || profile.username || "",
        bio: profile.bio || "",
        location: profile.location || "",
        website: profile.website || "",
        twitter: profile.social?.twitter || "",
        github: profile.social?.github || "",
        linkedin: profile.social?.linkedin || "",
      });
      setSelectedAvatar(profile.avatar);
    }
  }, [profile]);

  const avatars = [
    { id: 1, icon: "👨‍🎓", name: "Student" },
    { id: 2, icon: "👩‍🔬", name: "Scientist" },
    { id: 3, icon: "🧑‍💻", name: "Developer" },
    { id: 4, icon: "👨‍🏫", name: "Teacher" },
    { id: 5, icon: "👩‍🎨", name: "Artist" },
    { id: 6, icon: "🧑‍🚀", name: "Astronaut" },
    { id: 7, icon: "👨‍⚕️", name: "Doctor" },
    { id: 8, icon: "👩‍⚖️", name: "Judge" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave({
      ...profile,
      displayName: formData.displayName,
      bio: formData.bio,
      location: formData.location,
      website: formData.website,
      avatar: selectedAvatar,
      social: {
        twitter: formData.twitter,
        github: formData.github,
        linkedin: formData.linkedin,
      },
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h2 className="text-2xl font-display font-bold text-white">
                  Edit Profile
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 glass rounded-lg hover:bg-white/5 transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Profile Avatar
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                    {avatars.map((avatar) => (
                      <button
                        key={avatar.id}
                        type="button"
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`
                          p-3 glass rounded-lg transition-all
                          ${
                            selectedAvatar?.id === avatar.id
                              ? "ring-2 ring-primary-500 bg-primary-500/20"
                              : "hover:bg-white/5"
                          }
                        `}
                      >
                        <span className="text-3xl block mb-1">
                          {avatar.icon}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {avatar.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Display Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiUser className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Your display name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                    className="block w-full px-3 py-3 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Tell something about yourself..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMapPin className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="City, Country"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLink className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">
                    Social Links
                  </h3>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiTwitter className="h-5 w-5 text-blue-400" />
                    </div>
                    <input
                      type="text"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Twitter username"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiGithub className="h-5 w-5 text-gray-300" />
                    </div>
                    <input
                      type="text"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="GitHub username"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLinkedin className="h-5 w-5 text-blue-500" />
                    </div>
                    <input
                      type="text"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 glass rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="LinkedIn username"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-white/10">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    <FiSave className="mr-2" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
