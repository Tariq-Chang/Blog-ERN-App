const blogs = require('../db/db');
const getBlogs = (req, res) => {
    res.status(200).json(blogs)
}

const getBlogById = (req, res) => {
    const { id } = req.params;
    let blog = blogs.find((blog) => blog.id === parseInt(id));
    if (blog === null) {
        res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
}

const getBlogsByAuthor = (req, res) => {

    const { author } = req.query;
    const getBlogs = blogs.find(blog => blog.author.name === author);
    if (!getBlogs) {
        return res.status(404).send("No blog found with author " + author)
    }

    res.status(200).json(getBlogs);
}

const getBlogsByTitle = (req, res) => {
    const { title } = req.query;

    const getBlogs = blogs.filter((blogs) => blogs.title === title);
    if (!getBlogs) {
        return res.status(404).send("No blog found with title " + title);
    }

    res.status(200).json(getBlogs);
}
const createBlog = async(req, res) => {
    const { title, body, imageURL, tags, author } = req.body;

    if (!title || !body || !imageURL || !tags) {
        return res.status(403).json({ message: "Please fill all fields" });
    }

    let newBlog = { id: blogs.length + 1, title, body, imageURL, author, created_at: new Date().toLocaleDateString, tags };
    blogs.push(newBlog);

    res.status(201).json({ message: "Blog Created Successfully" });
}

const updateBlog = (req, res) => {
    const { title, body, imageURL, tags, author } = req.body;
    const { id } = req.params;

    const getBlog = blogs.find((blog) => blog.id === Number(id));

    if (!getBlog) {
        return res.status(404).json({ message: "Blog does not exist" });
    }

    getBlog.title = title;
    getBlog.body = body;
    getBlog.imageURL = imageURL;
    getBlog.tags = tags;
    getBlog.author = author;

    res.status(200).json({message: "Blog updated successfully"});
}

module.exports = { getBlogs, getBlogById, createBlog, getBlogsByAuthor, getBlogsByTitle, updateBlog}