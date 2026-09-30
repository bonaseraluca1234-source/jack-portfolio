import {useLayoutEffect, useRef} from "react";

const MIN_FONT_PX = 10;
const MAX_FONT_PX = 20;

export default function About() {
    const areaRef = useRef<HTMLElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    // Adatta la dimensione del testo allo spazio disponibile (ricerca binaria sul font-size)
    useLayoutEffect(() => {
        const area = areaRef.current;
        const box = boxRef.current;
        const text = textRef.current;
        if (!area || !box || !text) return;

        const fit = () => {
            let lo = MIN_FONT_PX;
            let hi = MAX_FONT_PX;
            while (hi - lo > 0.25) {
                const mid = (lo + hi) / 2;
                text.style.fontSize = `${mid}px`;
                if (box.offsetHeight <= area.clientHeight) lo = mid;
                else hi = mid;
            }
            text.style.fontSize = `${lo}px`;
        };

        fit();
        const observer = new ResizeObserver(fit);
        observer.observe(area);
        document.fonts?.ready.then(fit); // ricalcola quando Oswald è caricato

        return () => observer.disconnect();
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden flex flex-col items-center px-6 md:px-12 pt-24 pb-6">
            {/* Titolo: in alto e centrato */}
            <header className="w-full flex justify-center">
                <h1 className="font-league font-bold text-black text-center leading-none m-0 p-0
                       text-4xl md:text-6xl lg:text-7xl">
                    ABOUT
                </h1>
            </header>

            {/* Testo: centrato e “racchiuso” */}
            <main ref={areaRef} className="flex-1 min-h-0 w-full flex items-center justify-center">
                <div ref={boxRef} className="w-full max-w-prose mx-auto p-4 md:p-8">
                    <p
                        ref={textRef}
                        lang="it"
                        className="font-oswald font-normal text-black tracking-tight leading-relaxed m-0 p-0
               text-justify hyphens-auto"
                    >
                        LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. PELLENTESQUE ORNARE A MAURIS ET
                        CONDIMENTUM. QUISQUE ALIQUAM ARCU MAURIS, SED CONSECTETUR MAGNA EUISMOD VEL. FUSCE NEC ELIT
                        MOLESTIE, SUSCIPIT MASSA A, FINIBUS AUGUE. NULLA DIGNISSIM RUTRUM VENENATIS. PHASELLUS SODALES
                        MAURIS EX, IN IACULIS EROS FACILISIS NEC. SED NON SEMPER MI. PRAESENT SIT AMET FEUGIAT MI, A
                        GRAVIDA PURUS. FUSCE EGET DUI SAPIEN. PROIN UT PRETIUM MASSA. DONEC PORTTITOR ID ANTE VITAE
                        LUCTUS. QUISQUE GRAVIDA ODIO PURUS, ID SAGITTIS ARCU ALIQUET AC.LOREM IPSUM DOLOR SIT AMET,
                        CONSECTETUR ADIPISCING ELIT. PELLENTESQUE ORNARE A MAURIS ET CONDIMENTUM. QUISQUE ALIQUAM ARCU
                        MAURIS, SED CONSECTETUR MAGNA EUISMOD VEL. FUSCE NEC ELIT MOLESTIE, SUSCIPIT MASSA A, FINIBUS
                        AUGUE. NULLA DIGNISSIM RUTRUM VENENATIS. PHASELLUS SODALES MAURIS EX, IN IACULIS EROS FACILISIS
                        NEC. SED NON SEMPER MI. PRAESENT SIT AMET FEUGIAT MI, A GRAVIDA PURUS. FUSCE EGET DUI SAPIEN.
                        PROIN UT PRETIUM MASSA. DONEC PORTTITOR ID ANTE VITAE LUCTUS. QUISQUE GRAVIDA ODIO PURUS, ID
                        SAGITTIS ARCU ALIQUET
                    </p>
                </div>
            </main>
        </div>
    );
}