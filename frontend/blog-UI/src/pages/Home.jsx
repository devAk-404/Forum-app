import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative bg-blue-600 text-white h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 opacity-70"></div>
      {/* Parallax effect on background */}
      <div className="absolute inset-0 bg-fixed bg-cover bg-center blur-sm" style={{ backgroundImage: "url('bg.jpg')" }}></div>


      <div className="relative z-10 animate-fadeIn">
        {/* Main Title with animated scale */}
        <div className="bg-gradient-to-r from-teal-300 to-blue-400 p-8 rounded-[2rem] transform transition-transform duration-1000 ease-in-out hover:scale-110 animate-fadeInUp">
          <h1
            className="text-5xl font-bold mb-4 transform font-sans"
            style={{ color: "#336699" }}
          >
            Welcome to Forum Page
          </h1>
        </div>

        {/* Subtitle with fade-in effect */}
        <p className="mt-6 mb-8 max-w-xl text-gray-900 text-lg md:text-xl font-large text-center uppercase">
          The Only Discussion Forum you need!
        </p>

        {/* CTA Button with hover effect */}
        <Link
          to="/login"
          className="mt-8 px-6 py-3 bg-yellow-500 text-white rounded-full text-xl font-semibold transform transition-transform duration-300 ease-in-out hover:bg-yellow-600 hover:scale-105 hover:shadow-lg animate-fadeInUp delay-500"
        >
          Create Forum
        </Link>
      </div>
    </div>
  );
}
