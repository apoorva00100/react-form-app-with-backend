


// import React, { useState } from 'react';

// const FormDemo = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     image: null,
//     category: '',
//     rating: 5
//   });
//   const [errors, setErrors] = useState({});
//   const [imagePreview, setImagePreview] = useState('');

//   const categories = [
//     { value: '', label: 'Select a category' },
//     { value: 'technology', label: 'Technology' },
//     { value: 'design', label: 'Design' },
//     { value: 'marketing', label: 'Marketing' },
//     { value: 'business', label: 'Business' },
//     { value: 'other', label: 'Other' }
//   ];

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!validateEmail(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     if (!formData.category) {
//       newErrors.category = 'Please select a category';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({
//         ...prev,
//         image: file
//       }));

//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSliderChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       rating: parseInt(e.target.value)
//     }));
//   };

//   const handleNext = () => {
//     if (validateForm()) {
//       setCurrentPage(2);
//     }
//   };

//   const handleBack = () => {
//     setCurrentPage(1);
//   };

//   const handleReset = () => {
//     setFormData({
//       name: '',
//       email: '',
//       image: null,
//       category: '',
//       rating: 5
//     });
//     setErrors({});
//     setImagePreview('');
//     setCurrentPage(1);
//   };

//   if (currentPage === 1) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
//         <div className="max-w-md mx-auto">
//           <div className="bg-white rounded-2xl shadow-xl p-8">
//             <div className="text-center mb-8">
//               <h1 className="text-3xl font-bold text-gray-800 mb-2">Demo Form</h1>
//               <p className="text-gray-600">Fill out the form below to continue</p>
//             </div>

//             <div className="space-y-6">
//               {/* Name Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
//                     errors.name ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter your full name"
//                 />
//                 {errors.name && (
//                   <p className="mt-1 text-sm text-red-600">{errors.name}</p>
//                 )}
//               </div>

//               {/* Email Field */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
//                     errors.email ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter your email address"
//                 />
//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//                 )}
//               </div>

//               {/* Image Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Profile Image
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                   />
//                 </div>
//                 {imagePreview && (
//                   <div className="mt-3">
//                     <img
//                       src={imagePreview}
//                       alt="Preview"
//                       className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* Dropdown Selection */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Category *
//                 </label>
//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleInputChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
//                     errors.category ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                 >
//                   {categories.map(cat => (
//                     <option key={cat.value} value={cat.value}>
//                       {cat.label}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.category && (
//                   <p className="mt-1 text-sm text-red-600">{errors.category}</p>
//                 )}
//               </div>

//               {/* Slider */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Rating: {formData.rating}/10
//                 </label>
//                 <input
//                   type="range"
//                   min="1"
//                   max="10"
//                   value={formData.rating}
//                   onChange={handleSliderChange}
//                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                   style={{
//                     background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(formData.rating - 1) * 11.11}%, #e5e7eb ${(formData.rating - 1) * 11.11}%, #e5e7eb 100%)`
//                   }}
//                 />
//                 <div className="flex justify-between text-xs text-gray-500 mt-1">
//                   <span>1</span>
//                   <span>5</span>
//                   <span>10</span>
//                 </div>
//               </div>

//               {/* Next Button */}
//               <button
//                 type="button"
//                 onClick={handleNext}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//               >
//                 Next →
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4">
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-gray-800 mb-2">Form Summary</h1>
//             <p className="text-gray-600">Here's the information you provided</p>
//           </div>

//           <div className="space-y-6">
//             {/* Profile Section */}
//             <div className="flex items-center space-x-6 p-6 bg-gray-50 rounded-xl">
//               {imagePreview ? (
//                 <img
//                   src={imagePreview}
//                   alt="Profile"
//                   className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
//                 />
//               ) : (
//                 <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
//                   <span className="text-gray-500 text-sm">No Image</span>
//                 </div>
//               )}
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800">{formData.name}</h2>
//                 <p className="text-gray-600">{formData.email}</p>
//               </div>
//             </div>

//             {/* Details Grid */}
//             <div className="grid md:grid-cols-2 gap-6">
//               <div className="bg-blue-50 p-6 rounded-xl">
//                 <h3 className="text-lg font-semibold text-blue-800 mb-2">Category</h3>
//                 <p className="text-blue-700 capitalize">
//                   {categories.find(cat => cat.value === formData.category)?.label || 'Not selected'}
//                 </p>
//               </div>

//               <div className="bg-purple-50 p-6 rounded-xl">
//                 <h3 className="text-lg font-semibold text-purple-800 mb-2">Rating</h3>
//                 <div className="flex items-center space-x-2">
//                   <div className="flex">
//                     {[...Array(10)].map((_, i) => (
//                       <div
//                         key={i}
//                         className={`w-3 h-3 rounded-full mr-1 ${
//                           i < formData.rating ? 'bg-purple-500' : 'bg-gray-300'
//                         }`}
//                       />
//                     ))}
//                   </div>
//                   <span className="text-purple-700 font-semibold">
//                     {formData.rating}/10
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex space-x-4 pt-6">
//               <button
//                 onClick={handleBack}
//                 className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//               >
//                 ← Back to Edit
//               </button>
//               <button
//                 onClick={handleReset}
//                 className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//               >
//                 Start Over
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormDemo;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const FormDemo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: null,
    category: '',
    rating: 5
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState({});

  const API_BASE_URL = 'http://localhost:5000/api';

  const categories = [
    { value: '', label: 'Select a category' },
    { value: 'technology', label: 'Technology' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'business', label: 'Business' },
    { value: 'other', label: 'Other' }
  ];

  // Fetch users when component mounts or page changes to results
  useEffect(() => {
    if (currentPage === 3) {
      fetchUsers();
      fetchStats();
    }
  }, [currentPage]);

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      // const response = await axios.get(`${API_BASE_URL}/users?page=${page}&limit=6`);
      const response = await axios.get(`${API_BASE_URL}/users`, {
         params: { page: page, limit: 6 }
      });

      // const data = await response.json();
      
      if (response.data.success) {
        setUsers(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setSubmitMessage('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats`);
      // const data = await response.json();
      
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('rating', formData.rating.toString());
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await axios.post(`${API_BASE_URL}/user`, formDataToSend);

      // const data = await response.json();

      if (response.data.success) {
        setSubmitMessage('User created successfully!');
        setTimeout(() => {
          setCurrentPage(3);
        }, 1500);
      } else {
        setSubmitMessage(response.data.message || 'Failed to create user');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        // Server responded with error status
        setSubmitMessage(error.response.data.message || 'Server error. Please try again.');
      } else if (error.request) {
        // Network error
        setSubmitMessage('Network error. Please check your connection.');
      } else {
        setSubmitMessage('An unexpected error occurred. Please try again.');
      }
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
      rating: 5
    });
    setErrors({});
    setImagePreview('');
    setCurrentPage(1);
    setSubmitMessage('');
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/user/${userId}`
        );

      // const data = await response.json();
      
      if (response.data.success) {
        fetchUsers();
        fetchStats();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      if (error.response) {
        console.error('Delete error:', error.response.data.message);
      }
    }
  };

  // Form Page
  if (currentPage === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Demo Form</h1>
              <p className="text-gray-600">Fill out the form below to continue</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <input
                  type="file"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
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
                  View Existing Users
                </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Summary Page
  if (currentPage === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4">
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
              </div>

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">User Gallery</h1>
            <p className="text-gray-600">All submitted users and statistics</p>
          </div>

          {/* Statistics Dashboard */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
                <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                <p className="text-3xl font-bold">{stats.totalUsers}</p>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
                <h3 className="text-lg font-semibold mb-2">Average Rating</h3>
                <p className="text-3xl font-bold">{stats.ratingStats.average}/10</p>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
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
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          )}

          {/* Users Grid */}
          {!loading && users.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {users.map((user) => (
                <div key={user.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-4 mb-4">
                    {user.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt={user.name}
                        className="w-16 h-16 object-cover rounded-full border-2 border-gray-200"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No Image</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{user.name}</h3>
                      <p className="text-gray-600 text-sm">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium capitalize">{user.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-medium">{user.rating}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteUser(user.id)}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    Delete User
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && users.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No users found</h3>
              <p className="text-gray-500">Submit the form to see users here</p>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => fetchUsers(pagination.currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 rounded-lg transition-colors"
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => fetchUsers(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 rounded-lg transition-colors"
              >
                Next
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={handleReset}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create New User
            </button>
            <button
              onClick={() => {
                fetchUsers();
                fetchStats();
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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