import { isMobile } from "react-device-detect"
import homeStyles from '../styles/home.module.css';

const MAX = 3;

const getMoviesData = (movies) => {
    const numRows = Math.floor(movies.length / MAX);
    const rowRem = movies.length % MAX;

    const rows = [];
    
    if(!isMobile) {
        for(let i = 0; i < numRows; i++) {
            rows.push(
                <div
                key={i}
                className={homeStyles['row']}>
                    {!isMobile &&
                    <div
                    className={homeStyles['row-back']}>
                        {movies.slice(i * MAX, (i + 1) * MAX)}
                    </div>
                    }
                </div>
            );
        }

        if(rowRem > 0) {
            rows.push(
                <div
                key={rows.length}
                className={homeStyles['row']}>
                    {!isMobile &&
                    <div
                    className={homeStyles['row-back']}>
                        {movies.slice(movies.length - (movies.length % MAX), movies.length)}
                    </div>    
                    }
                </div>
            );
        }
    } else {
        return movies;
    }

    return rows;
}

export default getMoviesData;