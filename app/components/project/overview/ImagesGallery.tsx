import ReactPlayer from "react-player";
import { urlFor } from "~/utils/sanity/image";


export default function ImageGallery({images, videos}: {images: any[], videos: any[]}) {
    console.log(images, videos);
    return (
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-1">
            {images.map((image, index) => (
                <div key={`image_${index}`} className="outline-none">
                    <img src={urlFor(image).width(500).url()} alt={`image_${index}`} className={`w-full object-cover outline-none` } />
                </div>
            ))}
            {videos.map((video, index) => (
                <div key={`video_${index}`} className="outline-none">
                    <ReactPlayer 
                        width="100%" 
                        height="100%" 
                        url='https://www.youtube.com/watch?v=LXb3EKWsInQ'
                    />
                </div>
            ))}
        </div>
    )
}