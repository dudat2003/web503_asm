import fs from 'fs'
import Joi from 'joi'
// Model
const movies = [
    {
        "id": 1,
        "title": "The Grudge",
        "year": 2020,
        "cast": [
            "Andrea Riseborough",
            "Demián Bichir",
            "John Cho",
            "Betty Gilpin",
            "Lin Shaye",
            "Jacki Weaver"
        ],
        "genres": [
            "Horror",
            "Supernatural"
        ],
        "href": "The_Grudge_(2020_film)",
        "extract": "The Grudge is a 2020 American psychological supernatural horror film written and directed by Nicolas Pesce. Originally announced as a reboot of the 2004 American remake and the original 2002 Japanese horror film Ju-On: The Grudge, the film ended up taking place before and during the events of the 2004 film and its two direct sequels, and is the fourth installment in the American The Grudge film series. The film stars Andrea Riseborough, Demián Bichir, John Cho, Betty Gilpin, Lin Shaye, and Jacki Weaver, and follows a police officer who investigates several murders that are seemingly connected to a single house.",
        "thumbnail": "https://upload.wikimedia.org/wikipedia/en/3/34/The_Grudge_2020_Poster.jpeg"
    },
    {
        "id": 2,
        "title": "Underwater",
        "year": 2020,
        "cast": [
            "Kristen Stewart",
            "Vincent Cassel",
            "Jessica Henwick",
            "John Gallagher Jr.",
            "Mamoudou Athie",
            "T.J. Miller"
        ],
        "genres": [
            "Action",
            "Horror",
            "Science Fiction"
        ],
        "href": "Underwater_(film)",
        "extract": "Underwater is a 2020 American science fiction action horror film directed by William Eubank. The film stars Kristen Stewart, Vincent Cassel, Jessica Henwick, John Gallagher Jr., Mamoudou Athie, and T.J. Miller.",
        "thumbnail": "https://upload.wikimedia.org/wikipedia/en/4/4a/Underwater_poster.jpeg"
    },
    {
        "id": 3,
        "title": "Like a Boss",
        "year": 2020,
        "cast": [
            "Tiffany Haddish",
            "Rose Byrne",
            "Salma Hayek",
            "Jennifer Coolidge",
            "Billy Porter"
        ],
        "genres": [
            "Comedy"
        ],
        "href": "Like_a_Boss_(film)",
        "extract": "Like a Boss is a 2020 American comedy film directed by Miguel Arteta, written by Sam Pitman and Adam Cole-Kelly, and starring Tiffany Haddish, Rose Byrne, and Salma Hayek. The plot follows two friends who attempt to take back control of their cosmetics company from an industry titan.",
        "thumbnail": "https://upload.wikimedia.org/wikipedia/en/9/9a/LikeaBossPoster.jpg"
    },
    {
        "id": 4,
        "title": "Three Christs",
        "year": 2020,
        "cast": [
            "Richard Gere",
            "Peter Dinklage",
            "Walton Goggins",
            "Bradley Whitford"
        ],
        "genres": [
            "Drama"
        ],
        "href": "Three_Christs",
        "extract": "Three Christs, also known as State of Mind, is a 2017 American drama film directed, co-produced, and co-written by Jon Avnet and based on Milton Rokeach's nonfiction book The Three Christs of Ypsilanti. It screened in the Gala Presentations section at the 2017 Toronto International Film Festival. The film is also known as: Three Christs of Ypsilanti, The Three Christs of Ypsilanti, Three Christs of Santa Monica, and The Three Christs of Santa Monica.",
        "thumbnail": "https://upload.wikimedia.org/wikipedia/en/a/a1/Three_Christs_poster.jpg"
    }
]


const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().min(10).required().messages({
        'string.empty': "{{#label}} dữ liệu bắt buộc",
        "string.min": "{{#label}} tối thiểu {{#limit}} ký tự"
    }),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    cast: Joi.array().items(Joi.string()).min(1),
    genres: Joi.array().items(Joi.string()).min(1)
})

// Movies
export const createMovie = function (req, res) {
    const html = fs.readFileSync('./pages/add.html', "utf-8")
    res.send(html)
    res.end()
}

export const getAllMovies = function (req, res) {
    if (movies) {
        res.status(200).send(movies)
    } else {
        res.status(500).send({
            message: "Server internal errors"
        })
    }
    res.end()
}

export const getMovieById = function (req, res) {
    const { id } = req.params
    const movie = movies.find(m => m.id == id)
    if (movie) {
        res.status(200).send(movie);
    } else {
        res.status(404).send({ error: 'Movie not found' });
    }
    res.end()
}

