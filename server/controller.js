const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;
        let [foundUser] = await db.check_user(username);
        if(foundUser){
            return res.status(403).send('username already exists')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let [newUser] = await db.add_user([username, hash]);
        req.session.user = {
            userid: newUser.id,
            username: newUser.username
        }
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;
        let [user] = await db.check_user(username)
        if(!user){
            return res.status(403).send('Incorrect Login Information')
        }
        const authenticated = bcrypt.compareSync(password, user.password)
        if(authenticated){
            req.session.user = {
                userid: user.id,
                username: user.username
            }
            res.status(200).send(req.session.user)
        } else {
            res.status(401).send('Incorrect Login Information')
        }
    },
    getAllPosts: async (req, res) => {
        const db = req.app.get('db');
        const {userposts, userid, search} = req.query;
        try {
            let posts = await db.get_all_posts([userposts, userid, search])
            return res.status(200).send(posts)
        } catch(err){
            console.log(err)
            return res.sendStatus(404)
        }
    },
    getOnePost: async (req, res) => {
        const db = req.app.get('db');
        const {postid} = req.params;
        try {
            let post = await db.get_post(+postid)
            console.log(post)
            return res.status(200).send(post)
        } catch(err){
            return res.status(402).send('someone lolol')
        }
    },
    createPost: async (req, res) => {
        const db = req.app.get('db');
        const {userid} = req.session.user;
        console.log(userid)
        const {title, img, content} = req.body;
        let newPost = await db.create_post(title, img, content, +userid)
        if(newPost !== null){
            return res.status(200).send(newPost)
        } else {
            return res.status(401).send('post was not added to db')
        }
    },
    deletePost: async (req, res) => {
        const db = req.app.get('db');
        const {postid} = req.params;
        try {
            let deletedPost = await db.delete_post(+postid);
            console.log(postid)
            res.status(200).send(deletedPost)
        } catch(err){
            console.log('something is not right', err)
            res.sendStatus(501)
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}