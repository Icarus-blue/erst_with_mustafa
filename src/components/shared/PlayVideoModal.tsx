import { RootState } from "@/redux/store";
import { IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const PlayVideoModal = () => {

    const { videoId } = useSelector((state: RootState) => state.customModal)
    const [loading, setLoading] = useState(false)
    const iframe = useRef(null)


    return (
        <div
            className="modal overlayadd fade"
            id="playVideoModal"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content modal__playlist">
                    <div className="d-flex align-items-center mb-30 justify-content-end">
                        <h4></h4>
                        <span data-bs-dismiss="modal" className="cmn--btn"
                            onClick={() => {
                                iframe.current.src = null;
                            }}
                        >
                            <span>
                                <IconX />
                            </span>
                        </span>
                    </div>
                    <div className="modal-body fs-14 d-block fw-400 text-center bodyfont pra title">
                        {
                            !loading && (
                                <iframe
                                    ref={iframe}
                                    frameBorder={0}
                                    allowFullScreen
                                    width={400}
                                    height={400}
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayVideoModal;
