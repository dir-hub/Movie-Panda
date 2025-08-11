import React, { useState } from "react";
import { movies } from "./data";
import FadeInSection from "./FadeInSection";

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
            ? "px-3 py-1 sm:px-4 sm:py-2 border rounded transition bg-cyan-400 text-white border-cyan-400 shadow-md scale-105 text-sm sm:text-base"
            : "px-3 py-1 sm:px-4 sm:py-2 border rounded transition text-cyan-400 border-cyan-400 hover:bg-cyan-400 hover:text-white text-sm sm:text-base";
    };

    const filteredMovies = movieList
        .filter((movie) => activeCategory === "All" || movie.category === activeCategory)
        .filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === "newest") return new Date(b.release_date) - new Date(a.release_date);
            if (sortOrder === "oldest") return new Date(a.release_date) - new Date(b.release_date);
            return a.title.localeCompare(b.title);
        });

    return (
        <>
            {/* Header */}
            <div className="flex justify-between items-center flex-wrap gap-4 my-4 px-3 sm:px-5">
                <div className="flex items-center gap-1">
                    <h1 className="head text-xl sm:text-3xl font-bold text-white tracking-widest">
                        Movie Panda
                    </h1>
                    <img
                        src="https://img.freepik.com/premium-photo/panda-bear-with-black-background_900958-38879.jpg"
                        alt="Panda Logo"
                        className="w-8 h-6 sm:w-10 sm:h-8"
                    />
                </div>

                <div className="flex flex-wrap m-auto sm:m-0 gap-2 sm:gap-4">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 sm:px-10 py-1 sm:py-2 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base"
                    />
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="px-2 sm:px-4 py-1 sm:py-2 rounded-xl border border-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-sm sm:text-base"
                    >
                        <option value="newest" className="bg-black text-white">Newest First</option>
                        <option value="oldest" className="bg-black text-white">Oldest First</option>
                        <option value="az" className="bg-black text-white">A-Z</option>
                    </select>
                </div>
            </div>

            {/* Category Buttons */}
            <div className="flex gap-2 sm:gap-3 flex-wrap my-4 justify-center font-bold">
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
            <div className="flex justify-center items-center flex-wrap gap-4 sm:gap-6 p-2 sm:p-4">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                        <FadeInSection key={movie.id}>
                            <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg w-[160px] sm:w-[250px] transform hover:scale-105 hover:shadow-xl transition duration-300">
                                <div className="relative">
                                    <img
                                        src={movie.poster_path}
                                        alt={movie.title}
                                        className="w-full h-[240px] sm:h-[370px] object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-3 text-white">
                                        <span className="bg-cyan-500 text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1 rounded">
                                            {movie.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-2 sm:p-3 text-white text-center">
                                    <h2 className="title-font text-sm sm:text-lg font-semibold leading-tight h-[38px] sm:h-[48px] overflow-hidden tracking-widest">
                                        {movie.title}
                                    </h2>
                                    <p className="text-xs sm:text-sm opacity-80">
                                        Release: {movie.release_date}
                                    </p>
                                </div>
                            </div>
                        </FadeInSection>
                    ))
                ) : (
                    <p className="text-white text-center">No movies found.</p>
                )}
            </div>
        </>
    );
};

export default Movies;
