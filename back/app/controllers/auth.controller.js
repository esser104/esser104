
const User = require('../controllers/user.controller.js');
const jwt = require('jsonwebtoken');


const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.email);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

// Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
}

exports.signup = async (req, res, next) => {
    const newUser = await User.create(req, res);

    createSendToken(newUser, 201, res);
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(res.status(400).send({message : new Error('insert mail or passworld')}));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne(req, res)

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(res.status(400).send({message : new Error('insert mail or passworld')}));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, res);
};

exports.protect = (async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(
            new (res.status(401).send({message : new Error('not loggin')}))
        );
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    // const currentUser = await User.findById(decoded.is);
    // if (!currentUser) {
    //     return next(res.status(401).send({message : new Error('not loging')}))
    // }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
});
