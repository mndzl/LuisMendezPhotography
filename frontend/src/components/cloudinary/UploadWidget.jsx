import {useEffect, useRef, useState} from 'react';

const UploadWidget = () => {
    const [newImagePublicID, setNewImagePublicID] = useState({
        status: '',
        images: []
    });

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    const createImageInstance = async(public_id) => {
        const endpoint = '/api/newimage/';

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: public_id,
                gallery: 1,
            }),
        });
        if(!response.ok) throw new Error("Could not create Image Instance");

    }

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: import.meta.env.VITE_CLOUD_NAME,
            uploadPreset: 'origin_upload',
        }, function(error, result){
            if(result.event == 'success') {
                createImageInstance(result.info.public_id)
            }
            if(result.event == 'close') {
                window.location.reload(true);
            }
        });
    }, [])

    return (
        <button onClick={() => widgetRef.current.open()}>
            Upload
        </button>
    )
};

export default UploadWidget;