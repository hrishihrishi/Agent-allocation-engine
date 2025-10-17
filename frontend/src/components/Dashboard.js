import { useNavigate } from 'react-router-dom';

// headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }

export default function Dashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/";
      }

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div>
            <h2>Admin dashboard for agent management</h2>
            <div>
                <button onClick={()=>navigate('/add-agent')} style={styles.button} >Add Agent</button>
                <button onClick={()=>navigate('/upload-csv')} style={styles.button} >Upload File</button>
                <button onClick={() => navigate('/view-tasks')} style={{ marginRight: 10, padding: 8 }}>View All Tasks</button>
                <button onClick={logout} style={{ background: 'red', color: 'white', padding: 8 }}>Logout</button>
            </div>
        </div>
    )
}

const styles = {
    button: { width:'100%', padding:8 },
    input: { width:'100%', marginBottom:8, padding:8 }
}