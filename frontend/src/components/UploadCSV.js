import React, { useState } from 'react';

export default function UploadCSV() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  const handleUpload = async () => {
    if (!file) return setMsg('Please select a file');
    const allowed = ['csv']; // skipping xlsx per your note
    const ext = file.name.split('.').pop().toLowerCase();
    if (!allowed.includes(ext)) return setMsg('Only CSV allowed');

    setMsg('Uploading...');
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (res.ok) setMsg('Upload & distribution complete!');
      else setMsg(data.msg || 'Upload failed');
    } catch {
      setMsg('Server error');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', textAlign: 'center' }}>
      <h3>Upload CSV File</h3>
      <input type="file" accept=".csv" onChange={e => setFile(e.target.files[0])}/>
      <br/><br/>
      <button onClick={handleUpload}>Upload & Distribute</button>
      <p style={{ marginTop:10, color: msg.includes('complete') ? 'green' : 'red' }}>{msg}</p>
    </div>
  );
}










// import React, {useState} from 'react';
// import {uploadFile} from '../services/api';

// export default function UploadCSV({token, onDone}){
//     const [file, setFile] = useState(null);
//     const [msg, setMsg] = useState('');
    
//     const submit = async () => {
//         if (!file) return setMsg('Select file');
//         const res = await uploadFile(token, file);
//         setMsg(res.msg || res.error || JSON.stringify(res));
//         if (onDone) onDone();
//     };
//     return (
//         <div>
//             <input type='file' accept='.csv, .xlsx, .xls' onChange={e=>setFile(e.target.files[0])}/>
//             <button onClick={submit}>Upload & Distribute</button>
//             <div>{msg}</div>
//         </div>
//     )
// }