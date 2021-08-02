import React from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import './index.css';
import Pagination from "./component/Pagination";
import MyPagination from "./component/MyPagination";

const requestOptions = {
    method: 'GET',
    headers: authHeader(),
    // headers: new Headers({'Access-Control-Allow-Origin': '*', 'cookie': '_admin_session_id=882009f8-aaf0-e1e0-fcdb-a3cd60222584'})
};

export function authHeader() {
    return {
        //'cookie': '_admin_session_id=ae71ad60-00a0-5ae5-ff65-2f32416b61c7',
        //'Content-Type': 'application/json'
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        "Access-Control-Allow-Credentials": 'true'
    };
}

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoader: false,
            categories: [],
            metadata: null,
            itemById: null,
            page: 1,
            limit: 5,
            pageCount: 0,
            totalPage: 0,
        };
    }

    /* tìm hiểu về life cycle của 1 component */
    componentDidMount(pageOf) {
        const page = pageOf == null ? this.state.page : pageOf;
        const limit = this.state.limit;
        // có thể dùng async await
        fetch(`http://localhost:8080/admin/categories?page=${page}&limit=${limit}`, requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        categories: result.categories,
                        metadata: result.metadata,
                        pageCount: Math.floor(result.metadata.total / result.metadata.limit)
                            + (Math.floor(result.metadata.total % result.metadata.limit) > 0 ? 1 : 0),
                        totalPage: result.metadata.total,
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handlePageClick = (event) => {
        this.componentDidMount(event.selected + 1);
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    render() {
        const { error, isLoaded } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div style={{marginLeft: '10em'}} >
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
                            this.state.categories.map((item, index) => (
                                <tr key={item.id}>
                                    <td className='lineIndex'>{item.id}</td>
                                    <td className='lineName'>{item.name}</td>
                                    <td className='lineDescription'>{item.description}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    {/*tự tạo 1 component paginate theo các feature đang sử dụng để hiểu được bản chất*/}
                    {/*<ReactPaginate*/}
                    {/*    previousLabel={'prev'}*/}
                    {/*    nextLabel={'next'}*/}
                    {/*    pageCount={this.state.pageCount}*/}
                    {/*    onPageChange={this.handlePageClick}*/}
                    {/*    containerClassName={'pagination'}*/}
                    {/*    activeClassName={'active'}*/}
                    {/*/>*/}
                    <MyPagination
                        postsPerPage={this.state.limit}
                        totalPosts={this.state.totalPage}
                        paginate={paginate}
                    />
                </div>
            );
        }
    }
}

class CategoryList extends React.Component {
    render() {
        return <div>
            <CategoryItem/>
        </div>
    }
}

ReactDOM.render(<CategoryList/>, document.getElementById("categories"))