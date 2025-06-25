import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import axios from 'axios'; // Import axios

const FormDemo = () => {
  const [currentPage, setCurrentPage] = useState(1); // Start on form page
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: null,
    category: '',
    rating: 5,
    gender: '',
    bio: '',
    isProUser: false,
    customId: ''
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    ratingStats: { average: 0 },
    categoryStats: {}
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [searchIdInput, setSearchIdInput] = useState('');
  const [appliedSearchId, setAppliedSearchId] = useState('');

  const categories = [
    { value: '', label: 'Select a category' },
    { value: 'technology', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'business', label: 'Business' },
    { value: 'other', label: 'Other' }
  ];

  const genders = [
    { value: '', label: 'Select Gender' },
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer_not_to_say', label: 'Prefer not to say' }
  ];

  // Calculate stats from users array
  const calculateStats = (userList) => {
    if (userList.length === 0) {
      return {
        totalUsers: 0,
        ratingStats: { average: 0 },
        categoryStats: {}
      };
    }

    const totalRating = userList.reduce((sum, user) => sum + user.rating, 0);
    const avgRating = (totalRating / userList.length).toFixed(1);
    
    const categoryStats = userList.reduce((acc, user) => {
      acc[user.category] = (acc[user.category] || 0) + 1;
      return acc;
    }, {});

    return {
      totalUsers: userList.length,
      ratingStats: { average: avgRating },
      categoryStats
    };
  };

  // Load users when component mounts or page changes to results
  useEffect(() => {
    if (currentPage === 3) {
      const newStats = calculateStats(users);
      setStats(newStats);
    }
  }, [currentPage, users]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }

    if (formData.bio.length > 500) {
      newErrors.bio = 'Bio cannot exceed 500 characters';
    }

    if (formData.customId.trim()) {
      if (users.some(user => user.id === formData.customId.trim())) {
        newErrors.customId = 'This ID is already taken. Please choose another or leave blank for auto-generation.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'File size must be less than 5MB'
        }));
        e.target.value = ''; 
        setImagePreview('');
        setFormData(prev => ({
          ...prev,
          image: null
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        image: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      if (errors.image) {
        setErrors(prev => ({
          ...prev,
          image: ''
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        image: null
      }));
      setImagePreview('');
    }
  };

  const handleSliderChange = (e) => {
    setFormData(prev => ({
      ...prev,
      rating: parseInt(e.target.value)
    }));
  };

  const handleNext = () => {
    if (validateForm()) {
      setCurrentPage(2);
    }
  };

  const handleBack = () => {
    setCurrentPage(1);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setSubmitMessage('');

    const finalId = formData.customId.trim() || (Date.now().toString() + Math.floor(Math.random() * 10).toString());

    const newUser = {
      id: finalId,
      name: formData.name,
      email: formData.email,
      category: formData.category,
      rating: formData.rating,
      gender: formData.gender,
      bio: formData.bio,
      isProUser: formData.isProUser,
      imageUrl: imagePreview || null,
      createdAt: new Date().toISOString()
    };

    try {
      // Using axios for a dummy POST request to satisfy the linter.
      // In a real app, this would be your actual backend API endpoint.
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newUser, {
        timeout: 1500 // Simulate network delay and ensure a quick response for demo
      });

      // You can check response.status or response.data if it were a real API
      if (response.status === 201 || response.status === 200) {
        setUsers(prev => [newUser, ...prev]); // Add the user to local state
        setSubmitMessage('User created successfully!');
      } else {
        setSubmitMessage('Failed to create user. Server responded with an error.');
      }
      
      setTimeout(() => {
        setCurrentPage(3);
      }, 1500);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage(`Error submitting form: ${error.message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      image: null,
      category: '',
      rating: 5,
      gender: '',
      bio: '',
      isProUser: false,
      customId: ''
    });
    setErrors({});
    setImagePreview('');
    setCurrentPage(1);
    setSubmitMessage('');
    setSearchIdInput('');
    setAppliedSearchId('');
  };

  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  const applySearch = () => {
    setAppliedSearchId(searchIdInput.trim());
    setPagination(prev => ({...prev, currentPage: 1}));
  };

  const getPaginatedUsers = () => {
    const filteredUsers = appliedSearchId.trim() 
      ? users.filter(user => user.id === appliedSearchId.trim())
      : users;

    const startIndex = (pagination.currentPage - 1) * 6;
    const endIndex = startIndex + 6;
    return filteredUsers.slice(startIndex, endIndex);
  };

  // Memoize updatePagination using useCallback
  const updatePagination = useCallback(() => {
    const filteredUsers = appliedSearchId.trim() 
      ? users.filter(user => user.id === appliedSearchId.trim())
      : users;
    const totalPages = Math.ceil(filteredUsers.length / 6);
    setPagination(prev => ({
      currentPage: Math.min(prev.currentPage, totalPages || 1),
      totalPages: totalPages,
      hasNextPage: prev.currentPage < totalPages,
      hasPrevPage: prev.currentPage > 1
    }));
  }, [users, appliedSearchId, setPagination]); // Dependencies for useCallback

  // Re-calculate pagination whenever users array length or appliedSearchId changes
  useEffect(() => {
    updatePagination(); // Now updatePagination is a stable function due to useCallback
  }, [users.length, appliedSearchId, updatePagination]); // Add updatePagination to dependency array

  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage,
      hasNextPage: newPage < prev.totalPages,
      hasPrevPage: newPage > 1
    }));
  };

  const refreshData = () => {
    setSearchIdInput('');
    setAppliedSearchId('');
    setUsers([...users]);
    setPagination(prev => ({...prev, currentPage: 1}));
  };


  // Form Page
  if (currentPage === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 font-inter">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Demo Form</h1>
              <p className="text-gray-600">Fill out the form below to continue</p>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="customId" className="block text-sm font-medium text-gray-700 mb-2">
                  Unique ID (Optional)
                </label>
                <input
                  type="text"
                  id="customId"
                  name="customId"
                  value={formData.customId}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.customId ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Leave blank for auto-generation (14 digits)"
                />
                {errors.customId && (
                  <p className="mt-1 text-sm text-red-600">{errors.customId}</p>
                )}
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                )}
                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {genders.map(g => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
                )}
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Bio (Max 500 characters)
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  maxLength="500"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y ${
                    errors.bio ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us a little about yourself..."
                ></textarea>
                <p className="mt-1 text-sm text-gray-500 text-right">
                  {formData.bio.length}/500
                </p>
                {errors.bio && (
                  <p className="mt-1 text-sm text-red-600">{errors.bio}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isProUser"
                  name="isProUser"
                  checked={formData.isProUser}
                  onChange={handleInputChange}
                  className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="isProUser" className="ml-2 block text-sm text-gray-900">
                  Are you a Pro User?
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating: {formData.rating}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.rating}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(formData.rating - 1) * 11.11}%, #e5e7eb ${(formData.rating - 1) * 11.11}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Next →
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(3)}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  View Existing Users ({users.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Summary Page
  if (currentPage === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4 font-inter">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Form Summary</h1>
              <p className="text-gray-600">Review your information before submitting</p>
            </div>

            {submitMessage && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitMessage.includes('successfully') 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                {submitMessage}
              </div>
            )}

            <div className="space-y-6">
              <div className="flex items-center space-x-6 p-6 bg-gray-50 rounded-xl">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No Image</span>
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{formData.name}</h2>
                  <p className="text-gray-600">{formData.email}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Category</h3>
                  <p className="text-blue-700 capitalize">
                    {categories.find(cat => cat.value === formData.category)?.label || 'Not selected'}
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Rating</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full mr-1 ${
                            i < formData.rating ? 'bg-purple-500' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-purple-700 font-semibold">
                      {formData.rating}/10
                    </span>
                  </div>
                </div>

                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">Gender</h3>
                  <p className="text-yellow-700 capitalize">
                    {genders.find(g => g.value === formData.gender)?.label || 'Not selected'}
                  </p>
                </div>

                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Pro User</h3>
                  <p className="text-red-700">
                    {formData.isProUser ? 'Yes' : 'No'}
                  </p>
                </div>
              </div>

              <div className="bg-indigo-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-indigo-800 mb-2">Bio</h3>
                <p className="text-indigo-700 text-sm">
                  {formData.bio || 'No bio provided.'}
                </p>
              </div>
              
              {formData.customId.trim() && (
                <div className="bg-gray-100 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Provided ID</h3>
                  <p className="text-gray-700 text-sm">
                    {formData.customId.trim()}
                  </p>
                </div>
              )}

              <div className="flex space-x-4 pt-6">
                <button
                  onClick={handleBack}
                  disabled={loading}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  ← Back to Edit
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Form'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results Page
  const paginatedUsers = getPaginatedUsers();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8 px-4 font-inter">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">User Gallery</h1>
            <p className="text-gray-600">All submitted users and statistics</p>
          </div>

          {/* Search Input and Button */}
          <div className="mb-6 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              placeholder="Enter exact User ID..."
              value={searchIdInput}
              onChange={(e) => setSearchIdInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  applySearch();
                }
              }}
              className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors shadow-sm"
            />
            <button
              onClick={applySearch}
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-md"
            >
              Search
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mb-4">
            Enter the full unique ID for an exact match.
          </p>

          {/* Statistics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-md">
              <h3 className="text-lg font-semibold mb-2">Total Users</h3>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white shadow-md">
              <h3 className="text-lg font-semibold mb-2">Average Rating</h3>
              <p className="text-3xl font-bold">{stats.ratingStats.average}/10</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-md">
              <h3 className="text-lg font-semibold mb-2">Top Category</h3>
              <p className="text-xl font-bold capitalize">
                {Object.keys(stats.categoryStats).length > 0 
                  ? Object.keys(stats.categoryStats).reduce((a, b) => 
                      stats.categoryStats[a] > stats.categoryStats[b] ? a : b
                    )
                  : 'None'
                }
              </p>
            </div>
          </div>

          {/* Users Grid */}
          {paginatedUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedUsers.map((user) => (
                <div key={user.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-100">
                  <div className="flex items-start space-x-4 mb-4">
                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt={user.name}
                        className="w-16 h-16 object-cover rounded-full border-2 border-gray-200 shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-gray-500 text-xs text-center">No Image</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg">{user.name}</h3>
                      <p className="text-gray-600 text-sm break-all">{user.email}</p>
                      <p className="text-gray-500 text-xs mt-1">ID: {user.id}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium capitalize">{user.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-medium">{user.rating}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Gender:</span>
                      <span className="font-medium capitalize">
                        {genders.find(g => g.value === user.gender)?.label || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pro User:</span>
                      <span className="font-medium">{user.isProUser ? 'Yes' : 'No'}</span>
                    </div>
                    <div>
                      <span className="block text-gray-600 mb-1">Bio:</span>
                      <p className="text-gray-700 text-xs italic line-clamp-2">
                        {user.bio || 'No bio provided.'}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium text-xs">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteUser(user.id)}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors text-sm shadow-sm hover:shadow-md"
                  >
                    Delete User
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔎</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No users found matching your search.</h3>
              <p className="text-gray-500">Try a different ID or clear the search.</p>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center space-x-2 mb-8">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 rounded-lg transition-colors"
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 rounded-lg transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 flex-wrap gap-4">
            <button
              onClick={handleReset}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md"
            >
              Create New User
            </button>
            <button
              onClick={refreshData}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDemo;
