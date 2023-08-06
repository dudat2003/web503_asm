import fs from 'fs'
import Joi from 'joi'
import Movies from '../models/movieModel'



const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().min(10).required().messages({
        'string.empty': "{{#label}} dữ liệu bắt buộc",
        "string.min": "{{#label}} tối thiểu {{#limit}} ký tự"
    }),
    year: Joi.number().min(1990).required().messages({
        'number.empty': "{{#label}} dữ liệu bắt buộc",
        "number.min": "{{#label}} từ năm 1990"
    }),
    cast: Joi.array().items(Joi.string()).min(1),
    genres: Joi.array().items(Joi.string()).min(1)
})

// Movies
export const createMovie = function (req, res) {
    const html = fs.readFileSync('./pages/add.html', "utf-8")
    res.send(html)
    res.end()
}

export const getAllMovies = async function (req, res) {
    try {
        const movies = await Movies.find()
        res.status(200).send(movies)
    } catch (error) {
        res.status(500).send({
            message: "Internal server Error!"
        })
    }
    res.end()
}

export const getMovieById = async function (req, res) {
    const { id } = req.params
    try {
        const movie = await Movies.findById(id)
        res.send(movie)
    } catch (err) {
        res.status(500).send({
            message: "Internal server Error!"

        })
    }
    res.end()
}

export const addMovie = async function (req, res) {
    try {
        const { error } = schema.validate(req.body, { abortEarly: false })
        if (!error) {
            const movie = await Movies.create(req.body)
            res.send({
                massage: "Complete",
                data: movie
            })
        } else {
            const messages = error.details.map(item => item.message)
            res.status(400).send({
                message: messages
            })
        }
    } catch (err) {
        res.status(500).send({
            message: "Internal server Error!"

        })
    }
    res.end()
}


export const updateMovie = async function (req, res) {
    const { id } = req.params
    try {
        const { error } = schema.validate(req.body, { abortEarly: false })
        if (!error) {
            const movie = await Movies.findByIdAndUpdate(id, req.body)
            res.send({
                massage: "Complete",
                data: movie
            })
        } else {
            const messages = error.details.map(item => item.message)
            res.status(400).send({
                message: messages
            })
        }
    } catch (err) {
        res.status(500).send({
            message: "Internal server Error!"

        })
    }
    res.end()
}


export const deleteMovie = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Movies.findByIdAndDelete(id)
        if (data) {
            res.send({
                message: "Delete Complete",
                data: data
            })
        } else {
            res.status(400).send({
                message: "Khong tim thay du lieu"
            })
        }

    } catch (err) {
        res.status(500).send({
            message: "Internal server Error!"

        })
    }
}

//Cast
// export const getAllCasts = (req, res) => {
//     const casts = movies.reduce((result, movie) => {
//         return result.concat(movie.cast)
//     }, [])
//     res.status(200).send(casts)
//     res.end()

// }


// export const getCastByMovieId = (req, res) => {
//     const { id } = req.params
//     const movie = movies.find((m) => m.id == id)

//     if (movie) {
//         res.status(200).json(movie.cast)
//     } else {
//         res.status(404).json({ error: "Movie not found" })
//     }
//     res.end()
// }

// export const addCastToMovie = (req, res) => {
//     const { id } = req.params
//     const { cast } = req.body
//     const movie = movies.find((m) => m.id == id)
//     if (movie) {
//         movie.cast.push(...cast)
//         res.status(201).send(movie.cast)
//     } else {
//         res.status(404).send({ error: "Movie not found" })
//     }
//     res.end()
// }

// export const updateCastInMovie = (req, res) => {
//     const { id, castName } = req.params
//     const { newCastName } = req.body
//     const movie = movies.find((m) => m.id == id)
//     if (movie) {
//         const castIndex = movie.cast.findIndex((c) => c == castName)
//         if (castIndex !== -1) {
//             movie.cast[castIndex] = newCastName
//             res.status(200).send(movie.cast)
//         } else {
//             res.status(404).send({ error: "Cast not found" })
//         }
//     } else {
//         res.status(404).send({ error: "Movie not found" })
//     }
//     res.end()
// }

// export const deleteCast = (req, res) => {
//     const { id } = req.params
//     const movie = movies.find((m) => m.id == id)
//     if (movie) {
//         const { castName } = req.body
//         if (!castName) {
//             res.status(400).json({ error: "Missing castName in request body" })
//             return
//         }

//         const castIndex = movie.cast.findIndex((c) => c == castName)
//         if (castIndex !== -1) {
//             movie.cast.splice(castIndex, 1)
//             res.status(200).send(movie.cast)
//         } else {
//             res.status(404).json({ error: "Cast not found" })
//         }
//     } else {
//         res.status(404).json({ error: "Movie not found" })
//     }
// }

// //Genres
// export const getAllGenres = (req, res) => {
//     const genres = movies.reduce((result, movie) => {
//         return result.concat(movie.genres)
//     }, [])
//     res.status(200).send(genres)
//     res.end()
// }

// export const getGenreById = (req, res) => {
//     const { id } = req.params
//     const movie = movies.find((g) => g.id == id)

//     if (movie) {
//         res.status(200).json(movie.genres)
//     } else {
//         res.status(404).json({ error: "Movie not found" })
//     }
//     res.end()
// }

// export const addGenreToMovie = (req, res) => {
//     const { id } = req.params
//     const { genre } = req.body
//     const movie = movies.find((g) => g.id == id)
//     if (movie) {
//         movie.genres.push(genre)
//         res.status(201).send(movie.genres)
//     } else {
//         res.status(404).send({ error: "Movie not found" })
//     }
//     res.end()
// }

// export const updateGenreInMovie = (req, res) => {
//     const { id, genreName } = req.params
//     const { newGenreName } = req.body
//     const movie = movies.find((m) => m.id == id)
//     if (movie) {
//         const genreIndex = movie.genres.findIndex((g) => g == genreName)
//         if (genreIndex !== -1) {
//             movie.genres[genreIndex] = newGenreName
//             res.status(200).send(movie.genres)
//         } else {
//             res.status(404).send({ error: "Genre not found" })
//         }
//     } else {
//         res.status(404).send({ error: "Movie not found" })
//     }
//     res.end()
// }

// export const deleteGenre = (req, res) => {
//     const { id } = req.params
//     const movie = movies.find((m) => m.id == id)
//     if (movie) {
//         const { genreName } = req.body
//         if (!genreName) {
//             res.status(400).json({ error: "Missing genreName in request body" })
//             return
//         }

//         const genreIndex = movie.genres.findIndex((g) => g == genreName)
//         if (genreIndex !== -1) {
//             movie.genres.splice(genreIndex, 1)
//             res.status(200).send(movie.genres)
//         } else {
//             res.status(404).json({ error: "Genre not found" })
//         }
//     } else {
//         res.status(404).json({ error: "Movie not found" })
//     }
//     res.end()
// }