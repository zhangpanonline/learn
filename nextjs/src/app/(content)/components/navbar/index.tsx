import ToggleButton from "./ToggleButton"
import LoginButton from "./LoginButton"
import Theme from './Theme'

export default function NavBar() {
    return (
        <div className="navbar bg-base-100 border-b border-base-300 dark:border-b-slate-700" >
            <div className="navbar-start" >
                <ToggleButton></ToggleButton>
            </div>
            <div className="navbar-center" ></div>
            <div className="navbar-end" >
                <Theme></Theme>
                <LoginButton></LoginButton>
            </div>
        </div>
    )
}