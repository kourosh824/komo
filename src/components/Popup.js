import React from 'react';

import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

import popupStyles from '../styles/popup.module.css';
/**
 * 
 * @param userId The user ID without importing auth from firebase
 * @param info Detailed information of the movie
 * @param setVisible Whether the Popup should be visible
 * @param showRemove If the remove button is visible (only from WatchListPage.js)
 * @returns 
 */
const Popup = ({ userId, info, setVisible, showRemove, reFetch }) => {
    // once the close button is finished hide the popup
    const closeBtn = (e) => {
        setVisible(false);
    };
    // once the watch list button is clicked
    const watchListBtn = async (e) => {
        e.preventDefault(); // the default action of the event will be canceled
        let watchListed = false;
        // first check if the movie is already watch listed
        await getDocs(collection(db, `user-${userId}-movies`))
        .then((querySnapshot) => {
            querySnapshot.docs.forEach((movie) => {
                // if there is a movie with
                if(movie.data().imdbID === info.imdbID) {
                    watchListed = true;
                }
            });
        });
        // if not watch listed then
        if(!watchListed) {
            try {
                // add it to the Cloud Firestore
                await addDoc(collection(db, `user-${userId}-movies`), {
                    ...info
                });
            } catch (e) {
                /**
                 * TODO: Show some sort of error message
                 */
            }
        }
        // close the popup once it has been watch listed
        closeBtn();
    };
    // if the delete button is clicked
    const removeBtn = async (e) => {
        // find the data in Cloud Firestore
        await getDocs(collection(db, `user-${userId}-movies`))
        .then((querySnapshot) => {
            querySnapshot.docs.forEach((movie) => {
                // if it is the same movie we are talking about then delete it
                if(movie.data().imdbID === info.imdbID) {
                    const docRef = doc(db, `user-${userId}-movies`, movie.id);
                    deleteDoc(docRef);
                }
            });
        });
        // close the popup once it has been removed from the watch list
        closeBtn();
        reFetch();
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
                    {!showRemove &&
                    <button
                    className={popupStyles['popup__btn']}
                    onClick={watchListBtn}>
                        WATCH LIST
                    </button>}
                    {showRemove && 
                    <button
                    className={popupStyles['popup__btn']}
                    onClick={removeBtn}>
                        REMOVE
                    </button>}
                </div>
            </div>
        </div>
    );
}

export default Popup;