import {React} from 'react'
import { Link } from 'react-router-dom';


function Navbar() 
{
    return (
        <nav>
            <Link to='/'>ZotMarket</Link>
            <a href="http://localhost:3000/auth/google/">
                <button>Login with Google</button>
            </a>
        </nav>
    )
}

export default Navbar