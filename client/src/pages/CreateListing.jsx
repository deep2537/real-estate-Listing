import React, { useState } from "react";
const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  let url1;
  const [imageUploadError, setImageUploadError] = useState(false);
  const[uploading,setUploading]=useState(false);
  console.log(formData);
  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
        setUploading(true);
        setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image upload failed ");
          setUploading(false);
        });
    } else {
      setImageUploadError("You can upload only upto 6 images per listing");
      setUploading(false);
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "listing_real_estate"); // Use your upload preset
      data.append("cloud_name", "dwjtkdwul"); // Replace with your Cloudinary cloud name

      fetch("https://api.cloudinary.com/v1_1/dwjtkdwul/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => {
          if (!res.ok) {
            return res
              .json()
              .then((error) =>
                reject(new Error(error.error?.message || "Upload failed"))
              );
          }
          return res.json();
        })
        .then((uploadedImage) => {
          console.log(`Image uploaded successfully: ${uploadedImage.url}`);
          resolve(uploadedImage.secure_url); // Resolve with the secure URL of the uploaded image
        })
        .catch((error) => {
          console.error("Error uploading to Cloudinary:", error.message);
          reject(error); // Reject the promise with the error
        });
    });
  };
  const handleRemoveImg=(index)=>{
    setFormData({...formData,imageUrls:formData.imageUrls.filter((_,i)=>i!==index)});
  }
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form action="" className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />
          <div className="flex gap-12 flex-wrap mt-3">
            <div className="flex gap-2">
              <input type="checkbox" className="w-6" id="sale" />
              <span className="">Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-6" id="rent" />
              <span className="">Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-6" id="parking" />
              <span className="">Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-6" id="furnished" />
              <span className="">Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-6" id="offer" />
              <span className="">Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 mt-5">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col text-center">
                <p>Regular Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="discountedPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col text-center">
                <p>Discounted Price</p>
                <span className="text-xs">($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 ml-2 gap-4">
          <p className="font-semibold">
            Images:{" "}
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="buttom"
              disabled={uploading}
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-75"
            >
             {uploading?"Uploading ...":"Upload"}
            </button>
          </div>
          <p className="text-red-700">{imageUploadError && imageUploadError}</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url,index) => {
              console.log(url.toString());
              return (
                <div  key={url} className="flex justify-between p-3 border items-center">
                  <img
                    src={url}
                    alt="Listing image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button className="p-3 text-red-700 rounded-lg hover:opacity-85" onClick={()=>handleRemoveImg(index)}>
                    Delete
                  </button>
                </div>
              );
            })}
          <button className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-70">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
