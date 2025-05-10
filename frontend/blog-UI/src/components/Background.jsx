import React from 'react'

export default function Background() {
  return (
    <div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 opacity-70"></div>
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('bg.jpg')" }}
      ></div>
    </div>
  );
}
