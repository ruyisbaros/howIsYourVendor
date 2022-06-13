import { Link } from "react-router-dom"
import Menu from "./Menu"
import Search from "./Search"


const Header = () => {

    return (

        <div className="header ">
            <nav className="navbar navbar-expand-lg navbar-light  justify-content-between align-middle">
                <Link className="logo link_class" to="/">
                    <h1 className=" p-0 m-0" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>HowIsYourVendor</h1>
                </Link>
                <Search />
                <Menu />
            </nav>
        </div>

    )
}

export default Header
