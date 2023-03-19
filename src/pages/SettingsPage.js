import React from "react";
import { useState, useEffect } from "react";

import { auth, db } from '../firebase';
import { getDocs, collection, addDoc, updateDoc, doc } from "firebase/firestore";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import settingStyle from '../styles/settingsPage.module.css';
import { signInWithEmailAndPassword } from "firebase/auth";

const SettingsPage = () => {
    const userId = auth.currentUser.uid; // users id
    // decides whether the sidebar should be visible or not
    const [showSide, setShowSide] = useState(false);
    // where we store users fullname
    const [fullname, setFullname] = useState('');
    // where we store users username
    const [username, setUsername] = useState('');
    // where we store users bio
    const [about, setAbout] = useState('');
    // called in the start to get all the movies from the watch list
    const fetchData = async () => {
        // get the movies from Cloud Firestore
        await getDocs(collection(db, `user-${userId}-personal`))
        .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {
                const data = doc.data();
                setFullname(data.fullname);
                setUsername(data.username);
            });
        });
    };
    // called when the user wants to make a change
    const onSaveChanges = async (e) => {
        e.preventDefault();
        let firstTime = false;
        await getDocs(collection(db, `user-${userId}-personal`))
        .then((querySnapshot) => {
            if(querySnapshot.docs.length === 0) {
                firstTime = true;
            }
        });
        // if it is the first time make the collection
        // else just find the old one and change the data
        if(firstTime) {
            try {
                // add it to the Cloud Firestore
                await addDoc(collection(db, `user-${userId}-personal`), {
                    fullname: fullname,
                    username: username
                });
            } catch (e) {
                /**
                 * TODO: Show some sort of error message
                 */
            }
        } else {
            await getDocs(collection(db, `user-${userId}-personal`))
            .then((querySnapshot) => {
                querySnapshot.docs.forEach((docem) => {
                    const docRef = doc(db, `user-${userId}-personal`, docem.id);
                    updateDoc(docRef, {
                        fullname: fullname,
                        username: username
                    });
                })
            });
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <Header
            title="KOMO"
            setSideVisible={setShowSide} />
            {showSide && 
            <Sidebar
            setVisible={setShowSide} />}
            <div
            className={settingStyle['settings-container']}>
                <form
                className={settingStyle['settings-form']}>
                    <div
                    className={settingStyle['settings-form__input']}>
                        <label htmlFor="fullname">Fullname </label>
                        <input
                        id="fullname"
                        name="fullname"
                        type="text"
                        required
                        placeholder={fullname}
                        onChange={(e) => setFullname(e.target.value)} />
                    </div>
                    <div
                    className={settingStyle['settings-form__input']}>
                        <label htmlFor="username">Username </label>
                        <input
                        id="username"
                        type="text"
                        name="username"
                        required
                        placeholder={username}
                        onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div
                    className={settingStyle['settings-form__submit']}>
                        <button
                        onClick={onSaveChanges}>
                            SAVE CHANGES
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SettingsPage;