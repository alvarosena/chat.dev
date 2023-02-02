import './styles.scss'
import { SignButton } from "../SignButton"

export const Header = () => {
  return (  
    <header className="header-container">
      <div className="header-content">
        <h2>chat.dev</h2>

        <SignButton />
      </div>
    </header>
  )
}