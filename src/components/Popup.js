import React from 'react';
import popupStyles from '../styles/popup.module.css';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const Popup = ({ userId, info, show }) => {
    const closeBtn = (e) => {
        show(false);
    };

    const wishListBtn = async (e) => {
        e.preventDefault();

        try {
            const ref = await addDoc(collection(db, `user-${userId}-movies`), {
                ...info
            });
            console.log("Document written with ID: ", ref.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const readBtn = async (e) => {
        await getDocs(collection(db, `user-${userId}-movies`))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => console.log(doc.data()));
            });
    };

    const deleteBtn = async (e) => {
        await getDocs(collection(db, `user-${userId}-movies`))
        .then((querySnapshot) => {
            querySnapshot.docs.forEach((movie) => {
                if(movie.data().ID === info.ID) {
                    console.log('DELETING');
                    const docRef = doc(db, `user-${userId}-movies`, movie.id);
                    deleteDoc(docRef);
                }
            });
        });
    };

    return (
        <div
        className={popupStyles['popup-back']}>
            <div
            className={popupStyles['popup']}>
                <p
                className={popupStyles['popup__title']}>
                    {info.Title}
                </p>
                <img
                className={popupStyles['popup__poster']}
                alt={info.Title}
                src={info.Poster} />
                <div
                className={popupStyles['popup__metadata']}>
                    <div
                    className={popupStyles['popup__info']}>
                        <p
                        className={popupStyles['popup__info-title']}>
                            YEAR:
                        </p>
                        <p
                        className={popupStyles['popup__info-res']}>
                            {info.Year}
                        </p>
                    </div>
                    <div
                    className={popupStyles['popup__info']}>
                        <p
                        className={popupStyles['popup__info-title']}>
                            DIRECTOR:
                        </p>
                        <p
                        className={popupStyles['popup__info-res']}>
                            {info.Director}
                        </p>
                    </div>
                    <div
                    className={popupStyles['popup__info']}>
                        <p
                        className={popupStyles['popup__info-title']}>
                            GENRE:
                        </p>
                        <p
                        className={popupStyles['popup__info-res']}>
                            {info.Genre}
                        </p>
                    </div>
                    <div
                    className={popupStyles['popup__info']}>
                        <p
                        className={popupStyles['popup__info-title']}>
                            IMDB:
                        </p>
                        <p
                        className={popupStyles['popup__info-res']}>
                            {info.imdbRating}
                        </p>
                    </div>
                </div>
                <p
                className={popupStyles['popup__plot']}>
                    {info.Plot}
                </p>
                <div
                className={popupStyles['popup__bottom']}>
                    <button
                    className={popupStyles['popup__btn']}
                    onClick={closeBtn}>
                        CLOSE
                    </button>
                    <button
                    className={popupStyles['popup__btn']}
                    onClick={wishListBtn}>
                        WISH LIST
                    </button>
                    <button
                    className={popupStyles['popup__btn']}
                    onClick={readBtn}>
                        READ
                    </button>
                    <button
                    className={popupStyles['popup__btn']}
                    onClick={deleteBtn}>
                        DELETE
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Popup;