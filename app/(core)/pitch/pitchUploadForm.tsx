"use client";

import { useState } from "react";
import { storage, db } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default function PitchUploadForm() {
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    sector: "",
    description: "",
    founderName: "",
    founderTitle: "",
    founderPhotoUrl: "",
    pitchDetails: {
      problem: "",
      solution: "",
      marketSize: "",
      businessModel: "",
      competition: "",
      traction: "",
      team: "",
      askAmount: "",
      equity: "",
      useOfFunds: "",
    },
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name in form.pitchDetails) {
      setForm((prev) => ({
        ...prev,
        pitchDetails: {
          ...prev.pitchDetails,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!videoFile || !thumbnailFile) return alert("Upload both video and thumbnail!");

    setLoading(true);
    const id = uuidv4();

    try {
      // Upload video
      const videoRef = ref(storage, `pitches/${id}/video.mp4`);
      await uploadBytes(videoRef, videoFile);
      const videoUrl = await getDownloadURL(videoRef);

      // Upload thumbnail
      const thumbRef = ref(storage, `pitches/${id}/thumbnail.jpg`);
      await uploadBytes(thumbRef, thumbnailFile);
      const thumbnailUrl = await getDownloadURL(thumbRef);

      // Upload full pitch data
      await addDoc(collection(db, "pitches"), {
        ...form,
        videoUrl,
        thumbnailUrl,
        createdAt: Timestamp.now(),
      });

      alert("Pitch uploaded successfully!");
      setForm({
        name: "",
        tagline: "",
        sector: "",
        description: "",
        founderName: "",
        founderTitle: "",
        founderPhotoUrl: "",
        pitchDetails: {
          problem: "",
          solution: "",
          marketSize: "",
          businessModel: "",
          competition: "",
          traction: "",
          team: "",
          askAmount: "",
          equity: "",
          useOfFunds: "",
        },
      });
      setVideoFile(null);
      setThumbnailFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h2 className="text-xl font-semibold">Upload Pitch</h2>

      <input type="text" name="name" placeholder="Startup Name" value={form.name} onChange={handleChange} className="input" required />
      <input type="text" name="tagline" placeholder="Tagline" value={form.tagline} onChange={handleChange} className="input" required />
      <input type="text" name="sector" placeholder="Sector" value={form.sector} onChange={handleChange} className="input" required />
      <textarea name="description" placeholder="Short Description" value={form.description} onChange={handleChange} className="input" required />

      <input type="text" name="founderName" placeholder="Founder Name" value={form.founderName} onChange={handleChange} className="input" required />
      <input type="text" name="founderTitle" placeholder="Founder Title" value={form.founderTitle} onChange={handleChange} className="input" />
      <input type="text" name="founderPhotoUrl" placeholder="Founder Photo URL" value={form.founderPhotoUrl} onChange={handleChange} className="input" />

      {/* Pitch Details */}
      <h3 className="text-lg font-medium">Pitch Details</h3>
      {Object.entries(form.pitchDetails).map(([key, value]) => (
        <input
          key={key}
          type="text"
          name={key}
          placeholder={key}
          value={value}
          onChange={handleChange}
          className="input"
        />
      ))}

      <div className="space-y-2">
        <label>Upload Pitch Video</label>
        <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} required />
      </div>

      <div className="space-y-2">
        <label>Upload Thumbnail</label>
        <input type="file" accept="image/*" onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)} required />
      </div>

      <button type="submit" disabled={loading} className="btn">
        {loading ? "Uploading..." : "Upload Pitch"}
      </button>
    </form>
  );
}
