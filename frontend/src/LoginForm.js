import React from 'react'
import InputField from './InputField'
import SubmitButton from './SubmitButton'
import UserStore from './UserStore.js'

class LoginForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false
        }
    }

    setInputValue(property, val) {
        val = val.trim()
        this.setState({
            [property]: val
        })
    }

    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }

    doSignup() {
        if (!UserStore.isLoggedIn) {
            UserStore.signingUp = true
            console.log(UserStore.signingUp)
            console.log(UserStore.isLoggedIn)
        } else {
            UserStore.signingUp = false
        }
        return
    }

    async doLogin() {
        if (!this.state.username) {
            return
        } else if (!this.state.password) {
            return
        }
        this.setState({
            buttonDisabled: true
        })
        try {
            let res = await fetch('http://localhost:3000/login', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            })

            let result = await res.json()
            if (result && result.success) {
                UserStore.isLoggedIn = true
                UserStore.username = result.username
            } else if (result && result.success === false) {
                this.resetForm()
                alert(result.msg)
            }
        } catch (e) {
            console.log(e)
            this.resetForm()
        }
    }

    render() {
        return (
            <div className="loginForm">
                Login
                <InputField type='text' placeholder='Username' value={this.state.username ? this.state.username : ''} onChange={(val) => this.setInputValue('username', val)}/>
                <InputField type='password' placeholder='Password' value={this.state.password ? this.state.password : ''} onChange={(val) => this.setInputValue('password', val)}/>
                <SubmitButton text='Login' disabled={this.state.buttonDisabled} onClick={ () => this.doLogin()}/> 
                <SubmitButton text='Sign up' disabled={this.state.buttonDisabled} onClick={ () => this.doSignup()}/> 
            </div>
        )
    }
}

export default LoginForm