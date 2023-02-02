import { PaperPlaneRight, X } from 'phosphor-react'
import './styles.scss'

export const Chat = () => {
  return (
    <div className="chat-container">
      <div className="chat-content">
        <header className="chat-header">
          <div className="chat-header-content">
            <div className="user-data">
              <img src="https://avatars.githubusercontent.com/u/73470355?v=4" alt="" />
              <div className="user-text-data">
                <span>Usuário</span>
                <span className="user-status">Online</span>
              </div>
            </div>

            <button className="close"> 
              <X size={20} color={'#ffff'}/>
            </button>
          </div>
        </header>

        <div className="messages">
          <div className="message"> 
            <div className="top">Cecilia - 11:30</div>
            <div className="body">Tive uma ideia incrivel para um projeto!</div>
          </div>
        </div>

        <div className="messages">
          <div className="message-you"> 
            <div className="top">Voce - 11:31</div>
            <div className="body">Tive uma ideia incrivel para um projeto!</div>
          </div>
        </div>

        <form className="chat-bottom">
          <div className="input-wrapper">
            <input type="text" placeholder="Digite a sua mensagem"/>
            <button className="send">
              <PaperPlaneRight size={24} weight="fill" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 