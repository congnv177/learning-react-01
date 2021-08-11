import React, {useEffect, useState} from "react";
import './index.css';
import Pagination from "./component/MyPagination";
import ReactDOM from "react-dom";

const requestOptions = {
    method: 'GET',
    headers: authHeader(),
};

export function authHeader() {
    return {
        //'cookie': '_admin_session_id=ae71ad60-00a0-5ae5-ff65-2f32416b61c7',
        //'Content-Type': 'application/json'
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        "Access-Control-Allow-Credentials": 'true'
    };
}

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResult, setTotalResult] = useState(1);
    const [limit] = useState(10);

    useEffect(() => {
         // fetch(`http://localhost:8080/admin/categories?page=${currentPage}&limit=${limit}`, requestOptions)
         //    .then(res => res.json())
         //    .then(
         //        (result) => {
         //            setCategories(result.categories);
         //            setTotalResult(result.metadata.total)
         //        }
         //    )
        async function fetchMyAPI() {
            let response = await fetch(`http://localhost:8080/admin/categories?page=${currentPage}&limit=${limit}`, requestOptions)
            response = await response.json()
            setCategories(response.categories)
            setTotalResult(response.metadata.total)
        }
        fetchMyAPI()
    }, [currentPage]);
    
    // Change page
    function handleClick(pageNumber) {
        setCurrentPage(pageNumber);
    }

    return (
        <div style={{marginLeft: '40em'}}>
            <table className='Table'>
                <thead>
                <tr>
                    <th className='headerIndex'>STT</th>
                    <th className='headerName'>Tên</th>
                    <th className='headerDescription'>Mô tả</th>
                </tr>
                </thead>
                <tbody>
                {
                    categories.map((item, index) => (
                        <tr key={item.id}>
                            <td className='lineIndex'>{item.id}</td>
                            <td className='lineName'>{item.name}</td>
                            <td className='lineDescription'>{item.description}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <Pagination
                limit={limit}
                totalPosts={totalResult}
                handleClick={handleClick}
            />
        </div>
    );
};

ReactDOM.render(<CategoryList/>, document.getElementById("categories"))