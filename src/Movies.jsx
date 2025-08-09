import React, { useState } from "react";
import { movies } from "./data";

const Movies = () => {
    const [movieList, setMovie] = useState(movies);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("newest");

    const categories = ["All", "Action", "Thriller", "Animation", "Horror", "Drama", "Sci-Fi"];

    const filterMovies = (category) => {
        setActiveCategory(category);
    };

    const getButtonClass = (category) => {
        const isActive = activeCategory === category;
        return isActive
            ? "px-4 py-2 border rounded transition bg-cyan-400 text-white border-cyan-400 shadow-md scale-105"
            : "px-4 py-2 border rounded transition text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-white";
    };

    const filteredMovies = movieList
        .filter((movie) => {
            if (activeCategory === "All") return true;
            return movie.category === activeCategory;
        })
        .filter((movie) =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === "newest") return new Date(b.release_date) - new Date(a.release_date);
            if (sortOrder === "oldest") return new Date(a.release_date) - new Date(b.release_date);
            return a.title.localeCompare(b.title);
        });

    return (
        <>
            <div className="flex justify-between items-center flex-wrap gap-4 my-4 px-5">
                {/* Title + Panda */}
                <div className="flex items-center gap-1">
                    <h1 className="text-3xl font-bold text-white head tracking-widest">Movie Panda</h1>
                    <img
                        src="https://img.freepik.com/premium-photo/panda-bear-with-black-background_900958-38879.jpg" // replace with your panda image path
                        alt="Panda Logo"
                        className="w-10 h-8"
                    />
                </div>

                {/* Search + Sort */}
                <div className="flex flex-wrap gap-4">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-10 py-2 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="px-4 py-2 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    >
                        <option value="newest" className="bg-black text-white">Newest First</option>
                        <option value="oldest" className="bg-black text-white">Oldest First</option>
                        <option value="az" className="bg-black text-white">A-Z</option>
                    </select>
                </div>
            </div>

            {/* Category Buttons */}
            <div className="flex gap-3 flex-wrap my-4 justify-center font-bold">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => filterMovies(category)}
                        className={getButtonClass(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Movie Cards */}
            <div className="flex justify-center items-center flex-wrap gap-6 p-4">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                        <div
                            key={movie.id}
                            className="bg-gray-900 rounded-lg overflow-hidden shadow-lg w-[250px] transform hover:scale-105 hover:shadow-xl transition duration-300"
                        >
                            <div className="relative">
                                <img
                                    src={movie.poster_path}
                                    alt={movie.title}
                                    className="w-full h-[370px] object-cover"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white">
                                    <span className="bg-cyan-500 text-xs px-2 py-1 rounded">
                                        {movie.category}
                                    </span>
                                </div>
                            </div>

                            {/* Movie Info */}
                            <div className="p-3 text-white text-center">
                                <h2 className="title-font text-lg font-semibold leading-tight h-[48px] overflow-hidden tracking-widest">
                                    {movie.title}
                                </h2>
                                <p className="text-sm opacity-80">
                                    Release: {movie.release_date}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white text-center">No movies found.</p>
                )}
            </div>
        </>
    );
};

export default Movies;
