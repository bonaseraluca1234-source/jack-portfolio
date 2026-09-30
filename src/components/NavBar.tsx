import {useRef, useState, useLayoutEffect, useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {gsap} from "gsap";
import logo from "../assets/logo-circle.png"; // cerchio bianco già incluso nell'immagine

function Navbar() {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [mobilePortfolioOpen, setMobilePortfolioOpen] = useState(false);
    const mobileItemsRef = useRef<HTMLAnchorElement[]>([]);
    const tl = useRef<gsap.core.Timeline | null>(null);
    const itemsRef = useRef<HTMLButtonElement[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    // Chiudi il drawer quando cambia pagina
    useEffect(() => {
        setDrawerOpen(false);
    }, [location.pathname]);

    // Richiudi PORTFOLIO quando si chiude il drawer
    useEffect(() => {
        if (!drawerOpen) setMobilePortfolioOpen(false);
    }, [drawerOpen]);

    // Stessa animazione del menu PORTFOLIO desktop
    useLayoutEffect(() => {
        if (!mobilePortfolioOpen || mobileItemsRef.current.length === 0) return;

        const anim = gsap.from(mobileItemsRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
        });

        return () => {
            anim.kill();
        };
    }, [mobilePortfolioOpen]);

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
        {id: 3, label: "PERSONAL PROJECT", qs: "personal-project", nextLabel: "PERSONAL PROJECT"},
    ];

    const toggleMenu = () => setOpen((prev) => !prev);

    return (
        <nav className="fixed top-0 inset-x-0 z-50 flex items-center py-6 px-6 text-lg" ref={navRef}>
            <Link
                className="block rounded-full"
                to="/jack-portfolio"
                aria-label="Home"
            >
                <img
                    src={logo}
                    alt="Logo"
                    className="block h-[calc(2.43rem+8px)] w-[calc(2.43rem+8px)] md:h-[calc(2.835rem+8px)] md:w-[calc(2.835rem+8px)]"
                />
            </Link>
            <div className="ml-auto hidden md:flex items-center gap-6">
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

            {/* Mobile: pulsante hamburger */}
            <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="ml-auto md:hidden text-black bg-transparent border-none p-0 outline-none focus:outline-none focus:ring-0"
                aria-label="Apri menu"
                aria-expanded={drawerOpen}
            >
                <span className="material-symbols-outlined text-[40px] leading-none">menu</span>
            </button>

            {/* Mobile: overlay */}
            <div
                className={`md:hidden fixed inset-0 bg-black/40 transition-opacity duration-300 ${
                    drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setDrawerOpen(false)}
            />

            {/* Mobile: drawer laterale */}
            <aside
                className={`md:hidden fixed inset-y-0 right-0 w-3/4 max-w-xs bg-white shadow-xl
                    flex flex-col gap-8 px-8 py-6 transition-transform duration-300 ease-out ${
                    drawerOpen ? "translate-x-0" : "translate-x-full"
                }`}
                aria-hidden={!drawerOpen}
            >
                <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    className="self-end text-black bg-transparent border-none p-0 outline-none focus:outline-none focus:ring-0"
                    aria-label="Chiudi menu"
                >
                    <span className="material-symbols-outlined text-[40px] leading-none">close</span>
                </button>

                <div className="flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={() => setMobilePortfolioOpen((prev) => !prev)}
                        className="self-start font-league text-[2rem] text-black leading-none bg-transparent border-none p-0 outline-none focus:outline-none focus:ring-0"
                        aria-expanded={mobilePortfolioOpen}
                    >
                        [PORTFOLIO]
                    </button>

                    {mobilePortfolioOpen && (
                        <div className="flex flex-col gap-3 pl-3">
                            {portfolioItems.map((item, i) => (
                                <Link
                                    key={item.qs}
                                    onClick={() => setDrawerOpen(false)}
                                    ref={(el) => {
                                        if (el) mobileItemsRef.current[i] = el;
                                    }}
                                    state={{id: item.id, section: item.nextLabel}}
                                    to={`/jack-portfolio/${item.qs}`}
                                    className="group w-fit font-league text-2xl text-black hover:text-black visited:text-black leading-none"
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
                    onClick={() => setDrawerOpen(false)}
                    className="font-league text-[2rem] text-black hover:text-black leading-none"
                    to="/jack-portfolio/about"
                >
                    [ABOUT]
                </Link>

                <Link
                    onClick={() => setDrawerOpen(false)}
                    className="font-league text-[2rem] text-black hover:text-black leading-none"
                    to="/jack-portfolio/contact"
                >
                    [CONTACT]
                </Link>
            </aside>
        </nav>
    );
}

export default Navbar;