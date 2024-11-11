import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-6 ">
    <div className="container mx-auto px-4 flex flex-col items-center">
      <h2 className="text-xl font-semibold text-gray-300 mb-2">Show Time Now</h2>
      <p className="text-gray-400 text-sm mb-4">Catch the latest movies and shows, anytime, anywhere.</p>
      
      <div className="flex space-x-6 mb-4">
        <a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a>
        <a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
        <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
        <a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
      </div>
  
      <div className="flex space-x-6 mb-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
  
      <p className="text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Show Time Now. All rights reserved.
      </p>
    </div>
  </footer>
  

  )
}

export default Footer