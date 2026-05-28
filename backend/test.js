const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req,res)=>{
    res.send('Hello World');
});

app.get('/api/user',(req,res)=>{
    res.json({
        id:1,
        name:'Nikhil',
        role:"Dev",
    });
});


app.listen(PORT, ()=>{
    console.log(`Server is running successfully on https://localhost:${PORT}`);
});

