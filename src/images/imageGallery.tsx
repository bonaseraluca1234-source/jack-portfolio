
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";


// Inizializza Supabase (sostituisci con le tue chiavi)
const supabaseUrl = "https://qzlgfdwnmxumsvdjglsv.supabase.co";
const supabaseKey = "sb_publishable_Z8ikTNtBSn55ikhidiQvuw_K36fle5q";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ImageGallery() {
    const [images, setImages] = useState<string[]>([])
    const bucketName = 'images'

    useEffect(() => {
        const fetchImages = async () => {
            const { data, error } = await supabase.storage.from(bucketName).list('', {
                limit: 100,
                offset: 0,
            })

            if (error) {
                console.error('Errore nel recupero delle immagini:', error)
                return
            }

            // Crea gli URL pubblici per ogni file
            const urls = data
                ?.filter((file) => file.name.endsWith('.jpg') || file.name.endsWith('.png'))
                .map((file) => {
                    const { data } = supabase.storage.from(bucketName).getPublicUrl(file.name)
                    return data.publicUrl
                })

            setImages(urls || [])
        }

        fetchImages().then((a) => console.log(a));
    }, [])

    //return (
    //    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-5">
    //        <h1 className="text-4xl font-bold mb-8 text-gray-800">Galleria Immagini</h1>
//
    //            <motion.div
    //                layout
    //                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl"
    //            >
    //                {images.map((img) => (
    //                    <motion.div
    //                        layout
    //                        whileHover={{ scale: 1.05 }}
    //                        className="rounded-2xl shadow-lg overflow-hidden bg-white"
    //                    >
    //                        <img
    //                            src={img}
    //                            className="w-full h-60 object-cover hover:opacity-90 transition"
    //                        />
    //                    </motion.div>
    //                ))}
    //            </motion.div>
//
    //    </div>
    //);
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {images.length > 0 ? (
                images.map((url, i) => (
                    <img
                        key={i}
                        src={url}
                        alt={`Immagine ${i}`}
                        className="rounded-xl shadow-lg object-cover w-full h-48"
                    />
                ))
            ) : (
                <p>Nessuna immagine trovata</p>
            )}
        </div>
    )
}