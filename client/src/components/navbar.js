import { Link } from 'react-router-dom';
import PostButton from './post_button';
import '../styles/Navbar.css';
import ViewSavedPosts from './view_saved_posts_button';

function Navbar({ user }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          ZotMarket
        </Link>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <PostButton />
            <ViewSavedPosts />
            <a href="http://localhost:3000/auth/logout/">
              <button className="nav-button logout">Logout</button>
            </a>
          </>
        ) : (
          <a href="http://localhost:3000/auth/google/">
            <button className="nav-button login">Login with UCI</button>
          </a>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
