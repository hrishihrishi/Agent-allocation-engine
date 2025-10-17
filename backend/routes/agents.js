const express = require('express'), router = express.Router();
const Agent = require('../models/Agent');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const Task = require('../models/Task');

router.post('/', auth, async(req,res)=>{
    try {
        const {name, email, mobile, password} = req.body;
        if(!name||!email||!mobile||!password) return res.status(400).json({msg:'Missing fields'});

        const hashed = await bcrypt.hash(password, 10);
        const agent = new Agent({name,email,mobile,password:hashed});
        await agent.save();
        res.status(201).json({ msg: 'Agent added successfully', agent });
    } catch {
        console.log(err);
        res.status(500).json({ msg:'server error' })
    }

});


// Get all agents and their tasks
router.get('/tasks', auth, async (req, res) => {
    try {
      const agents = await Agent.find().lean();
  
      // Fetch tasks for each agent
      const agentsWithTasks = await Promise.all(
        agents.map(async (agent) => {
          const tasks = await Task.find({ agent: agent._id }).lean();
          return { ...agent, tasks };
        })
      );
  
      res.json(agentsWithTasks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Error fetching tasks' });
    }
  });

module.exports = router;