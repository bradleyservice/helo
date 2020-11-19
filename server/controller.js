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
        // console.log(userposts, userid, search)
        // const {userid} = req.params;
        let posts = await db.get_all_posts([userposts, userid, search])
        console.log(posts)
        try {
            res.status(200).send(posts)
            // if(userposts === true && search !== null){
            //     let filteredPosts = posts.filter(el => el.title.toLowerCase().includes(search.toLowerCase()))
            //     return res.status(200).send(filteredPosts)
            // } else if (userposts === false && search === ''){
            //     let compareUser = await db.check_user(+userid)
            //     let unAuthor = posts.filter(el => el.username !== compareUser)
            //     return res.status(200).send(unAuthor)
            // } else if (userposts === false && search !== null){
            //     let compareUser = await db.check_user(+userid)
            //     let filterPosts = posts.filter(el => el.title.toLowerCase().includes(search.toLowerCase()) 
            //     && compareUser !== el.username)
            //     return res.status(200).send(filterPosts)
            // } else if (userposts === 'true' && search === ''){
            //     return res.status(200).send(posts)
            // }else {
            //     res.status(404).send('ew')
            // }
        } catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    },
    getOnePost: async (req, res) => {
        const db = req.app.get('db');
        const {postid} = req.params;
        let post = await db.get_post(+postid)
        if(post !== null){
            return res.status(200).send(post)
        } else {
            return res.status(403).send('post does not exist')
        }
    },
    createPost: async (req, res) => {
        const db = req.app.get('db');
        const {userid} = req.params;
        const {title, img, content} = req.body;
        let newPost = await db.create_post(title, img, content, +userid)
        if(newPost !== null){
            return res.status(200).send(newPost)
        } else {
            return res.status(401).send('post was not added to db')
        }
    }
}