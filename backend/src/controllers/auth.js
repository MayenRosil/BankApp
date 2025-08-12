

export const register = (req, res, next) => {
    console.log(req.body);
    
    res.status(200).json({message: 'auth route'})
    return;
}