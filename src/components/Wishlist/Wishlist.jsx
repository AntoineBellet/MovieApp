import React, { useContext } from 'react';
import { WishlistContext } from '../../context/WishlistContext.jsx';
import { Link } from 'react-router-dom';
import styles from './Wishlist.module.css';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useContext(WishlistContext);

    if (wishlist.length === 0) {
        return (
            <div className={styles.emptyWishlist}>
                <h2>Your Wishlist is empty!</h2>
                <Link to="/" className={styles.goBackButton}>
                    Go Back to Movies
                </Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1>Your Wishlist</h1>
            <div className={styles.movieGrid}>
                {wishlist.map((movie) => (
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
                        <button
                            onClick={() => removeFromWishlist(movie.id)}
                            className={styles.removeButton}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
