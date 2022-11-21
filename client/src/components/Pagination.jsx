import React, { useState, useEffect } from 'react';

const Pagination = (props) => {
    const [pageNumbers, setPageNumbers] = useState([]) 

    const nextPage = () => {
        if(props.currentPage !== props.nPages) 
        props.setCurrentPage(props.currentPage + 1)
        console.log(props.currentPage)
    }
    const prevPage = () => {
        if(props.currentPage !== 1) 
        props.setCurrentPage(props.currentPage - 1)
        console.log(props.currentPage)
    }

    useEffect(() =>
        setPageNumbers([...Array(props.nPages + 1).keys()].slice(1))
    ,[]);
    

    return(
        <nav>
            <ul className="inline-flex -space-x-px flex justify-center">
                <li>
                    <button className="px-3 py-2 ml-0 leading-tight text-white bg-gray-600 border border-white rounded-l-lg hover:bg-white hover:text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={prevPage} > Poprzednia</button> 
                </li>
                {pageNumbers.map(n => (
                    <li key={n} >
                        <button className={`px-3 py-2 ml-0 leading-tight text-white bg-gray-600 border border-l-white border-r-white  hover:bg-white hover:text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
                     ${props.currentPage === n ? 'active bg-gray-400': ''}`}  onClick={() => props.setCurrentPage(n)} > {n}</button> 
                     </li>
                ))

                }
                <li>
                    <button className="px-3 py-2 ml-0 leading-tight text-white bg-gray-600 border borderwhite rounded-r-lg hover:bg-white hover:text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={nextPage} >Następna</button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;