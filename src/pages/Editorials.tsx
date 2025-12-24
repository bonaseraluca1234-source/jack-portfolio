import {useLayoutEffect, useMemo, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import {gsap} from "gsap";

const imageModules = import.meta.glob(
    "../assets/images/editorials/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
    {eager: true, import: "default"}
) as Record<string, string>;

export default function Editorials() {
    const location = useLocation();
    const section = location.state?.section ?? "EDITORIALS";

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
    }, []);
    const [index, setIndex] = useState(0);
    const imgWrapRef = useRef<HTMLDivElement | null>(null);

    const next = () => setIndex((i) => (i + 1) % images.length);
    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

    const [orientation, setOrientation] = useState<"portrait" | "landscape" | "square">("landscape");

    const onImgLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const {naturalWidth, naturalHeight} = e.currentTarget;
        if (naturalWidth === naturalHeight) setOrientation("square");
        else if (naturalHeight > naturalWidth) setOrientation("portrait");
        else setOrientation("landscape");
    };

    // Piccola animazione al cambio immagine (opzionale ma “pulita”)
    useLayoutEffect(() => {
        if (!imgWrapRef.current) return;
        gsap.fromTo(
            imgWrapRef.current,
            {opacity: 0, y: 8},
            {opacity: 1, y: 0, duration: 0.35, ease: "power2.out"}
        );
    }, [index]);

    return (
        <div className="fixed inset-0 overflow-hidden flex flex-col items-center px-6 md:px-12 mt-20">
            <header className="w-full flex justify-center">
                <h1 className="font-league font-bold text-black text-center leading-none m-0 p-0 text-4xl md:text-6xl lg:text-7xl">
                    {section}
                </h1>
            </header>

            <main className="flex-1 w-full flex items-center justify-center">
                {/* contenitore largo schermo */}
                <div className="w-screen grid grid-cols-[1fr,minmax(0,64rem),1fr] items-center">
                    {/* freccia sinistra al bordo */}
                    <button
                        type="button"
                        onClick={prev}
                        className="
        justify-self-start
        font-league text-black text-4xl
        bg-transparent border-none p-0
        outline-none focus:outline-none focus:ring-0
      "
                        aria-label="Previous image"
                    >
      <span className="material-symbols-outlined text-[48px] leading-none">
        arrow_back_ios
      </span>
                    </button>

                    {/* colonna centrale (equivalente del tuo max-w-5xl) */}
                    <div className="w-full max-w-5xl mx-auto">
                        <div ref={imgWrapRef} className="w-full flex justify-center">
                            <div className="group relative inline-block w-fit">
                                <img
                                    src={images[index].src}
                                    alt={images[index].title}
                                    onLoad={onImgLoad}
                                    className={[
                                        "block w-auto h-auto object-contain",
                                        "max-h-[62vh] md:max-h-[72vh]",
                                        orientation === "portrait"
                                            ? "max-w-[64vw] md:max-w-[60vw]"
                                            : "max-w-[72vw] md:max-w-[85vw]",
                                    ].join(" ")}
                                />

                                <div
                                    className="
              absolute inset-0 flex items-center justify-center
              bg-black/40 opacity-0
              transition-opacity duration-200
              group-hover:opacity-100
            "
                                >
                                    <div
                                        className="
                text-white font-league text-2xl md:text-3xl
                opacity-0 scale-95
                transition duration-200
                group-hover:opacity-100 group-hover:scale-100
              "
                                    >
                                        {images[index].title}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* freccia destra al bordo */}
                    <button
                        type="button"
                        onClick={next}
                        className="
        justify-self-end
        font-league text-black text-4xl
        bg-transparent border-none p-0
        outline-none focus:outline-none focus:ring-0
      "
                        aria-label="Next image"
                    >
      <span className="material-symbols-outlined text-[48px] leading-none">
        arrow_forward_ios
      </span>
                    </button>
                </div>
            </main>
        </div>
    );
}
