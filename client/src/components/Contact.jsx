import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({ listing }) => {
  // console.log(listing);
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');
  // console.log(landlord);

  useEffect(() => {
    const fetchLandlord = async (req, res) => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        // console.log(error.message);
      }
    }

    fetchLandlord()
  }, [listing.userRef])

  const onChange = (e) => {
    setMessage(e.target.value)
  }


  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>Contact <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
          <textarea className='border w-full p-3 rounded-lg' placeholder='enter your message' name="message" id="message" rows="2" value={message} onChange={(e) => onChange(e)}>
          </textarea>
          <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  )
}

export default Contact