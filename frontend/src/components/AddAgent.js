import { useState } from "react";


export default function AddAgent() {
    const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });
    const [msg, setMsg] = useState('')
    const token = localStorage.getItem('token');

    const handleChange = (e)=>setForm({ ...form, [e.target.name]:e.target.value})
    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/agents", { method: 'POST', headers:{"Content-Type":"application/json", "Authorization":`Bearer ${token}`}, body: JSON.stringify(form)});
            const data = await res.json()
            if (res.ok){
                setMsg('success ! Agent added successfully')
                setForm({ name: '', email: '', mobile: '', password: '' });
            } else {
                setMsg(data.msg || 'Failed to add agent');
            }
        } catch(err) {
            setMsg(`server error ${err.message}`);
            console.log('error from here AddAgent.js.')
        }
    }
    

    return (
        <div style={{ maxWidth: 350, margin: '50px auto', textAlign: 'center' }}>
            <h3>Add Agent</h3>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} style={styles.input} required />
                <input name="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} required />
                <input name="mobile" placeholder="mobile" value={form.mobile} onChange={handleChange} style={styles.input} required />
                <input name="password" placeholder="Password" value={form.password} onChange={handleChange} style={styles.input} required />
                <button type="submit" style={styles.button}>Add Agent</button>
            </form>
            <p style={{ marginTop:10, color: msg.includes('success') ? 'green' : 'red' }}>{msg}</p>
        </div>
    );
}

const styles = {
    button: { width:'100%', padding:8 },
    input: { width:'100%', marginBottom:8, padding:8 }
}