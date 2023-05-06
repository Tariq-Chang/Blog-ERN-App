const express = require('express');
const dotenv = require('dotenv');
const blogRoutes = require('./routes/blogRoutes');

dotenv.config();
const app = express();

app.use(express.json())
app.use('/blogs', blogRoutes);


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server listening at localhost:${process.env.PORT || 5000}`);
})