import './App.css';
import { useState, useEffect } from 'react';
import Modal from './components/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function App() {

  useEffect(() => {
    document.title = 'Web builder'
  }, []);

  const [modal, setModal] = useState('');
  const [navId, setNavId] = useState();
  const [images, setImages] = useState([]);

  const handleClickNav = (e) => {
    const id = e.target.id;
    if (modal !== "-active") {
      setNavId(id);
      handleImage(id);
      setModal('-active');
    } else if (navId !== id) {
      setNavId(id);
      setModal("");
      setTimeout(() => {
        handleImage(id);
        setModal('-active');
      }, 800);
    }
  }

  const handleImage = (id) => {
    if (id === "1") {
      setImages(nav);
    } else if (id === "2") {
      setImages(head);
    }
  }

  const nav = ['/nav-1.png', '/nav-2.png', "/nav-3.png"];
  const head = ['/head-1.png', '/head-2.png'];

  return (
    <>
      <nav className="navbar top-nav" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt='logo' />
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-dark">
                <strong>Download</strong>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className='container-side is-flex'>
        <div className="box side-bar">
          <div className='img-con' id='1' onClick={handleClickNav.bind(this)}>
            <figure className="image is-24x24">
              <img src="/navbar.png" id='1' alt='img' />
            </figure>
          </div>
          <div className='img-con' id='2' onClick={handleClickNav.bind(this)}>
            <figure className="image is-24x24">
              <img src="/header.png" id='2' alt='img' />
            </figure>
          </div>
          <div className='img-con' id='3' onClick={handleClickNav.bind(this)}>
            <figure className="image is-24x24">
              <img src="/content.png" id='3' alt='img' />
            </figure>
          </div>
          <div className='img-con' id='4' onClick={handleClickNav.bind(this)}>
            <figure className="image is-24x24">
              <img src="/footer.png" id='4' alt='img' />
            </figure>
          </div>
          <div className='img-con' id='5' onClick={handleClickNav.bind(this)}>
            <figure className="image is-24x24">
              <img src="/image.png" id='5' alt='img' />
            </figure>
          </div>
        </div>
        <Modal modal={modal} images={images} />
        <div className={'bg-modal' + modal} onClick={() => setModal('')}></div>
        <div className='contents'>


          <div className='con-content'>
            <figure className='img-cont'>
              <img src='./head-1.png' alt="img" />
            </figure>
            <button className="button is-dark btn-img-cont ml-2">
              <span className="icon">
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </button>
          </div>


        </div>
      </div>
    </>
  );
}

export default App;
