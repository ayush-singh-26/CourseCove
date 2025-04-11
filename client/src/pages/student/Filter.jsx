import React from 'react'

const categories = ["Web Development", "Mobile Development", "Data Science", "Design", "Business", "Marketing"]
const levels = ["Beginner", "Intermediate", "Advanced"]
const prices = ["Free", "Paid"]

const Filter = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800 mb-6">Filter Courses</h2>
      
      {/* Sort By */}
      <div className="mb-8">
        <h3 className="text-md font-semibold text-gray-700 mb-3">Sort By</h3>
        <select 
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        >
          <option value="">Recommended</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-md font-semibold text-gray-700 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`category-${index}`}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor={`category-${index}`} className="ml-3 text-sm text-gray-700">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty Level */}
      <div className="mb-8">
        <h3 className="text-md font-semibold text-gray-700 mb-3">Difficulty Level</h3>
        <div className="space-y-2">
          {levels.map((level, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`level-${index}`}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor={`level-${index}`} className="ml-3 text-sm text-gray-700">
                {level}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-4">
        <h3 className="text-md font-semibold text-gray-700 mb-3">Price</h3>
        <div className="space-y-2">
          {prices.map((price, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={`price-${index}`}
                name="price"
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor={`price-${index}`} className="ml-3 text-sm text-gray-700">
                {price}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-4">
        Reset all filters
      </button>
    </div>
  )
}

export default Filter