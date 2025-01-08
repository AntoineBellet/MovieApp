import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
    const [totalPages, setTotalPages] = useState(1); // État pour le nombre total de pages

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/popular?api_key=6fe2f414234007f59524a7b2524cab23&page=${currentPage}`
                );
                setMovies(response.data.results);
                setTotalPages(response.data.total_pages); // Met à jour le nombre total de pages
            } catch (error) {
                console.error('Error fetching popular movies:', error);
            }
        };

        fetchMovies();
    }, [currentPage]); // Déclenche l'appel API à chaque changement de page

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Popular Movies</h1>
            <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
            />
            <div className={styles.movieGrid}>
                {filteredMovies.map((movie) => (
                    <div key={movie.id} className={styles.movieCard}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.title}
                            className={styles.moviePoster}
                        />
                        <h3>{movie.title}</h3>
                        <Link to={`/movie/${movie.id}`} className={styles.detailsButton}>
                            Voir les détails
                        </Link>
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={styles.paginationButton}
                >
                    Page précédente
                </button>
                <span className={styles.pageInfo}>
          Page {currentPage} sur {totalPages}
        </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={styles.paginationButton}
                >
                    Page suivante
                </button>
            </div>
        </div>
    );
};

export default MovieList;
