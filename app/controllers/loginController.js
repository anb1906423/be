const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
    const cookies = req.cookies

    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ "message": "Email and password are required" })
    const foundUser = await User.findOne({ email: email }).exec()
    if (!foundUser) {
        res.status(401).send({ message: 'Thông tin tài khoản hoặc mật khẩu không chính xác!' }) //Incorrect username or password!
        return
    }
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (!match) {
        res.status(401).send({ message: 'Thông tin tài khoản hoặc mật khẩu không chính xác!' }) //Incorrect username or password!
        return
    }
    if (match) {
        const roles = foundUser.roles
        // create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET || 'access-token-secret',
            { expiresIn: '10s' }
        );
        const newRefreshToken = jwt.sign(
            { "email": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET || 'refresh-token-secret',
            { expiresIn: '15s' }
        );

        // Changed to let keyword
        let newRefreshTokenArray =
            !cookies?.jwt
                ? foundUser.refreshToken
                : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

        if (cookies?.jwt) {

            /* 
            Scenario added here: 
                1) User logs in but never uses RT and does not logout 
                2) RT is stolen
                3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
            */
            const refreshToken = cookies.jwt;
            const foundToken = await User.findOne({ refreshToken }).exec();

            // Detected refresh token reuse!
            if (!foundToken) {
                // clear out ALL previous refresh tokens
                newRefreshTokenArray = [];
            }

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        }

        // Saving refreshToken with current user
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        // const result = await foundUser.save();

        // Creates Secure Cookie with refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        // Send authorization roles and access token to user
        res.json({ accessToken, email, roles });

    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };
