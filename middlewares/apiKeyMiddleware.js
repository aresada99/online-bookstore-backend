const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key']; 
    if (!apiKey || apiKey !== process.env.API_KEY) { 
        return res.status(401).json({ message: 'Geçersiz API anahtarı' }); 
    }
    next(); 
};

export default apiKeyMiddleware;