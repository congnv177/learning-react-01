import React from "react";
import ReactDOM from "react-dom";

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

const CategoryDetail = ({detail}) => {
    return (
        <div>
            <div>STT: {detail.id}</div>
            <div>Loại: {detail.name}</div>
            <div>Mô tả: {detail.description}</div>
        </div>
    )
}

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoader: false,
            categories: [],
            metadata: null,
            itemById: null
        };
        this.showDetail = this.showDetail.bind(this);
    }

    componentDidMount() {
        fetch("http://localhost:8080/admin/categories?page=1&limit=5", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        categories: result.categories,
                        metadata: result.metadata
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, categories } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div style={{marginLeft: '10em'}} >
                    {
                        (this.state.itemById) ?
                            <CategoryDetail detail={this.state.itemById}/>
                            :
                            this.state.categories.map((item, index) => (
                                <p onClick={this.showDetail} key={item.id} data-id={item.id}>{item.name}</p>
                            ))}
                </div>
            );
        }
    }

    // render() {
    //     return (
    //         <div style={{marginLeft: '10em'}} >
    //             {
    //                 (this.state.itemById) ?
    //                     <CategoryDetail detail={this.state.itemById}/>
    //                     :
    //                     this.state.categoryItems.map((item, index) => (
    //                         <p onClick={this.showDetail} key={item.id} data-id={item.id}>{item.name}</p>
    //                     ))}
    //         </div>
    //     );
    // }

    showDetail(e) {
        e.preventDefault();
        let id = e.target.getAttribute("data-id");
        let item;
        this.state.categories.filter((category) => category.id == id).map(filtered => {item = filtered});
        this.setState({
            itemById: item 
        });
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