import { logout } from 'services';
import fire from 'auth';
import { Redirect } from 'react-router-dom'

const Logout = () => {
    fire.auth().signOut()

    return (
        <Redirect to={'/login'} />
    )
}

export default Logout
