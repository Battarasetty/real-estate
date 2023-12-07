import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase'

const CreateListing = () => {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: []
    });
    // console.log(formData);
    const [imageUploadError, setImageUploadError] = useState('');

    const [uploading, setUploading] = useState(false);

    // console.log(imageUploadError);

    const handleImageSubmit = () => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true)
            const promises = [];
            // console.log(promises);
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                console.log(urls);
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
                setImageUploadError('');
                setUploading(false)
            }).catch((err) => {
                setUploading(false)
                setImageUploadError("Image Upload Failed (2 mb max per image) ")
            })
        }
        else {
            setImageUploadError("You can only upload 6 images per listing")
            setUploading(false)
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i != index)
        })
    }


    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-center my-7 text-3xl font-semibold'>
                Create a listing
            </h1>
            <form className='flex flex-col sm:flex-row gap-4'>
                <div className="flex flex-col gap-4 flex-1">
                    <input
                        type="text"
                        className='border p-3 rounded-lg'
                        id='name'
                        placeholder='Name'
                        maxLength='64'
                        minLength='10'
                        required
                    />
                    <textarea
                        id="description"
                        required
                        className='border p-3 rounded-lg'
                        placeholder='Description'

                    />
                    <input
                        type="text"
                        placeholder='address'
                        className='border p-3 rounded-lg'
                        id='address'
                        maxLength='64'
                        minLength='10'
                        required
                    />
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="sale" className='w-5' />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="rent" className='w-5' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="parking" className='w-5' />
                            <span>Parking Spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="furnished" className='w-5' />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id="offer" className='w-5' />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-wrap'>
                        <div className='flex items-center gap-4'>
                            <input
                                className='p-3 border-gray-300 rounded-lg'
                                type="number" min="1" max="10" id="bedrooms" required />
                            <span>Beds</span>
                        </div>
                        <div className='flex items-center gap-4'>
                            <input
                                className='p-3 border-gray-300 rounded-lg'
                                type="number" min="1" max="10" id="bathrooms" required />
                            <span>Baths</span>
                        </div>
                        <div className='flex items-center gap-4'>
                            <input
                                className='p-3 border-gray-300 rounded-lg'
                                type="number" min="1" max="10" id="RegularPrice" required />
                            <p>Regular Price <br /> <span>($ / Month)</span></p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <input
                                className='p-3 border-gray-300 rounded-lg'
                                type="number" min="1" max="10" id="discountedPrice" required />
                            <p>Discounted price <br /> <span>($ / Month)</span></p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-4">
                    <p className='font-semibold'>Images:
                        <span className='font-normal text-gray-600 ml-1'>The first image will be the cover (max 6)</span>
                    </p>
                    <div className='flex gap-3'>
                        <input
                            onChange={(e) => setFiles(e.target.files)}
                            type="file" id='images' accept='image/*' multiple className='rounded border p-3' />
                        <button type='button' disabled={uploading} onClick={handleImageSubmit} className='p-4 uppercase hover:shadow-lg disabled:opacity-80 border rounded border-green-700 text-green-600'>
                            {uploading ? 'Uploading' : 'Upload'}
                        </button>
                    </div>
                    <p className='text-red-700 text-sm'>{(imageUploadError && formData.imageUrls.length > 0) ? imageUploadError : ''}</p>
                    {
                        formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                            <div key={url} className='flex justify-between p-3 border rounded-lg items-center'>
                                <img src={url} alt="Listing Image" className='w-20 h-20 object-contain rounded-lg' />
                                <button type='button' onClick={() => handleRemoveImage(index)} className='text-red-700 hover:opacity-50 uppercase'>Delete</button>
                            </div>
                        ))
                    }
                    <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
                </div>
            </form>
        </main>
    )
}

export default CreateListing