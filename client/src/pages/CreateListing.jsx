import React from 'react'

const CreateListing = () => {
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
                        <input type="file" id='images' accept='image/*' multiple className='rounded border p-3' />
                        <button className='p-4 uppercase hover:shadow-lg disabled:opacity-80 border rounded border-green-700 text-green-600'>Upload</button>
                    </div>
                    <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
                </div>
            </form> 
        </main>
    )
}

export default CreateListing