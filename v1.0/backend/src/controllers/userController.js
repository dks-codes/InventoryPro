import User from "../models/userModel.js";


export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if(!username || !email || !password){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const userExists = await User.findOne({$or: [{email}, {username}] });
        if(userExists) return res.status(409).json({ message: "User Already Exists! "});

        const newUser = new User({ username, email, password });
        await newUser.save();

        const token = newUser.generateAuthToken(); 

        return res.status(201)
           .cookie('authToken', token, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
            })
           .json({ message: "New User Created Successfully!" , userId: newUser.id });
    }
    catch(err){
        return res.status(500).json({
            message: "Internal Server Error",
            error : err.message
        })
    }
}

export const login = async (req,res) => {
    const {email, password} = req.body;

    try{
        if(!email || !password) return res.status(400).json({ message: "Email and password are required!"});

        const user = await User.findOne({ email });
        if(!user) return res.status(401).json({ message: "Invalid Credentials !!"});

        const isMatch = await user.matchPassword(password);
        if(!isMatch) return res.status(401).json({ message: "Invalid Credentials !!"});

        const token = user.generateAuthToken();

        res.cookie('authToken', token, {
            httpOnly: true,
            // sameSite: 'strict',
            maxAge: 10      * 24 * 60 * 60 * 1000, // 10 days
          });

        const { password: _, ...userData } = user.toObject();
        return res.status(200).json({ message: "User Logged in Successfully! ", user: userData });

    }catch(err){
        res.status(500).json({
            message: "Internal Server Error",
            error : err.message
        }) 
    }
}


export const logout = async (req, res) => {
    res.cookie('authToken', '', { httpOnly: true, maxAge: 0 });
    res.json({ message: 'User logged out! ' });
}


export const deleteUser = async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);

        if(!user) {
            return res.status(404).json({ message: "User Not Found!"});
        }

        res.clearCookie("authToken");
        return res.status(200).json({ message: "User Deleted Successfully! "})
    }
    catch(err){
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
}

export const profile = async (req,res) => {
    const { username, email } = req.user;
    return res.status(200).json({ username, email });
}