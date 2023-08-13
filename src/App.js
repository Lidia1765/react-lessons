import React from 'react';
import classNames from 'classnames';
import './index.scss';

const Modal = ({ isOpen, onClose }) => (
  <div className={classNames('overlay animated', { 'show': isOpen })}>
    <div />
    <div className="modal">
      <svg onClick={onClose} height="200" viewBox="0 0 200 200" width="200">
        <title />
        <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
      </svg>
      <img src="https://media2.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif" alt="" />
    </div>
  </div>
)

function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className="App">
      <button onClick={handleOpen} className="open-modal-btn">
        ✨ Открыть окно
      </button>
      <Modal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
}

export default App;
