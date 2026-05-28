import  express from 'express';
const app = express();

const PORT = 3000;

app.use(express.json());

let users=[
    {id:1, username:"us1", admin:false,},
    {id:2, username:"us2", admin:true},
];

app.get('/api/users', (req,res)=>{
    res.status(200).json(users);
});

app.get('/api/users/:id',(req, res)=>{
    const userID  = parseInt(req.params.id);
    const user = users.find(u=>u.id === userID);

    if(!user){
        return res.status(404).json({message:"User not Found!"});
    }
    res.status(200).json(user);
});

app.post('/api/users',(req,res)=>{
    const {username, admin} = req.body;
    if(!username){
        return res.status(404).json({message:"Username is Required!"});
    }
    const newUser={
        id:users.length+1,
        username,
        admin:admin !== undefined?admin:false
    };

    users.push(newUser);
    res.status(201).json({message:"User Created", user:newUser});
})

app.put('/api/users/:id',  (req,res)=>{
    const userID = parseInt(req.params.id);
    const {username, admin} = req.body;
     
    const user=users.find(u=>u.id  === userID);

    if(!user){
        return res.status(404).json({message:"User not Found"});
    }

    if(username!==undefined) user.username = username;
    if(admin!==undefined) user.admin  = admin;

    res.status(200).json({message:"User updated successfully", user});
});

app.delete('/api/users/:id', (req,res)=>{
    const userID = parseInt(req.params.id);
    const userIndex = users.findIndex(u=>u.id===userID);
    if(userIndex === -1){
        return res.status(404).json({message:"User not Found!"});
    }
    users.splice(userIndex, 1);
    res.status(200).json({message:`User with ID ${userID} has been deleted Successfully`})
})

const isAdmin =(req,res,next)=>{
    const currentUserId = parseInt(req.headers['user-id']);
    const currentUser = users.find(u=>u.id === currentUserId);
    if(!currentUser){
        return res.status(401).json({message:"Access Denied, User not found"});
    }
    if(!currentUser.admin){
        return res.status(403).json({message: "Access Denied: Admins only"});
    }

    next();
}

app.get('/api/admin/dashboard', isAdmin, (req, res)=>{
    res.status(200).json({
        message: "Welcome to the Secret Admin page",
        secretData:"This is the secret Data"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server Running on localhost:${PORT}`);
})
