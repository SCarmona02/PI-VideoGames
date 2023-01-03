import React from "react";
import style from "./Paginado.module.css"

const Paginado = ({gamesPerPage, videoGames, paginado, currentPage }) => {
    
    const pageNumbers = [];

    for(let i = 1;  i <= Math.ceil(videoGames / gamesPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul>
                {currentPage > 1 && <li> <span onClick={() => paginado(--currentPage)}>Prev</span> </li>}
                {pageNumbers && pageNumbers.map(number => {
                    return (
                        <li key={number}>
                            <span onClick={() => paginado(number)}>{number}</span>
                        </li>
                    )
                })}
                {currentPage < pageNumbers.length &&  <li> <span onClick={() => paginado(++currentPage)}>Next</span> </li>}
            </ul>
        </nav>
    )
}

export default Paginado;