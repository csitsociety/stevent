import React from 'react'
import InputField from './InputField'
import SubmitButton from './SubmitButton'
import UserStore from './UserStore.js'

class ClubCreationForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            clubID: '', //As per the RUSU website url for signup
            clubName: '',
            clubDescription: '',
            //clubImg: '',
            clubSignupLink: '',
            buttonDisabled: false
        }
    }

    setInputValue(property, val) {
        this.setState({
            [property]: val
        })
    }

    async doCreateClubPage() {
        for (var propt in this.state) {
            console.log(this.state[propt])
            if (this.state[propt] == undefined) {
                return 
            }
        }
        this.setState({
            buttonDisabled: true
        })
        try {
            let res = await fetch('http://localhost:3000/createClubPage', {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clubName: this.state.clubName,
                    clubID: this.state.clubID,
                    clubDescription: this.state.clubDescription,
                    clubSignupLink: this.state.clubSignupLink
                })
            })
            let result = await res.json()
            console.log(JSON.stringify(result))
            if (result && result.success) {
                alert("Club created successfully")
            } else {
                alert("Unable to create club")
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className="clubCreationForm">
            Create a new club page!
            <InputField type='text' placeholder='Club Name' value={this.state.clubName ? this.state.clubName : ''} onChange={(val) => this.setInputValue('clubName', val)}/>
            <InputField type='text' placeholder='Club ID as per RUSU homepage URL' value={this.state.clubID ? this.state.clubID : ''} onChange={(val) => this.setInputValue('clubID', val)}/>
            <InputField type='text' placeholder='Description' value={this.state.clubDescription ? this.state.clubDescription : ''} onChange={(val) => this.setInputValue('clubDescription', val)}/>
            <InputField type='text' placeholder='Signup Link' value={this.state.clubSignupLink ? this.state.clubSignupLink : ''} onChange={(val) => this.setInputValue('clubSignupLink', val)}/>
            <SubmitButton text='Create Club Page' disabled={this.state.buttonDisabled} onClick={ () => this.doCreateClubPage()}/> 
        </div>
        )
    }
}

export default ClubCreationForm