import {useEffect, useRef, useState} from 'react';
import { addDoc, collection } from 'firebase/firestore';
import {db} from '../../firebase/config'

const UploadWidget = () => {
    const [newImagePublicID, setNewImagePublicID] = useState("");

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    const createFirebaseDoc = async() => {
        const docRef = await addDoc(collection(db, "images"), {
            url: newImagePublicID,
        });
        console.log("created new document ID ", docRef.id);
    }

    useEffect(() => {  
        if(newImagePublicID) createFirebaseDoc();
    }, [newImagePublicID])

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: import.meta.env.VITE_CLOUD_NAME,
            uploadPreset: 'origin_upload',
        }, function(error, result){
            if(result.event == 'success') {
                console.log(result.info.public_id);
                setNewImagePublicID(result.info.public_id);
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