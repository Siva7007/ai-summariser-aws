import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = e => setFile(e.target.files[0]);

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    // Upload file
    const uploadRes = await fetch('https://your-api/upload', { method: 'POST', body: formData });
    const uploadData = await uploadRes.text();
    const fileName = uploadData.replace('File uploaded as ', '');

    // Extract text
    const extractRes = await fetch('https://your-api/extract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ s3_key: fileName })
    });
    const extractedText = await extractRes.text();

    // Summarise
    const summariseRes = await fetch('https://your-api/summarise', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ book_text: extractedText })
    });
    const summariseData = await summariseRes.json();

    setSummary(summariseData.summary || summariseData.body || '');
    setLoading(false);
  };

  return (
    <div>
      <h1>AI Book Summariser</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || loading}>
        Upload & Summarise
      </button>
      {loading && <p>Processing...</p>}
      {summary && (
        <div>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default App;