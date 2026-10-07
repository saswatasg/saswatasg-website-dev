import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, Calendar } from "lucide-react";
import { useWorld } from "@/contexts/WorldContext";
import { trackEvent } from "@/utils/analytics";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

const navItems = [
  { name: "Stories", path: "/photography" },
  { name: "Writing", path: "/writing" },
  { name: "Cinema", path: "/cinema" },
  { name: "About", path: "/adda/about" },
  { name: "Contact", path: "/contact?world=adda" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
        <div className="max-w-[1200px] mx-auto w-full flex items-center justify-between px-4 md:px-6 h-16 lg:h-20">
          <Link
            to="/adda"
            className="flex items-center gap-2"
            aria-label="Saswata Sengupta — Home"
          >
            <span className="font-serif font-bold text-lg tracking-tight text-ink bg-[#f2cf9b] px-2 py-0.5 rounded-lg border-2 border-black -rotate-1 inline-block hover:scale-105 hover:-rotate-2 transition-all duration-200">
              Saswata
              <span
                className="ml-1 text-sm select-none"
                style={{ letterSpacing: "-0.02em" }}
              >
                ✳︎
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => trackEvent("navigation", "nav_click", item.name)}
                className={({ isActive }) =>
                  `px-3 py-1.5 text-sm font-bold rounded-lg border-2 transition-all ${
                    isActive ||
                    (item.path === "/work" &&
                      (location.pathname.startsWith("/case-studies") ||
                        location.pathname.startsWith("/projects")))
                      ? "bg-ink text-white border-black"
                      : "text-ink border-transparent hover:text-ink hover:border-black"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative inline-flex group">
              <div className="absolute inset-0 rounded-lg border-2 border-black bg-coral translate-x-[3px] translate-y-[3px]" />
              <button
                onClick={() => {
                  trackEvent("navigation", "book_a_call");
                  navigate("/contact?world=adda");
                }}
                className="relative z-10 bg-ink text-white rounded-lg border-2 border-black px-4 py-2 text-sm font-bold min-h-[44px] inline-flex items-center gap-2 transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px]"
              >
                Say hello
              </button>
            </div>
          </div>
        </div>
      </header>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black">
          <div className="flex items-center justify-between px-4 h-14">
            <Link
              to="/adda"
              className="flex items-center gap-2"
              aria-label="Saswata Sengupta — Home"
            >
              <span className="font-serif font-bold text-base text-ink bg-[#f2cf9b] px-2 py-0.5 rounded-lg border-2 border-black inline-block hover:scale-105 transition-all duration-200">
                Saswata
              </span>
            </Link>

            <SheetTrigger asChild>
              <button
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-lg flex items-center justify-center bg-ink text-white border-2 border-black hover:bg-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
          </div>
        </header>

        <SheetContent
          side="top"
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="bg-white border-b-2 border-black p-0 pt-14 [&>button]:hidden"
        >
          <SheetTitle className="sr-only">Adda navigation</SheetTitle>
          <nav className="flex flex-col gap-1 p-4" aria-label="Primary">
            {navItems.map((item) => (
              <SheetClose asChild key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() =>
                    trackEvent("navigation", "mobile_nav_click", item.name)
                  }
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-bold border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
                      isActive
                        ? "bg-ink text-white border-black"
                        : "text-ink border-transparent hover:border-black"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </SheetClose>
            ))}
            <button
              onClick={() => {
                trackEvent("navigation", "mobile_book_a_call");
                navigate("/contact?world=adda");
                setIsOpen(false);
              }}
              className="bg-ink text-white rounded-lg border-2 border-black px-4 py-3 text-sm font-bold text-center mt-2 hover:bg-white hover:text-ink transition-all duration-200 flex items-center justify-center gap-2 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
            >
              <Calendar className="w-4 h-4" />
              Say hello
            </button>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Header;

export function ModeSelector() {
  const { world, destination, switchWorld, transitioning } = useWorld();
  return (
    <nav aria-label="Choose a side">
      {["workbench", "adda"].map((mode) => (
        <a
          key={mode}
          href={destination(mode)}
          aria-current={world === mode ? "page" : undefined}
          aria-disabled={!!transitioning}
          onClick={(event) => {
            if (
              event.button === 0 &&
              !event.metaKey &&
              !event.ctrlKey &&
              !event.shiftKey &&
              !event.altKey
            ) {
              event.preventDefault();
              switchWorld(mode);
            }
          }}
        >
          {mode === "adda" ? (
            <>
              <span lang="bn" className="adda-mode-bengali">
                আড্ডা
              </span>{" "}
              <small>(Adda)</small>
            </>
          ) : (
            "Workbench"
          )}
        </a>
      ))}
    </nav>
  );
}
