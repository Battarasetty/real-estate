import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle'


const Listing = () => {
    SwiperCore.use([Navigation]);
    const params = useParams()
    const [listing, setlisting] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`)
                const data = await res.json();
                // console.log(data);
                if (data.success === false) {
                    console.log(data.message);
                    setLoading(false)
                    setError(true)
                }
                setLoading(false)
                setlisting(data);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }

        fetchListing();
    }, [])

    return (
        <main>
            {loading && <p className='text-center text-2xl my-7'>Loading...</p>}
            {error && <p className='text-center text-2xl my-7'>Something went wrong!</p>}

            {listing && !error && !loading && (
                (
                    <div>
                        <Swiper navigation>
                            {
                                listing.imageUrls.map((url) => (
                                    <SwiperSlide key={url}>
                                        <div className="h-[550px]" style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}></div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                )
            )}
        </main>
    )
}

export default Listing