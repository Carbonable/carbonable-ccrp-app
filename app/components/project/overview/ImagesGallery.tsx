import { urlFor } from "~/utils/sanity/image";


export default function ImageGallery({gallery}: {gallery: any[]}) {
      
    return (
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-1">
            {gallery.map((image, index) => (
                <div key={`image_${index}`} className="outline-none">
                    <img src={urlFor(image).width(500).url()} alt={`image_${index}`} className={`w-full object-cover outline-none` } />
                </div>
            ))}
        </div>
    )
}