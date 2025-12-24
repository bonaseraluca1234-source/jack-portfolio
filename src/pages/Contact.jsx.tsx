export default function Contact() {
    return (
        <div className="fixed inset-0 overflow-hidden flex flex-col items-center px-6 md:px-12 mt-20">
            {/* Titolo: in alto e centrato */}
            <header className=" absolute w-full flex justify-center">
                <h1 className="font-league font-bold text-black text-center leading-none m-0 p-0
                       text-4xl md:text-6xl lg:text-7xl">
                    CONTACT
                </h1>
            </header>

            {/* Contatti: centrati a metà pagina */}
            <main className="flex-1 w-full flex items-center justify-center">
                <div className="flex flex-col items-center text-center gap-1">
                    <p className="font-oswald font-normal text-black tracking-tight leading-[1.05] m-0 p-0
                  text-lg md:text-xl">
                        +39 327 181 2032
                    </p>

                    <a
                        className="font-oswald font-normal text-black tracking-tight leading-[1.05] m-0 p-0
                 text-lg md:text-xl"
                        href="mailto:GIACOMSERLVAGGIO.HAIR@GMAIL.COM"
                    >
                        GIACOMSERLVAGGIO.HAIR@GMAIL.COM
                    </a>

                    <p className="font-oswald font-normal text-black tracking-tight leading-[1.05] m-0 p-0
                  text-lg md:text-xl">
                        @GIACOMOSELVAGGIO
                    </p>
                </div>
            </main>
        </div>
    );
}