import React, { Component } from "react";
import { Media, Card } from "react-bootstrap";
import NoResultImage from "../img/no-result-image.jpg";

class MediaObject extends Component {
  render() {
    const { data, noResult } = this.props;
    return (
      <>
        {noResult ? (
          <Card body>
            <img
              style={{ borderRadius: "5px", width: "100%" }}
              className="mr-3"
              src={NoResultImage}
              alt="Not Found"
            />
          </Card>
        ) : (
          <Card body style={{ borderRadius: "5px" }} className="m-2 p-2">
            <Media>
              <img
                width={64}
                height={64}
                style={{ borderRadius: "5px" }}
                className="mr-3"
                src={data.user.profile_image_url}
                alt="Not Found"
              />
              <Media.Body>
                <div>
                  <span className="m-3" style={{ fontSize: "12px" }}>
                    {data.user.name}
                  </span>
                  <span className="m-3" style={{ fontSize: "12px" }}>
                    @{data.user.screen_name}
                  </span>
                  <span className="m-3" style={{ fontSize: "12px" }}>
                    {data.user.created_at}
                  </span>
                </div>
                <p
                  className="m-3 font-weight-bold"
                  style={{ fontSize: "12px" }}
                >
                  {data.text}
                </p>
              </Media.Body>
            </Media>
          </Card>
        )}
      </>
    );
  }
}

export default MediaObject;
