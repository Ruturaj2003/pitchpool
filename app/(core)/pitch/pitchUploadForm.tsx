'use client';

import { useState } from 'react';
import { storage, db } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';

export default function PitchUploadForm() {
  const { user } = useUser();
  // TODO : redirect if not a user
  const [form, setForm] = useState({
    name: '',
    tagline: '',
    sector: '',
    description: '',
    founderName: '',
    founderTitle: '',
    founderPhotoUrl: '',
    pitchDetails: {
      problem: '',
      solution: '',
      marketSize: '',
      businessModel: '',
      competition: '',
      traction: '',
      team: '',
      askAmount: '',
      equity: '',
      useOfFunds: '',
    },
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !thumbnailFile)
      return alert('Please upload both the pitch video and a thumbnail.');

    setLoading(true);
    const id = uuidv4();

    try {
      const videoRef = ref(storage, `pitches/${id}/video.mp4`);
      await uploadBytes(videoRef, videoFile);
      const videoUrl = await getDownloadURL(videoRef);

      const thumbRef = ref(storage, `pitches/${id}/thumbnail.jpg`);
      await uploadBytes(thumbRef, thumbnailFile);
      const thumbnailUrl = await getDownloadURL(thumbRef);

      await addDoc(collection(db, 'pitches'), {
        ...form,
        videoUrl,
        thumbnailUrl,
        // userId: user?.id,
        createdAt: Timestamp.now(),
      });

      alert('Pitch uploaded successfully!');
      setForm({
        name: '',
        tagline: '',
        sector: '',
        description: '',
        founderName: '',
        founderTitle: '',
        founderPhotoUrl: '',
        pitchDetails: {
          problem: '',
          solution: '',
          marketSize: '',
          businessModel: '',
          competition: '',
          traction: '',
          team: '',
          askAmount: '',
          equity: '',
          useOfFunds: '',
        },
      });
      setVideoFile(null);
      setThumbnailFile(null);
    } catch (err) {
      console.error(err);
      alert('Upload failed.');
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow space-y-8"
    >
      <h2 className="text-2xl font-bold text-primary">🎬 Upload Your Pitch</h2>

      {/* Basic Info */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Startup Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="name"
            label="Startup Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            name="tagline"
            label="Tagline"
            value={form.tagline}
            onChange={handleChange}
            required
          />
          <Input
            name="sector"
            label="Sector"
            value={form.sector}
            onChange={handleChange}
            required
          />
          <Input
            name="founderName"
            label="Founder Name"
            value={form.founderName}
            onChange={handleChange}
            required
          />
          <Input
            name="founderTitle"
            label="Founder Title"
            value={form.founderTitle}
            onChange={handleChange}
          />
          <Input
            name="founderPhotoUrl"
            label="Founder Photo URL"
            value={form.founderPhotoUrl}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label className="block mb-1 font-medium">Short Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Brief overview of your startup, its mission, and what makes it special."
            className="w-full border rounded-md p-2"
            rows={4}
            required
          />
        </div>
      </section>

      {/* Pitch Details */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Pitch Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(form.pitchDetails).map(([key, value]) => (
            <Input
              key={key}
              name={key}
              label={key.replace(/([A-Z])/g, ' $1')}
              value={value}
              onChange={handleChange}
            />
          ))}
        </div>
      </section>

      {/* File Uploads */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Media Uploads</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FileInput
            label="Pitch Video"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            required
          />
          <FileInput
            label="Thumbnail Image"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
            required
          />
        </div>
      </section>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition"
      >
        {loading ? 'Uploading...' : 'Upload Pitch'}
      </button>
    </form>
  );
}

// Reusable Input Component with placeholders
const Input = ({
  name,
  label,
  value,
  onChange,
  required = false,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) => {
  const placeholders: Record<string, string> = {
    name: 'e.g. EcoCharge',
    tagline: 'e.g. Charging the world sustainably',
    sector: 'e.g. Renewable Energy',
    founderName: 'e.g. Jane Doe',
    founderTitle: 'e.g. CEO & Founder',
    founderPhotoUrl: 'Paste an image URL (e.g. from LinkedIn)',
    problem: 'What problem are you solving?',
    solution: 'Describe your unique solution',
    marketSize: 'How big is the opportunity?',
    businessModel: 'How will you make money?',
    competition: 'Who else is doing this?',
    traction: 'Any growth, users, or revenue?',
    team: 'Who is building this?',
    askAmount: 'How much are you raising? (e.g. $100,000)',
    equity: 'Equity offered for the investment (e.g. 10%)',
    useOfFunds: 'How will you use the funds?',
  };

  return (
    <div>
      <label htmlFor={name} className="block mb-1 font-medium">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholders[name] || ''}
        className="w-full border rounded-md p-2"
        required={required}
      />
    </div>
  );
};

// Reusable File Input Component
const FileInput = ({
  label,
  accept,
  onChange,
  required = false,
}: {
  label: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type="file"
      accept={accept}
      onChange={onChange}
      required={required}
      className="w-full"
    />
  </div>
);
