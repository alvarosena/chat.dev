import { Chat } from './components/Chat'
import { Header } from './components/Header'
import { SignButton } from './components/SignButton'
import { AuthContextProvider } from './contexts/AuthContext'
import './styles/global.scss'

function App() {
  return (
    <AuthContextProvider>
      <Header />
      <div className="home-container">
        {/* <div className="home-content">
          <h1>Chat with <i>developers</i> around the world!</h1>
          <SignButton />
        </div> */}
        <Chat />
      </div>
    </AuthContextProvider>
  )
}

export default App
