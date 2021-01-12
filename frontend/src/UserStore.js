import { extendObservable } from 'mobx'

class UserStore {
    constructor() {
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            username: '',
            signingUp: false
        })
    }
}

export default new UserStore()