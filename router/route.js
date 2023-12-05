
import express from 'express';
import {validate} from '../middleware/validate.js';

const router = express.Router();

let users = [{
    name: 'kunle',
    track:'backend',
    age: 24
},
{
    name:'bola',
    track: 'frontend',
    age: 25
},
{
    name: 'john',
    track: 'design',
    age: 21
}
]

router.get('/users', (req, res)=>{
    res.status(200).json({
        message: 'successfuly fetched all users',
        data: users
    })
})

router.post('/users', validate,(req,res)=>{
    console.log(req.body)
    const {name, age, track} = req.body;
    // console.log(data);
    users.push({
        name, track, age
    })
    res.status(201).json({
        message: 'created user successfuly',
        data: users
    })
})
router.put('/users/:name', (req,res)=>{
    const data = req.body;
    console.log(data);
    const userName = req.params.name;
    const updateUsers = users.map((user)=>{
        if (userName != user.name) return user
        return data
    })

    users = updateUsers;

    res.status(201).json({
        message: 'updated user',
        data: users
   })
})

router.delete('/users/:user', (req,res)=>{
    const id = req.params.user
    console.log(id)
    
    const newUsers = users.filter((user, index)=>user.name != id)

    users = newUsers;

 
    res.status(204).json({
        message: 'deleted user',
        data: users
    })

})

export default router;