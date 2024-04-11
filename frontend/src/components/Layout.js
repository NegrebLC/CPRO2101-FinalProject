import NavBar from './NavBar';
import Footer from './Footer';
import { useAuth } from "../context/AuthContext";


//This method allows me to easily make a layout for each page to follow
const Layout = ({ children }) => {
  const { logout } = useAuth();

  return ( //within the 'main' section, the page is rendered
    <>
        <NavBar handleLogout={logout}/>
        <div className="container">
          <main role="main" className="pb-3">
            { children }
          </main>
        </div>
        <Footer />
    </>
  )
}

export default Layout