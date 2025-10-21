import { useRef, useState } from "react";
import Image from 'next/image';

export default function ImagePicker({label, name}: {label: string, name: string }) {
    const [pickedImage, setPickedImage] = useState();
    const imageInputRef = useRef();

    const handlePickClick = () => {
        imageInputRef.current.click();
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    }

    return (
        <div className="">
            <label htmlFor="image">{label}</label>
            <div className="">
                <div className="">
                    {!pickedImage && <p>No Image Picked yet</p>}
                    {pickedImage && <Image src={pickedImage} alt="The image selected by the user" fill/>}
                </div>
                <input 
                className=""
                type="file" 
                id="image" 
                accept="image/png, image/jpeg"
                name={name}
                ref={imageInputRef}
                onChange={handleInputChange}
                required
                />
            </div>
        </div>
    );
}