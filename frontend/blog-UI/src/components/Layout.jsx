import { useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  // 👈 accept children
  const location = useLocation();
  const showSlider =
    location.pathname === "/" || location.pathname === "/blogs";

  return (
    <>
      {showSlider && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div></div>
        </div>
      )}
      <main className="pt-24">
        {children} {/* 👈 render the page content here */}
      </main>
    </>
  );
}
  