import {useRef, useState, useLayoutEffect, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {gsap} from "gsap";

function Navbar() {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const tl = useRef<gsap.core.Timeline | null>(null);
    const itemsRef = useRef<HTMLButtonElement[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const showHome = location.pathname !== "/jack-portfolio";

    // ✅ Chiudi menu cliccando fuori
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    useLayoutEffect(() => {
        if (itemsRef.current.length === 0 || !open) return;

        if (tl.current) {
            tl.current.kill();
        }

        tl.current = gsap.timeline({paused: false})
            .from(itemsRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power3.out",
            });

        return () => {
            if (tl.current) {
                tl.current.kill();
            }
        };
    }, [open]);

    useLayoutEffect(() => {
        if (!open && tl.current) {
            gsap.to(itemsRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: "power3.in",
            });
        }
    }, [open]);

    const portfolioItems = [
        {id: 0, label: "EDITORIALS", qs: "editorials", nextLabel: "EDITORIALS & MORE"},
        {id: 1, label: "CAMPAIGN", qs: "campaign", nextLabel: "CAMPAIGN"},
        {id: 2, label: "SHOWS", qs: "shows", nextLabel: "SHOWS"},
    ];

    const toggleMenu = () => setOpen((prev) => !prev);

    return (
        <nav className="relative flex items-center py-6 px-6 text-lg" ref={navRef}>
            {showHome && (
                <Link
                    className="font-league text-[1.7rem] md:text-[1.9rem] text-black hover:text-black"
                    to="/jack-portfolio"
                >
                    [HOME]
                </Link>
            )}
            <div className="ml-auto flex items-center gap-6">
                <div className="relative hover:outline-none hover:ring-0 hover:ring-transparent" ref={containerRef}>
                    <button
                        type="button"
                        className="font-league border-none text-[1.7rem] md:text-[1.9rem] bg-transparent hover:outline-none text-black focus:outline-none focus:ring-0 focus:ring-transparent hover:ring-0 hover:ring-transparent p-0 mt-1"
                        onClick={toggleMenu}
                    >
                        [PORTFOLIO]
                    </button>

                    {open && (
                        <div
                            className="absolute left-3 top-full mt-2 z-50 flex flex-col gap-3 text-2xl pointer-events-auto">
                            {portfolioItems.map((item, i) => (
                                <Link
                                    key={item.qs}
                                    onClick={() => setOpen(false)}
                                    ref={(el) => {
                                        if (el) { // @ts-ignore
                                            itemsRef.current[i] = el;
                                        } // ora el è <a>
                                    }}
                                    state={{id: item.id, section: item.nextLabel}}
                                    to={`/jack-portfolio/${item.qs}`}
                                    className="
          group w-fit font-league text-black hover:text-black visited:text-black
          bg-transparent border-none p-0 leading-none
          outline-none focus:outline-none focus:ring-0 focus:ring-transparent
        "
                                >
        <span
            className="
            relative inline-block
            after:content-[''] after:absolute after:left-0 after:-bottom-0.5
            after:h-[3px] after:w-full after:bg-black after:pointer-events-none
            after:scale-x-0 after:origin-center
            after:transition-transform after:duration-200
            group-hover:after:scale-x-100
          "
        >
          {item.label}
        </span>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <Link
                    className="font-league text-[1.7rem] md:text-[1.9rem] text-black focus:outline-none focus:ring-0 focus:ring-transparent hover:text-black"
                    to="/jack-portfolio/about"
                >
                    [ABOUT]
                </Link>

                <Link
                    className="font-league text-[1.7rem] md:text-[1.9rem] text-black focus:outline-none focus:ring-0 focus:ring-transparent hover:text-black"
                    to="/jack-portfolio/contact"
                >
                    [CONTACT]
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;