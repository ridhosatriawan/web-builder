import "./App.css";
import { useState, useEffect } from "react";
import Modal from "./components/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import parse from "html-react-parser";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import htmlToReactParser from "html-to-react";
import ReactDomServer from "react-dom/server";

function App() {
  useEffect(() => {
    document.title = "Web builder";
  }, []);

  const htmlToReact = new htmlToReactParser().Parser;

  const [modal, setModal] = useState("");
  const [navId, setNavId] = useState();
  const [images, setImages] = useState([]);
  const [elements, setElements] = useState([]);
  const [dtElems, setDtElems] = useState([]);
  const [modalCode, setModalCode] = useState("");
  const [code, setCode] = useState({ html: "", css: "" });
  const [tabList, setTabList] = useState({ html: "is-active", css: "" });
  const [mess, setMess] = useState("-none");

  const handleClickNav = async (e) => {
    const id = e.target.id;

    const data = await fetch(
      `http://localhost:3001/get_display_element/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = await data.json();
    const imgs = res.map((data) => {
      return {
        img: data.icon,
        id: data.kode,
      };
    });

    const elems = res.map((data) => {
      return {
        id: data.kode,
        html: data.script_html,
        css: data.script_css,
        js: data.script_js,
      };
    });

    setDtElems(elems);

    if (modal !== "-active") {
      setNavId(id);
      setImages(imgs);
      setModal("-active");
    } else if (navId !== id) {
      setNavId(id);
      setModal("");
      setTimeout(() => {
        setImages(imgs);
        setModal("-active");
      }, 800);
    }
  };

  const deleteElem = (index) => {
    const element = [...elements];

    const un = element.filter((data, i) => {
      if (i !== index) return data;
    });

    setElements(un);
  };

  const getData = async (id) => {
    const element = [...elements];

    const filElems = dtElems.filter((data) => data.id === id)[0];

    element.push(filElems);
    setElements(element);
  };

  const downloadFile = async () => {
    const elems = elements.map((data) => {
      return data.id;
    });
    const que = elems.toString();
    const res = await fetch("http://localhost:3001/post_download_element", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        target: "bootstrap-html",
        elements: que,
      }),
    });
    const data_1 = await res.blob();
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(data_1);
    a.download = "gadawangi.html";
    a.click();
  };

  const handleModalCode = () => {
    if (modalCode === "") {
      setModalCode("is-active");
    } else {
      setModalCode("");
    }
  };

  const handleShowCode = (e) => {
    let id = e.target.id;
    let element = elements[id];
    setCode(element);
    const reactElement = htmlToReact.parse(element.html);
    const reactHtml = ReactDomServer.renderToStaticMarkup(reactElement);
    console.log(reactHtml);

    handleModalCode();
  };

  const handleTabs = (e) => {
    let id = e.target.id;

    if (id === "html") {
      setTabList({
        html: "is-active",
        css: "",
      });
    } else {
      setTabList({
        html: "",
        css: "is-active",
      });
    }
  };

  const handleModalMess = () => {
    setMess("");

    setTimeout(() => {
      setMess("-none");
    }, 1000);
  };
  return (
    <>
      <nav
        className="navbar top-nav"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <h1 className="title">GadaWangi</h1>
          </a>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-dark" onClick={downloadFile}>
                <strong>Download</strong>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-side is-flex">
        {/* modal show code */}
        <div className={"modal modal-code " + modalCode}>
          <div className={"modal-copied" + mess}>Copied !</div>
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="tabs">
              <ul>
                <li className={tabList.html}>
                  <a
                    id="html"
                    onClick={(e) => {
                      handleTabs(e);
                    }}
                  >
                    HTML
                  </a>
                </li>
                <li className={tabList.css}>
                  <a
                    id="css"
                    onClick={(e) => {
                      handleTabs(e);
                    }}
                  >
                    CSS
                  </a>
                </li>
              </ul>
              <button
                onClick={() => {
                  handleModalCode();
                }}
                className="button is-white"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div id="tab-content">
              <div className={tabList.html} data-content="1">
                <CopyToClipboard
                  text={code.html}
                  onCopy={() => {
                    handleModalMess();
                  }}
                >
                  <button className="btn-copy is-small button is-light">
                    Copy!
                  </button>
                </CopyToClipboard>
                <SyntaxHighlighter
                  wrapLongLines="true"
                  language="htmlbars"
                  style={atomOneDark}
                >
                  {code.html}
                </SyntaxHighlighter>
              </div>
              <div className={tabList.css} data-content="2">
                <CopyToClipboard
                  text={code.css}
                  onCopy={() => {
                    handleModalMess();
                  }}
                >
                  <button className="btn-copy is-small button is-light">
                    Copy!
                  </button>
                </CopyToClipboard>
                <SyntaxHighlighter
                  wrapLongLines="true"
                  language="css"
                  style={atomOneDark}
                >
                  {code.css}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
        {/* sidebar */}
        <div className="box side-bar">
          <div
            className="img-con"
            id="navbar"
            onClick={handleClickNav.bind(this)}
          >
            <figure className="image is-24x24">
              <img src="/navbar.png" id="navbar" alt="img" />
            </figure>
          </div>
          <div
            className="img-con"
            id="header"
            onClick={handleClickNav.bind(this)}
          >
            <figure className="image is-24x24">
              <img src="/header.png" id="header" alt="img" />
            </figure>
          </div>
          <div
            className="img-con"
            id="content"
            onClick={handleClickNav.bind(this)}
          >
            <figure className="image is-24x24">
              <img src="/content.png" id="content" alt="img" />
            </figure>
          </div>
          <div
            className="img-con"
            id="footer"
            onClick={handleClickNav.bind(this)}
          >
            <figure className="image is-24x24">
              <img src="/footer.png" id="footer" alt="img" />
            </figure>
          </div>
        </div>
        {/* modal component */}
        <Modal getData={getData} modal={modal} images={images} />
        <div className={"bg-modal" + modal} onClick={() => setModal("")}></div>
        {/* content */}
        <div className="contents">
          <link href="./bootstrap.min.css" rel="stylesheet" />
          {elements.map((element, index) => (
            <div key={index} className="con-content">
              <div className="elem">
                <style>{element.css}</style>
                {parse(element.html)}
              </div>
              <button
                className="icon2 button btn-img-cont is-dark"
                id={index}
                onClick={(e) => {
                  handleShowCode(e);
                }}
              >
                Show Code
              </button>
              <button
                className="button is-dark btn-img-cont ml-2"
                onClick={() => deleteElem(index)}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={faTrash} />
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
