import {Cloudinary} from '@cloudinary/url-gen';
import {AdvancedImage} from '@cloudinary/react';

const cld = new Cloudinary({
    cloud:{
        cloudName: import.meta.env.VITE_CLOUD_NAME,
    }
})

function CldImage({publicID}) {
    const image = cld.image(publicID);

  return (
    <AdvancedImage 
        cldImg={image}                 
        className="w-100 h-100 rounded"
        style={{ objectFit: "cover", cursor: "pointer" }}
    />

  )
}

export default CldImage;
