import React from 'react'
import InputField from './InputField'
import SubmitButton from './SubmitButton'
import UserStore from './UserStore.js'

class SignupForm extends React.Component {
    
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

    async doSignup() {
        if (!this.state.username) {
            return
        } else if (!this.state.password) {
            return
        }
        this.setState({
            buttonDisabled: true
        })
        try {
            let res = await fetch('http://localhost:3000/signup', {
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
                UserStore.signingUp = false
            } else {
                alert("Unable to create account")
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className="signupForm">
                Sign Up
                <InputField type='text' placeholder='Username' value={this.state.username ? this.state.username : ''} onChange={(val) => this.setInputValue('username', val)}/>
                <InputField type='password' placeholder='Password' value={this.state.password ? this.state.password : ''} onChange={(val) => this.setInputValue('password', val)}/>
                <SubmitButton text='Sign up' disabled={this.state.buttonDisabled} onClick={ () => this.doSignup()}/> 
            </div>
        )
    }
}


export default SignupForm