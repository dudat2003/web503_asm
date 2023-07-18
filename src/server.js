import express from 'express';
import mongoose from 'mongoose';
import moviesRoutes from './routes/movies.js';
import castsRoutes from './routes/casts.js';
import genresRoutes from './routes/genres.js';

const app = express();

mongoose.connect('mongodb://localhost/movie_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/movies', moviesRoutes);
app.use('/casts', castsRoutes);
app.use('/genres', genresRoutes);

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
