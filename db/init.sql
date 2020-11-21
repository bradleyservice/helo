CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    password VARCHAR(20),
    profile_pic TEXT
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(45),
    img TEXT,
    content TEXT,
    author_id INT REFERENCES users(id)
);

ALTER TABLE users ALTER COLUMN password TYPE TEXT;

INSERT INTO users (username, password, profile_pic)
VALUES ('butterman', 'butter', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRyLIYzSgZxSSc1TPENpxxa4BCc3BJs759TAvmQY4ATso_r-jd6E9mQ6a_yjrI&usqp=CAc'),
('slippers', 'ss', 'https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F200212121247-kfc-crocs-shoe-trnd.jpg'),
('foxy', 'shazam', 'https://cloudfront-us-east-1.images.arcpublishing.com/gray/W6A5RXAUYFA2FKPUCVGLIDCHDU.jpg');

INSERT INTO posts (title, img, content, author_id)
VALUES ('wow! i stuck to a building', 'https://static.scientificamerican.com/sciam/cache/file/EF448A89-3263-4E12-A5B26AE563F9B835_source.png?w=590&h=800&25C59DFF-77C6-46EE-90B0C86CBEF144A1', 'look at this amazing stuff', 13),
('new shoes, bro', 'https://www.yankodesign.com/images/design_news/2020/10/this-nike-x-croc/nike_crocs_1.jpg', 'cannot believe i snagged these beauties', 12),
('fur baby', 'https://numeralpaint.com/wp-content/uploads/2020/07/Cute-Baby-Fox-adult-paint-by-number.jpg', 'its just a painting', 13);