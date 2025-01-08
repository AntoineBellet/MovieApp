import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../../context/WishlistContext.jsx';
import styles from './Navbar.module.css';

const Navbar = () => {
    const { wishlist } = useContext(WishlistContext);



    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to="/" className={styles.navLink}>MovieApp</Link>
            </div>
            <ul className={styles.navLinks}>
                <li>
                    <Link to="/" className={styles.navLink}>Home</Link>
                </li>
                <li>
                    <Link to="/wishlist" className={styles.navLink}>
                        Wishlist <span className={styles.wishlistCount}>({wishlist.length})</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
