import express from 'express';
import {createReadStream} from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import userRouter from './router/route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();

app.get('/about',(req,res)=>{
    res.status(201).json('this is the about route');
})

// To serve the index html page from the public dir
// app.use(express.static('public'));
//OR


app.get('/',(req,res)=>{
    const filePath = path.join(__dirname + '/public/index.html')
    console.log(filePath)
    const readStream = createReadStream(filePath,'utf8');
    res.setHeader('Content-type','text/html');

    readStream.pipe(res);
})


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/form', (req,res)=>{
    const data = req.body;
    console.log(data);
    res.setHeader('Content-type','application/json');
    res.status(201).json({
        message: 'created user successfuly',
        statusCode: 201,
    })
})
app.put('/form/', (req,res)=>{
    const data = req.body;
    console.log(data);

    res.status(201).json({
        message: 'updated user',
        statusCode: 201,
   })
})


// loclahost:3000/form/1?name=abc
app.delete('/form/:id', (req,res)=>{
    const id = req.params.id
    console.log(id)
 
    res.status(204).json({
        message: 'deleted user',
        statusCode: 204,
    })

})

app.use('/app', userRouter)



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})