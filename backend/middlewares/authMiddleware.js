// const jwt = require('jsonwebtoken');

// module.exports.authMiddleware = async (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//         return res.status(409).json({ error: 'Please login first' });
//     }
//     //authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzYwOTA1Yjg4ODM1ZjQ1NDkxNjkyZiIsInJvbGUiOiJzZWxsZXIiLCJpYXQiOjE3MDg5NjUwODksImV4cCI6MTcwOTU2OTg4OX0.KdBB5jGLx2a4_BE3sQoRdbKgoJ9KWA7KgW1TRD6D-Lw',
//     if (!accessToken) {
//         return res.status(409).json({ error: 'Please login first' })
//     } else {
//         try {
//             const deCodeToken = await jwt.verify(accessToken, process.env.SECRET)
//             req.role = deCodeToken.role
//             req.id = deCodeToken.id
//             next()
//         } catch (error) {
//             return res.status(409).json({ error: 'Please login' })
//         }
//     }
// }

const jwt = require('jsonwebtoken');

module.exports.authMiddleware = async (req, res, next) => {
    // Get the authorization header
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }

    // Split the header to get the token part
    const tokenParts = authHeader.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Invalid authorization header format' });
    }

    const accessToken = tokenParts[1];

    try {
        const decodedToken = await jwt.verify(accessToken, process.env.SECRET);
        req.role = decodedToken.role;
        req.id = decodedToken.id;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}
