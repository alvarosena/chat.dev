import './styles.scss'
import { GithubLogo } from "phosphor-react"

export const SignButton = () => {
  return (
    <button className="button-container">
      <GithubLogo size={32} color={'#ffff'} />
    </button>
  )
}