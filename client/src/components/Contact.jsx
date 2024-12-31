import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState(" ");
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    const fetchLandLord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.useRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandLord();
  }, [listing.useRef]);
  return (
    <div>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your Message here"
            className="w-full border p-3 rounded-lg"
          ></textarea>
          <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className="text-white text-center p-3 bg-slate-700 rounded-lg hover:opacity-90">Send Message</Link>
        </div>
      )}
    </div>
  );
};

export default Contact;
