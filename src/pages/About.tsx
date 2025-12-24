export default function About() {
    return (
        <div className="fixed inset-0 overflow-hidden flex flex-col items-center px-6 md:px-12 mt-20">
            {/* Titolo: in alto e centrato */}
            <header className="w-full flex justify-center">
                <h1 className="font-league font-bold text-black text-center leading-none m-0 p-0
                       text-4xl md:text-6xl lg:text-7xl">
                    ABOUT
                </h1>
            </header>

            {/* Testo: centrato e “racchiuso” */}
            <main className="flex-1 w-full flex items-center justify-center">
                <div className="w-full max-w-prose mx-auto p-6 md:p-8">
                    <p
                        lang="it"
                        className="font-oswald font-normal text-black tracking-tight leading-relaxed m-0 p-0
               text-lg md:text-xl text-justify hyphens-auto"
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