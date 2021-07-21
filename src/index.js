import React from "react";
import ReactDOM from "react-dom";

const Welcome = ({user})=> {
    return (
        <div>
            Chào <strong>{user.username}</strong>!
        </div>
    )
}

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitUsernameError: '',
            submitPasswordError: ''
        };
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            /**
             * Form là đối tượng HTML đc sử dụng để tương tác với người dùng
             * ngoài cách sd controlled components (https://reactjs.org/docs/forms.html#controlled-components)
             * còn có thể sd uncontrolled components (https://reactjs.org/docs/uncontrolled-components.html) để lấy dữ liệu từ trong form
             */
            <form onSubmit={this.handleSubmit}>
                <h3>Sign in</h3>
                <input type="text" value={this.state.username} onChange={this.handleUserChange} placeholder="enter you username" />
                <span>{this.state.submitUsernameError}</span>
                <input type="password" value={this.state.password} onChange={this.handlePassChange} placeholder="enter password" />
                <span>{this.state.submitPasswordError}</span>
                <input type="submit" value="Login" />
            </form>
        )
    }

    handleUserChange(evt) {
        this.setState({
            username: evt.target.value,
            submitUsernameError: ''
        });
    };

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
            submitPasswordError: ''
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.username !== 'congnv') {
            this.setState(state => ({
                submitUsernameError: 'Username không chính xác'
            }));
            return;
        }
        if (this.state.password !== '123456') {
            this.setState(state => ({
                submitPasswordError: 'Password không chính xác'
            }));
            return;
        }
        this.setState(state => ({
            submitUsernameError: '',
            submitPasswordError: ''
        }));
        this.props.onSignIn(this.state.username, this.state.password);
    }

}

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }

    signIn(username, password) {
        this.setState({
            user: {
                username,
                password,
            }
        })
    }

    render() {
        return (
            <div>
                {
                    (this.state.user) ?
                        <Welcome
                            user={this.state.user}
                        />
                        :
                        <LoginForm
                            onSignIn={this.signIn.bind(this)} // tìm hiểu cách viết khác ko cần this
                        />
                }
            </div>
        )

    }

}

ReactDOM.render(<App/>, document.getElementById("login-form"))