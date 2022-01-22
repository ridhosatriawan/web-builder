import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function Modal(params) {
    return (
        <div className={`box side-bar-2` + params.modal}>
            {
                params.images.map((image, index) => (
                    <div key={index} className="outer-img">
                        <figure className="image img-el">
                            <img src={image.img} alt="img" />
                            <button className="button is-small is-dark btn-img"
                                onClick={() => params.getData(image.id)}>
                                <span className="icon">
                                    <FontAwesomeIcon icon={faPlus} />
                                </span>
                            </button>
                        </figure>
                    </div>
                ))
            }
        </div>
    )
}