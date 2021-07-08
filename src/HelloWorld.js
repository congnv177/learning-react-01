import React from 'react';
import ReactDOM from 'react-dom';

// first: gọi ReactDOM.render() với phần tử <IntroduceName name="Công">
// second: react gọi component IntroduceName với props: {name:"Công"}
// third: component IntroduceName trả về phần tử <h1>Hello, My name is Louis</h1>
// fourth: ReactDOM sẽ update lại DOM cho khớp với <h1>Hello, My name is Louis</h1>
function IntroduceName(props) {
    return <h1>Hello, My name is {props.name}</h1>
}

const elementName = <IntroduceName name="Louis"/>;
ReactDOM.render(
    elementName,
    document.getElementById('introduce-name')
)

class IntroduceAge extends React.Component {
    render() {
        return <h2>I'm {this.props.age} years old</h2>
    }
}

const elementAge = <IntroduceAge age={29} />
ReactDOM.render(
    elementAge,
    document.getElementById('introduce-age')
)