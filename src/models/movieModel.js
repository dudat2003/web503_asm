import mongoose from "mongoose"



const { Schema } = mongoose
const movieSchema = new Schema({
    title: String,
    year: Number,
    genres: [String],
    extract: String
})

const Movies = mongoose.model("movies", movieSchema)
export default Movies