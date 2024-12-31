import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore from "swiper";
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
const Listing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log('Params:', params.listingId);
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          console.error(data.message);
          return;
        }
        setListing(data);
        console.log(listing.imageUrls);
        setLoading(false);
        setError(false);
      } catch (err) {
        setLoading(false);
        setError(true);
        console.error(err.message);
      }
    };

    fetchListing();
  }, [params.listingId]); // Dependency array ensures re-fetching when listingId changes

  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading..</p>}
        {error && <p className='text-center my-7 text-2xl'>Something went Wrong!!</p>}
        {
            listing && !error && !loading && (
                <div>
                    <Swiper navigation>
                        {
                            listing.imageUrls.map((url)=>(
                                <SwiperSlide key={url}>
                                    <div className=" mt-1 h-[500px]" style={{background:`url(${url}) center no-repeat`,backgroundSize: "cover"}}></div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            )
        }
    </main>
  );
};

export default Listing;
