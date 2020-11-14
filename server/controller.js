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
            id: newUser.id,
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
                id: user.id,
                username: user.username
            }
            res.status(200).send(req.session.user)
        } else {
            res.status(401).send('Incorrect Login Information')
        }
    },
    getAllPosts: async (req, res) => {
        const db = req.app.get('db');
        const {userposts, search} = req.query;
        let posts = await db.get_all_posts()
        if(userposts && search !== null){
            let filteredPosts = posts.filter(el => el.title.toLowerCase().includes(search.toLowerCase()))
            console.log(search)
            return res.status(200).send(filteredPosts)
        } else {
            err => console.log(err)
            res.status(403).send('ew')
        }
        
    }
}