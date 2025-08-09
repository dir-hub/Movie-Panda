import React, { useState } from 'react';
import { movies } from './data';

const Movies = () => {
    const [movieList, setMovie] = useState(movies);
    const [activeCategory, setActiveCategory] = useState("All");

    const filterMovies = (category) => {
        setActiveCategory(category);
        if (category === "All") {
            setMovie(movies);
        } else {
            setMovie(movies.filter(movie => movie.category === category));
        }
    };

    const getButtonClass = (category) => {
        const isActive = activeCategory === category;

        if (category === "All") {
            return isActive
                ? "px-4 py-2 border rounded transition bg-blue-400 text-white border-blue-400"
                : "px-4 py-2 border rounded transition text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white";
        }

        return isActive
            ? "px-4 py-2 border rounded transition bg-cyan-400 text-white border-cyan-400"
            : "px-4 py-2 border rounded transition text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-white";
    };

    return (
        <>
            <div>
                <div className="flex gap-3 flex-wrap my-4 justify-center font-bold">
                    <button
                        onClick={() => filterMovies("All")}
                        className={getButtonClass("All")}
                    >
                        All
                    </button>

                    <button
                        onClick={() => filterMovies("Action")}
                        className={getButtonClass("Action")}
                    >
                        Action
                    </button>

                    <button
                        onClick={() => filterMovies("Thriller")}
                        className={getButtonClass("Thriller")}
                    >
                        Thriller
                    </button>

                    <button
                        onClick={() => filterMovies("Animation")}
                        className={getButtonClass("Animation")}
                    >
                        Animation
                    </button>

                    <button
                        onClick={() => filterMovies("Horror")}
                        className={getButtonClass("Horror")}
                    >
                        Horror
                    </button>

                    <button
                        onClick={() => filterMovies("Drama")}
                        className={getButtonClass("Drama")}
                    >
                        Drama
                    </button>

                    <button
                        onClick={() => filterMovies("Sci-Fi")}
                        className={getButtonClass("Sci-Fi")}
                    >
                        Sci-Fi
                    </button>
                </div>
            </div>

            <div className="flex justify-center items-center flex-wrap gap-4 p-4">
                {movieList.map((movie) => (
                    <div
                        key={movie.id}
                        className="bg-gray-900 rounded-lg overflow-hidden shadow-lg w-[250px]"
                    >
                        <img
                            src={movie.poster_path}
                            alt={movie.title}
                            className="w-full h-[370px] object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="p-3 text-white text-center">
                            <h2 className="title-font text-lg font-semibold leading-tight h-[48px] overflow-hidden tracking-widest">
                                {movie.title}
                            </h2>
                            <p className="text-sm">Release Date: {movie.release_date}</p>
                            <p className="text-sm">Category: {movie.category}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Movies;
