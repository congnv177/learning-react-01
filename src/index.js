import React from "react";
import ReactDOM from "react-dom";

// bổ sung thêm nút back ra trang danh sách
const CategoryDetail = ({detail}) => {
    const handleClick = () => {
        return <div>
            <CategoryItem/>
        </div>
    }
    
    return (
        <div>
            <div>STT: {detail.id}</div>
            <div>Loại: {detail.name}</div>
            <div>Mô tả: {detail.desc}</div>
            <input type="submit" value="Back" onClick={handleClick}/>
        </div>
    )
}

class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryItems: [
                {id: 1, name: 'Tiểu thuyết', desc: 'là một thể loại văn xuôi có hư cấu, phản ánh bức tranh xã hội rộng lớn và những vấn đề của cuộc sống'},
                {id: 2, name: 'Truyện tranh', desc: 'là một phương tiện được sử dụng để thể hiện ý tưởng bằng hình ảnh'},
                {id: 3, name: 'Truyện thiếu nhi', desc: 'là những tác phẩm viết về thiếu nhi và viết cho thiếu nhi'},
                {id: 4, name: 'Truyện người lớn', desc: 'là những tác phẩm viết về người lớn và viết cho người lớn'}
            ],
            itemById: null
        };
    }

    showDetail(id) {
        let item;
        this.state.categoryItems.filter((categoryItem) => categoryItem.id == id).map(filtered => {item = filtered});
        this.setState({
            itemById: item 
        });
    }

    render() {
        return (
            <div style={{marginLeft: '10em'}} >
                {
                    (this.state.itemById) ?
                        <CategoryDetail detail={this.state.itemById}/>
                    :
                    this.state.categoryItems.map(item => (
                        <p onClick={() => this.showDetail(item.id)}>{item.name}</p>
                    ))}
            </div>
        );
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