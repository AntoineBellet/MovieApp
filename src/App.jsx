import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import MovieList from './components/MovieList/MovieList.jsx';
import MovieDetail from './components/MovieDetail/MovieDetail.jsx';
import Wishlist from './components/Wishlist/Wishlist.jsx';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<MovieList />} />
                        <Route path="/movie/:id" element={<MovieDetail />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
