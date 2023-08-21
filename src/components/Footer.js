import React from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <h5>COMPANY INC</h5>
            <ul className="list-unstyled">
              <li>Al Qusais</li>
              <li>Dubai, UAE</li>
              <li>&nbsp;</li>
              <li>
                <Link
                  className="rounded-lg shadow-lg mr-3"
                  to="tel:+971-508570803"
                  // onClick={() => xxxx()}
                >
                  <FontAwesomeIcon
                    icon={faPhoneAlt}
                    className="fa"
                    alt="Phone"
                    title="Phone"
                  />
                  &nbsp; +971-508570803
                </Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5>Column2</h5>
            <ul className="list-unstyled">
              <li>Some items</li>
              <li>Some items</li>
            </ul>
          </div>
          <div className="col">
            <h5>Column3</h5>
            <ul className="list-unstyled">
              <li>Some links</li>
              <li>Some links</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()}
            &nbsp;ASHLY THOMAS ABRAHAM | All rights reserved | Terms of service
            | Privacy Policy |
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
