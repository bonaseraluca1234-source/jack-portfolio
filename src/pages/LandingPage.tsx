import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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
        <div className="w-full h-screen flex flex-col justify-center items-start p-6 md:p-12">
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