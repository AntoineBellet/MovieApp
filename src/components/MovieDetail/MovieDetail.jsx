import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { WishlistContext } from '../../context/WishlistContext.jsx';
import styles from './MovieDetail.module.css';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const { addToWishlist } = useContext(WishlistContext);
    const titleRef = useRef(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=6fe2f414234007f59524a7b2524cab23`
                );
                console.log(id);
                setMovie(response.data);
                titleRef.current.scrollIntoView({ behavior: 'smooth' });
            } catch (error) {
                console.log('Error fetching movie details: ', error);
            }
        };

        const fetchMovieCast = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=6fe2f414234007f59524a7b2524cab23`
                );
                setCast(response.data.cast.slice(0, 10));
            } catch (error) {
                console.log('Error fetching movie cast: ', error);
            }
        };

        const fetchMovieSimilar = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=6fe2f414234007f59524a7b2524cab23`
                );
                console.log(id);
                setSimilarMovies(response.data.results.slice(0, 5)); // Correction ici
            } catch (error) {
                console.log('Error fetching similar movies: ', error);
            }
        };

        fetchMovie();
        fetchMovieCast();
        fetchMovieSimilar();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className={styles.container} ref={titleRef}>
            <div className={styles.movieDetail}>
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.poster}
                />
                <div className={styles.info}>
                    <h1 >{movie.title}</h1>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
                    <p><strong>Overview:</strong> {movie.overview}</p>
                    <button
                        onClick={() => addToWishlist(movie)}
                        className={styles.wishlistButton}
                    >
                        Add to Wishlist
                    </button>
                </div>
            </div>
            <div className={styles.cast}>
                <h2>Top Cast</h2>
                <ul>
                    {cast.map((actor) => (
                        <li key={actor.id} className={styles.actor}>
                            <img
                                src={
                                    actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                                        : 'https://via.placeholder.com/200x300?text=No+Image'
                                }
                                alt={actor.name}
                                className={styles.actorImage}
                            />
                            <p>{actor.name}</p>
                            <p className={styles.character}>as {actor.character}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.similarMovies}>
                <h2>Similar Movies</h2>
                <div className={styles.movieGrid}>
                    {similarMovies.map((similarMovie) => (
                        <div key={similarMovie.id} className={styles.movieCard}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${similarMovie.poster_path}`}
                                alt={similarMovie.title}
                                className={styles.moviePoster}
                            />
                            <h3>{similarMovie.title}</h3>
                            <Link to={`/movie/${similarMovie.id}`} className={styles.detailsButton}>
                                Voir les détails
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
