
export async function validate (req, res, next){
    const {name, track, age} = req.body;
    console.log(req.body)

    if(!track){
        res.status(400).json({
            message: 'bad request',
            statusCode: 400
        })
        return;
    }
    next();
}