const express = require('express'), router = express.Router();
const multer = require('multer');
const csv = require('csvtojson');
const xlsx = require('xlsx');
const auth = require('../middleware/auth');
const Agent = require('../models/Agent');
const Task = require('../models/Task');
const path = require('path');

// const storage = multer.diskStorage({destination: '/uploads', filename: (req, file, cb)=>cb(null, Date.now()+path.extname(file.original))});

const fs = require('fs');


const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});


const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = ['.csv','.xlsx','.xls','axls','axlsx'];
        const ext = path.extname(file.originalname).toLowerCase();
        if(allowed.includes(ext)) cb(null, true); else cb(new Error('Invalid file type'));
    },
    limits: { fileSize: 5*1024*1024 }
});

router.post('/', auth, upload.single('file'), async(req, res)=>{
    if(!req.file) return res.status(400).json({msg:'No file'})
    const ext = path.extname(req.file.originalname).toLowerCase();
    let rows = [];
    try{
        if (ext=='csv'){
            rows = await csv().fromFile(req.file.path);
        } else { 
            const wb = xlsx.readFile(req.file.path);
            const sheet = wb.Sheets[wb.SheetNames[0]];
            rows = xlsx.utils.sheet_to_json(sheet);
        }
    } catch(e){ return res.status(400).json({msg:'could not parse file', error:e.message})}

    rows = rows.map(r => {
        return {
            firstName: r.FirstName ?? r.firstname ?? r.first_name ?? r.Firstname ?? '',
            phone: r.Phone ?? r.phone ?? r.PhoneNumber ?? '',
            notes: r.Notes ?? r.notes ?? ''
        }
    }).filter(r=> r.firstName && r.phone);
    if(!rows.length) return res.status(400).json({msg: 'no valid rows'});

    const n = rows.length;
    const k = Agent.length;
    const base = Math.floor(n/k);
    let rem = n%k;
    let idx = 0;
    const created = [];
    for(let i=0;i<k;i++){
        const take = base + (rem>0?1:0);
        if (rem>0) rem--;
        for (let j=0;j<take;j++){
            const r = rows[idx++];
            const t = new Task({ firstName: r.firstName, phone: r.phone.toString(), notes: r.notes, agent: agents[i]._id });
            created.push(t.save());
        }
    }
    await Promise.all(created);
    res.json({msg:'Distributed', total:n});

});

module.exports = router;
