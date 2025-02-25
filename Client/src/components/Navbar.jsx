import { Link } from 'react-router-dom';
import {useState} from 'react'
import logo from '../assets/sushi-logo.svg'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white shadow-lg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img className="h-8 w-8" src={logo} alt="Logo" />
          </div>
          <div className="hidden md:flex md:space-x-8 ml-10">
            <Link to="/" className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Home</Link>
           <Link to="/saved-recipes" className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Saved Recipes</Link>
            <a href="#platters" className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Platters</a>
            <a href="#specials" className="text-gray-900 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Specials</a>
          </div>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link to="/login" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">Login</Link>
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-primary focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </div>
    {isOpen && (
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#menu" className="text-gray-900 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Menu</a>
          <a href="#lunch-boxes" className="text-gray-900 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Lunch boxes</a>
          <a href="#platters" className="text-gray-900 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Platters</a>
          <a href="#specials" className="text-gray-900 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Specials</a>
          <div className="border-t border-gray-200 pt-4 mt-4">
            <a href="#login" className="text-gray-900 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Login</a>
            <a href="#register" className="bg-primary text-white hover:bg-primary/90 block px-3 py-2 rounded-md text-base font-medium mt-2">Register</a>
          </div>
        </div>
      </div>
    )}
  </nav>
  );
}

export default Navbar;


// <nav className="bg-white shadow-md">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           <Link to="/" className="text-xl font-bold text-gray-800">
//             Recipe Search
//           </Link>
//           <div className="flex space-x-4">
//             <Link to="/" className="text-gray-600 hover:text-gray-900">
//               Search
//             </Link>
//             <Link to="/saved-recipes" className="text-gray-600 hover:text-gray-900">
//               Saved Recipes
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
