import { searchIcon } from "../../assets";
const Header = props => {
    return (
        <header className="header flex justify-sb">
            <div className="logo">
                <img src="logo.svg"/>
            </div>
            <div>
                <img src={searchIcon} alt="Search icon" />
            </div>
        </header>
    );
}
export default Header;