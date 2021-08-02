import React from 'react';

const MyPagination = ({ postsPerPage, totalPosts, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                <a style={{marginTop: "-10px", marginBottom: "10px"}}>prev</a>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => onPageChange(number)} href='' className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
                <a style={{marginTop: "-10px", marginBottom: "10px"}}>next</a>
            </ul>
        </nav>
    );
};

export default MyPagination;