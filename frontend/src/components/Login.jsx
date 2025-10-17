import React, { useState } from 'react';

export default function Login({onLogin}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // check url with backend server.js
            const res = await fetch('http://localhost:5000/api/auth/login', {method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({email, password}) });
            const data = await res.json();
            if (data.token){
                localStorage.setItem('token', data.token);
                setMsg('Login successful');
                if (onLogin) onLogin();
            } else {
                setMsg(data.msg || 'Invalid credentials');
            }

        } catch(err){
            setMsg('Errorr connecting to server');
            console.error("Login error:", err);
        }
    } 



    return (
        <div>
            <h2>Admin login</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder='email' value={email} onChange={e=>setEmail(e.target.value)} style={styles.input}/>
                <input placeholder='password' value={password} onChange={e=>setPassword(e.target.value)} style={styles.input}/>
                <button type='submit' style={styles.button}>Submit</button>
            </form>
            <p style={{ marginTop: '10px', color: msg.includes('successful') ? 'green' : 'red' }}>{msg}</p>
        </div>
    );
};

const styles = {
    button: { width: '100%', padding: '8px' },
    input: { width: '100%', padding: '8px', marginBottom: '10px' }
}