// ResultPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

function ResultPage() {
  const { state } = useLocation();

  if (!state) return <h2>No data to display</h2>;

  const imageURL = state.image ? URL.createObjectURL(state.image) : '';

    return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Form Summary</h1>
            <p className="text-gray-600">Here's the information you provided</p>
          </div>

          <div className="space-y-6">
            {/* Profile Section */}
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

            {/* Details Grid */}
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

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                ← Back to Edit
              </button>
              <button
                onClick={handleReset}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default ResultsPage;