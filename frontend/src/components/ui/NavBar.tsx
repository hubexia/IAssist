"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./Button";
import Logo from "./Logo";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className=" mx-auto px-4 w-full">
      <div className="flex justify-between items-center py-4">
        <Link href="/">
          <Logo />
        </Link>

        <div className="hidden md:flex  items-center space-x-2">
          <Link
            href="/login"
            className="text-primary px-4 py-2 hover:bg-[rgba(43,108,176,0.08)] rounded-lg"
          >
            Login
          </Link>
          <Link href="/register">
            <Button className="font-semibold rounded-xl text-center hover:shadow-2xl hover:shadow-primary">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-(--foreground) hover:text-(--primary) transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-primary py-4">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 pt-4 border-t border-(--primary)">
              <Link
                href="/login"
                className="text-(--foreground) hover:text-(--primary) transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="font-semibold text-center"> Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
