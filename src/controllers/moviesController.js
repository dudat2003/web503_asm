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
        ]
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
        ]
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
        ]
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
    res.end()

}

export const deleteMovie = (req, res) => {
    const { id } = req.params
    const index = movies.findIndex(m => m.id == id)
    if (index != -1) {
        movies.splice(index, 1)
        console.log(movies);
        res.status(200).json(movies)
    } else {
        res.status(404).send({ error: 'Movie not found' });
    }
    res.end()
}


//Cast
export const getAllCasts = (req, res) => {
    const casts = movies.reduce((result, movie) => {
        return result.concat(movie.cast);
    }, []);
    res.status(200).send(casts);
    res.end()

}


export const getCastByMovieId = (req, res) => {
    const { id } = req.params;
    const movie = movies.find((m) => m.id == id);

    if (movie) {
        res.status(200).json(movie.cast);
    } else {
        res.status(404).json({ error: "Movie not found" });
    }
    res.end()
}

export const addCastToMovie = (req, res) => {
    const { id } = req.params;
    const { cast } = req.body;
    const movie = movies.find((m) => m.id == id);
    if (movie) {
        movie.cast.push(...cast);
        res.status(201).send(movie.cast);
    } else {
        res.status(404).send({ error: "Movie not found" });
    }
    res.end()
}

export const updateCastInMovie = (req, res) => {
    const { id, castName } = req.params;
    const { newCastName } = req.body;
    const movie = movies.find((m) => m.id == id);
    if (movie) {
        const castIndex = movie.cast.findIndex((c) => c == castName);
        if (castIndex !== -1) {
            movie.cast[castIndex] = newCastName;
            res.status(200).send(movie.cast);
        } else {
            res.status(404).send({ error: "Cast not found" });
        }
    } else {
        res.status(404).send({ error: "Movie not found" });
    }
    res.end()
}

export const deleteCast = (req, res) => {
    const { id } = req.params
    const movie = movies.find((m) => m.id == id);
    if (movie) {
        const { castName } = req.body;
        if (!castName) {
            res.status(400).json({ error: "Missing castName in request body" });
            return;
        }

        const castIndex = movie.cast.findIndex((c) => c == castName);
        if (castIndex !== -1) {
            movie.cast.splice(castIndex, 1);
            res.status(200).send(movie.cast);
        } else {
            res.status(404).json({ error: "Cast not found" });
        }
    } else {
        res.status(404).json({ error: "Movie not found" });
    }
};

//Genres
export const getAllGenres = (req, res) => {
    const genres = movies.reduce((result, movie) => {
        return result.concat(movie.genres);
    }, []);
    res.status(200).send(genres);
    res.end()
}

export const getGenreById = (req, res) => {
    const { id } = req.params;
    const movie = movies.find((g) => g.id == id);

    if (movie) {
        res.status(200).json(movie.genres);
    } else {
        res.status(404).json({ error: "Movie not found" });
    }
    res.end()
}

export const addGenreToMovie = (req, res) => {
    const { id } = req.params;
    const { genre } = req.body;
    const movie = movies.find((g) => g.id == id);
    if (movie) {
        movie.genres.push(genre);
        res.status(201).send(movie.genres);
    } else {
        res.status(404).send({ error: "Movie not found" });
    }
    res.end()
}

export const updateGenreInMovie = (req, res) => {
    const { id, genreName } = req.params;
    const { newGenreName } = req.body;
    const movie = movies.find((m) => m.id == id);
    if (movie) {
        const genreIndex = movie.genres.findIndex((g) => g == genreName);
        if (genreIndex !== -1) {
            movie.genres[genreIndex] = newGenreName;
            res.status(200).send(movie.genres);
        } else {
            res.status(404).send({ error: "Genre not found" });
        }
    } else {
        res.status(404).send({ error: "Movie not found" });
    }
    res.end()
}

export const deleteGenre = (req, res) => {
    const { id } = req.params
    const movie = movies.find((m) => m.id == id);
    if (movie) {
        const { genreName } = req.body;
        if (!genreName) {
            res.status(400).json({ error: "Missing genreName in request body" });
            return;
        }

        const genreIndex = movie.genres.findIndex((g) => g == genreName);
        if (genreIndex !== -1) {
            movie.genres.splice(genreIndex, 1);
            res.status(200).send(movie.genres);
        } else {
            res.status(404).json({ error: "Genre not found" });
        }
    } else {
        res.status(404).json({ error: "Movie not found" });
    }
}