export const addMovie = function (req, res) {
    const data = { ...req.body, id: Date.now() }
    const { error } = schema.validate(data)
    if (!error) {
        movies.push(data)
        res.status(201).send(movies)
    } else {
        res.status(400).send({
            error: error.details[0].message
        })
    }
    res.end()
}

export const updateMovie = (req, res) => {
    const { id } = req.params
    const { title, year } = req.body
    const movie = movies.find(m => m.id == id)
    if (movie) {
        movie.title = title || movie.title
        movie.year = year || movie.year

        res.status(200).send(movie)
    } else {
        res.status(404).send({ error: 'Movie not found' });
    }
}

export const deleteMovie = (req, res) => {
    const { id } = req.params
    const index = movies.find(m => m.id == id)
    if (index != -1) {
        movies.splice(index, 1)
        res.status(204).send(movies)
    } else {
        res.status(404).send({ error: 'Movie not found' });
    }
    res.end()
}


//Cast
export const getAllCasts = (req, res) => {
    const casts = movies.reduce((result, movie) => {
        return result.concat(movie.casts);
    }, []);
    res.status(200).json(casts);
}

export const getCastById = (req, res) => {
    const { id } = req.params;
    const cast = movies
        .map((movie) => movie.casts)
        .reduce((result, casts) => {
            return result.concat(casts);
        }, [])
        .find((c) => c == id);
    if (cast) {
        res.status(200).json(cast);
    } else {
        res.status(404).json({ error: "Cast not found" });
    }
}

export const addCast = (req, res) => {
    const { id } = req.params;
    const { cast } = req.body;
    const movie = movies.find((m) => m.id == id);
    if (movie) {
        movie.casts.push(cast);
        res.status(201).json(cast);
    } else {
        res.status(404).json({ error: "Movie not found" });
    }
}

export const updateCast = (req, res) => {
    const { movieId, castId } = req.params;
    const { cast } = req.body;
    const movie = movies.find((m) => m.id == movieId);
    if (movie) {
        const castIndex = movie.casts.findIndex((c) => c == castId);
        if (castIndex !== -1) {
            movie.casts[castIndex] = cast;
            res.status(200).json(cast);
        } else {
            res.status(404).json({ error: "Cast not found" });
        }
    } else {
        res.status(404).json({ error: "Movie not found" });
    }
}

export const deleteCast = (req, res) => {
    const { movieId, castId } = req.params;
    const movie = movies.find((m) => m.id == movieId);
    if (movie) {
        const castIndex = movie.casts.findIndex((c) => c == castId);
        if (castIndex !== -1) {
            movie.casts.splice(castIndex, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Cast not found" });
        }
    } else {
        res.status(404).json({ error: "Movie not found" });
    }
}


//Genres
export const getAllGenres = (req, res) => {
    const genres = movies.reduce((result, movie) => {
        return result.concat(movie.genres);
    }, []);
    res.status(200).json(genres);
}

export const getGenreById = (req, res) => {
    const { id } = req.params;
    const genre = movies
        .map((movie) => movie.genres)
        .reduce((result, genres) => {
            return result.concat(genres);
        }, [])
        .find((g) => g == id);
    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(404).json({ error: "Genre not found" });
    }
}

export const addGenre = (req, res) => {
    const { id } = req.params;
    const { genre } = req.body;
    const movie = movies.find((m) => m.id == id);
    if (movie) {
        movie.genres.push(genre);
        res.status(201).json(genre);
    } else {
        res.status(404).json({ error: "Movie not found" });
    }
}

export const updateGenre = (req, res) => {
    const { movieId, genreId } = req.params;
    const { genre } = req.body;
    const movie = movies.find((m) => m.id == movieId);
    if (movie) {
        const genreIndex = movie.genres.findIndex((g) => g == genreId);
        if (genreIndex !== -1) {
            movie.genres[genreIndex] = genre;
            res.status(200).json(genre);
        } else {
            res.status(404).json({ error: "genre not found" });
        }
    } else {
        res.status(404).json({ error: "Movie not found" });
    }
}
export const deleteGenre = (req, res) => {
    const { movieId, genre } = req.params;
    const movie = movies.find((m) => m.id == movieId);
    if (movie) {
        const genreIndex = movie.genres.findIndex((g) => g == genre);
        if (genreIndex !== -1) {
            movie.genres.splice(genreIndex, 1);
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Genre not found" });
        }
    } else {
        res.status(404).json({ error: "Movie not found" });
    }
}