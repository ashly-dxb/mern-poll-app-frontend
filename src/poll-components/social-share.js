import {
  faTwitter,
  faLinkedin,
  faTelegramPlane,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";

function SocialShare(props) {
  return (
    <div className="d-flex flex-row flex-column">
      <TwitterShareButton
        url={props.url}
        title={JSON.stringify(props.question)}
        via="opinion poll"
        className="bg-primary text-decoration-none fw-bold mb-4 me-2 py-2 rounded-lg text-center  text-white "
      >
        <FontAwesomeIcon className="ms-3 me-3" icon={faTwitter} />
        &nbsp;
        <span className="d-md-inline-block">Share on Twitter</span>
      </TwitterShareButton>

      <WhatsappShareButton
        url={props.url}
        title={JSON.stringify(props.question)}
        separator=" "
        className="bg-success text-decoration-none fw-bold mb-4 me-2 py-2 rounded-lg text-center  text-white "
      >
        <FontAwesomeIcon className="ms-3 me-3" icon={faWhatsapp} />
        &nbsp;
        <span className="d-md-inline-block">Share on Whatsapp</span>
      </WhatsappShareButton>

      <TelegramShareButton
        url={props.url}
        title={JSON.stringify(props.question)}
        className="bg-secondary text-decoration-none fw-bold mb-4 me-2 py-2 rounded-lg text-center  text-white "
      >
        <FontAwesomeIcon className="ms-3 me-3" icon={faTelegramPlane} />
        &nbsp;
        <span className="d-md-inline-block">Share on Telegram</span>
      </TelegramShareButton>

      <LinkedinShareButton
        url={props.url}
        title={JSON.stringify(props.question)}
        summary="You have been invited to vote!"
        className="bg-primary text-decoration-none fw-bold mb-4 me-2 py-2 rounded-lg text-center  text-white "
      >
        <FontAwesomeIcon className="ms-3 me-3" icon={faLinkedin} />
        &nbsp;
        <span className="d-md-inline-block">Share on LinkedIn</span>
      </LinkedinShareButton>
    </div>
  );
}

export default SocialShare;
