import React, { useEffect, useState } from 'react';

export default function ViewTasks() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // fetch all agents
        const resAgents = await fetch('http://localhost:5000/api/agents', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const agentsData = await resAgents.json();

        // fetch tasks for each agent
        const tasksPromises = agentsData.map(async (agent) => {
          const resTasks = await fetch(`http://localhost:5000/api/agents/${agent._id}/tasks`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const tasksData = await resTasks.json();
          return { ...agent, tasks: tasksData };
        });

        const agentsWithTasks = await Promise.all(tasksPromises);
        setAgents(agentsWithTasks);
        setLoading(false);
      } catch(err) {
        setMsg(`Error fetching tasks ${err}`);
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  if (loading) return <p style={{ textAlign:'center', marginTop:50 }}>Loading...</p>;
  if (msg) return <p style={{ textAlign:'center', color:'red', marginTop:50 }}>{msg}</p>;

  return (
    <div style={{ maxWidth: 800, margin: '30px auto' }}>
      <h2 style={{ textAlign: 'center' }}>Agents & Assigned Tasks</h2>
      {agents.map(agent => (
        <div key={agent._id} style={{ border: '1px solid #ccc', margin: 10, padding: 10, borderRadius: 5 }}>
          <h4>{agent.name} ({agent.email})</h4>
          {agent.tasks.length ? (
            <ul>
              {agent.tasks.map(task => (
                <li key={task._id}>{task.firstName} - {task.phone} - {task.notes}</li>
              ))}
            </ul>
          ) : (
            <p>No tasks assigned</p>
          )}
        </div>
      ))}
    </div>
  );
}
