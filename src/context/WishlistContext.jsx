import { createContext, useState, useEffect } from 'react';


export const WishlistContext = createContext();


export const WishlistProvider = ({ children }) => {

    const [wishlist, setWishlist] = useState(() => {
        // Charger la wishlist depuis le localStorage au démarrage
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });


    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);


    const addToWishlist = (movie) => {
        if (!wishlist.find((m) => m.id === movie.id)) {
            setWishlist([...wishlist, movie]);
        }
    };


    const removeFromWishlist = (id) => {
        setWishlist(wishlist.filter((movie) => movie.id !== id));
    };

    return (
        <WishlistContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};
