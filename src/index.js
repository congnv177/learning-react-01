import React from "react";
import ReactDOM from "react-dom";

const requestOptions = {
    method: 'GET',
    headers: authHeader()
    // headers: new Headers({'Access-Control-Allow-Origin': '*', 'cookie': '_admin_session_id=882009f8-aaf0-e1e0-fcdb-a3cd60222584'})
};

export function authHeader() {
    return { cookie: `_admin_session_id=882009f8-aaf0-e1e0-fcdb-a3cd60222584` };
}

const CategoryDetail = ({detail}) => {
    return (
        <div>
            <div>STT: {detail.id}</div>
            <div>Loại: {detail.name}</div>
            <div>Mô tả: {detail.desc}</div>
        </div>
    )
}

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoader: false,
            categoryItems: [],
            itemById: null
        };
        this.showDetail = this.showDetail.bind(this);
    }

    componentDidMount() {
        fetch("10.10.2.87:8765/admin/categories.json", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        categoryItems: result.categories
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
        const { error, isLoaded, items } = this.state;
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
                            this.state.categoryItems.map((item, index) => (
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
        this.state.categoryItems.filter((categoryItem) => categoryItem.id == id).map(filtered => {item = filtered});
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