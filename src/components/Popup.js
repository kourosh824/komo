import React from 'react';
import popupStyles from '../styles/popup.module.css';

const Popup = ({ info, show }) => {
    const closeBtn = (e) => {
        show(false);
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
                <button
                className={popupStyles['popup__close']}
                onClick={closeBtn}>
                    CLOSE
                </button>
            </div>
        </div>
    );
}

export default Popup;