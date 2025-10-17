const API = 'http://localhost:5000/api';
export const login = (email,password)=> fetch(`${API}/auth/login`,{
  method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})
}).then(r=>r.json());

export const createAgent = (token, data)=> fetch(`${API}/agents`,{
  method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`}, body:JSON.stringify(data)
}).then(r=>r.json());

export const uploadFile = (token, file)=> {
  const fd = new FormData(); fd.append('file', file);
  return fetch(`${API}/upload`, { method:'POST', headers:{'Authorization':`Bearer ${token}`}, body:fd }).then(r=>r.json());
}

export const getAgents = (token)=> fetch(`${API}/agents`,{headers:{'Authorization':`Bearer ${token}`}}).then(r=>r.json());
export const getTasks = (token, agentId)=> fetch(`${API}/agents/${agentId}/tasks`,{headers:{'Authorization':`Bearer ${token}`}}).then(r=>r.json());
