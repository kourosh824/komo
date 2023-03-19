import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';
import Movie from '../components/Movie';

const WishListPage = () => {
    const userId = auth.currentUser.uid;
    const [movies, setMovies] = useState([]);
    
    const fetchMovies = async () => {
        await getDocs(collection(db, `user-${userId}-movies`))
        .then((querySnapshot) => {
            const newData = querySnapshot.docs
            .map((doc) => <Movie movie={doc.data()} />);
            setMovies(newData);
        });
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    alert(userId);
    
    return (
        <div>
            {movies}
        </div>
    );
}

export default WishListPage;