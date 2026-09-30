import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// Usa la prima immagine presente nella cartella "background"
const backgroundModules = import.meta.glob(
    "../assets/images/background/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
    {eager: true, import: "default"}
) as Record<string, string>;
const background = Object.keys(backgroundModules).sort().map((k) => backgroundModules[k])[0];

export default function LandingPage() {
    const giacomoRef = useRef(null);
    const selvaggioRef = useRef(null);
    const subtitleRef = useRef(null);

    useEffect(() => {
        gsap.set([giacomoRef.current, selvaggioRef.current, subtitleRef.current], {
            opacity: 0,
            y: 50
        });

        gsap.to(giacomoRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out"
        });

        gsap.to(selvaggioRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.2,
            ease: "power3.out"
        });

        gsap.to(subtitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            delay: 0.4,
            ease: "power3.out"
        });
    }, []);

    return (
        <div className="relative isolate w-full h-screen flex flex-col justify-center items-start p-6 md:p-12">
            {background && (
                <img
                    src={background}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 w-full h-full object-cover opacity-50 pointer-events-none"
                />
            )}
            {/* ✅ UN SOLO ELEMENTO = ZERO SPAZI */}
            <h1 className="font-league font-bold text-black tracking-tight leading-[0.82] m-0 p-0
               text-[6rem] md:text-[10rem] lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem]">
                <span ref={giacomoRef} className="block">GIACOMO</span>
                <span ref={selvaggioRef} className="block">SELVAGGIO</span>
            </h1>

            <p
                ref={subtitleRef}
                className="font-oswald text-left text-xl md:text-2xl lg:text-3xl font-bold text-black tracking-tight  mb-0 leading-[0.85] m-0 p-0"
            >
                HAIR STYLIST
            </p>
        </div>
    );
}