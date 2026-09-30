import {useLayoutEffect, useMemo, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import {gsap} from "gsap";

type Props = {
    imageModules: Record<string, string>;
    defaultSection: string;
};

export default function GalleryViewer({imageModules, defaultSection}: Props) {
    const location = useLocation();
    const section = location.state?.section ?? defaultSection;

    const images = useMemo(() => {
        return Object.entries(imageModules)
            .map(([path, src]) => {
                const filename = path.split("/").pop() ?? "";
                const title = filename
                    .replace(/\.[^/.]+$/, "")
                    .replace(/[-_]/g, " ")
                    .toUpperCase();

                return {src, title};
            })
            .sort((a, b) => a.title.localeCompare(b.title)); // ordinamento opzionale
    }, [imageModules]);
    const [index, setIndex] = useState(0);
    // Da telefono non c'è hover: il titolo si mostra/nasconde toccando l'immagine
    const [showTitle, setShowTitle] = useState(false);
    const imgWrapRef = useRef<HTMLDivElement | null>(null);

    const next = () => setIndex((i) => (i + 1) % images.length);
    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

    // Swipe da telefono: verso sinistra → successiva, verso destra → precedente
    const touchStart = useRef<{x: number; y: number} | null>(null);

    const onTouchStart = (e: React.TouchEvent) => {
        const t = e.touches[0];
        touchStart.current = {x: t.clientX, y: t.clientY};
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart.current) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - touchStart.current.x;
        const dy = t.clientY - touchStart.current.y;
        touchStart.current = null;
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
        if (dx < 0) next();
        else prev();
    };

    // Piccola animazione al cambio immagine (opzionale ma “pulita”)
    useLayoutEffect(() => {
        if (!imgWrapRef.current) return;
        gsap.fromTo(
            imgWrapRef.current,
            {opacity: 0, y: 8},
            {opacity: 1, y: 0, duration: 0.35, ease: "power2.out"}
        );
        setShowTitle(false);
    }, [index]);

    if (images.length === 0) return null;

    const arrowClass = `
        flex items-center justify-center shrink-0
        text-black bg-transparent border-none p-1 md:p-2
        outline-none focus:outline-none focus:ring-0
    `;

    return (
        <div className="fixed inset-0 overflow-hidden flex flex-col items-center px-2 md:px-12 pt-24 pb-6">
            <header className="w-full flex justify-center">
                <h1 className="font-league font-bold text-black text-center leading-none m-0 p-0 text-4xl md:text-6xl lg:text-7xl">
                    {section}
                </h1>
            </header>

            <main
                className="flex-1 min-h-0 w-full flex flex-col items-center justify-center gap-3 md:gap-4"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                {/* frecce ai lati, immagine al centro: le colonne non si sovrappongono mai */}
                <div className="w-full grid grid-cols-[auto,minmax(0,1fr),auto] items-center gap-1 md:gap-6">
                    <button type="button" onClick={prev} className={arrowClass} aria-label="Previous image">
                        {/* arrow_back_ios ha il glifo spostato a destra: lo ricentro */}
                        <span className="material-symbols-outlined leading-none text-[28px] md:text-[44px] translate-x-[0.2em]">
                            arrow_back_ios
                        </span>
                    </button>

                    <div ref={imgWrapRef} className="min-w-0 flex justify-center">
                        <div
                            className="group relative w-fit max-w-full cursor-pointer"
                            onClick={() => setShowTitle((v) => !v)}
                        >
                            <img
                                src={images[index].src}
                                alt={images[index].title}
                                className="
                                    block w-auto h-auto max-w-full object-contain select-none
                                    max-h-[calc(100dvh-13rem)] md:max-h-[calc(100dvh-17rem)]
                                "
                                draggable={false}
                            />

                            <div
                                className={`
                                    absolute inset-0 flex items-center justify-center
                                    bg-black/40
                                    transition-opacity duration-200
                                    md:group-hover:opacity-100
                                    ${showTitle ? "opacity-100" : "opacity-0"}
                                `}
                            >
                                <div
                                    className={`
                                        text-white font-league text-2xl md:text-3xl
                                        transition duration-200
                                        md:group-hover:opacity-100 md:group-hover:scale-100
                                        ${showTitle ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                                    `}
                                >
                                    {images[index].title}
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="button" onClick={next} className={arrowClass} aria-label="Next image">
                        <span className="material-symbols-outlined leading-none text-[28px] md:text-[44px]">
                            arrow_forward_ios
                        </span>
                    </button>
                </div>
            </main>
        </div>
    );
}
