import './App.css';
import { useState, useEffect } from 'react';
import Modal from './components/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import parse from 'html-react-parser';

function App() {

  useEffect(() => {
    document.title = 'Web builder'
  }, []);

  const [modal, setModal] = useState('');
  const [navId, setNavId] = useState();
  const [images, setImages] = useState([]);
  const [elements, setElements] = useState([]);

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
    } else if (id === "3") {
      setImages(content);
    } else {
      setImages(footer);
    }
  }

  const deleteElem = (index) => {
    const element = [...elements];

    const un = element.filter((data, i) => {
      if (i !== index) return data
    })

    setElements(un);

  }

  const getData = async (id) => {
    const req = await fetch(`http://localhost:3080/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      }
    })

    const res = await req.text();
    const element = [...elements]

    element.push(res);
    setElements(element);
  }

  const nav = [{ img: '/nav-1.png', id: 'navbar1.txt' }, { img: '/nav-2.png', id: 'navbar2.txt' }];
  const head = [{ img: '/head-1.png', id: "head1.txt" }, { img: '/head-2.png', id: "head2.txt" }];
  const content = [{ img: '/content-1.png', id: "content1.txt" }, { img: '/content-2.png', id: "content2.txt" }];
  const footer = [{ img: '/footer-1.png', id: "footer1.txt" }, { img: '/footer-2.png', id: "footer2.txt" }];

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
        </div>
        <Modal getData={getData} modal={modal} images={images} />
        <div className={'bg-modal' + modal} onClick={() => setModal('')}></div>
        <div className='contents'>
          {
            elements.map((element, index) => (
              <div key={index} className='con-content'>
                <div className='elem'>
                  {parse(element)}
                </div>
                <button className="button is-dark btn-img-cont ml-2" onClick={() => deleteElem(index)}>
                  <span className="icon">
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </button>
              </div>
            ))
          }

          {/* <div className='con-content'>
            <img src='./head-1.png' alt="img" />
            <button className="button is-dark btn-img-cont ml-2">
              <span className="icon">
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </button>
          </div>

          <div className='con-content'>
            <img src='./head-1.png' alt="img" />
            <button className="button is-dark btn-img-cont ml-2">
              <span className="icon">
                <FontAwesomeIcon icon={faTrash} />
              </span>
            </button>
          </div> */}


        </div>
      </div>
    </>
  );
}

export default App;
