import React from "react";

import bannerImage from '../../assets/images/items/gm3.jpg'

const Request = () => (
  <section className="padding-bottom">
    <header className="section-heading heading-line">
      <h4 className="title-section text-uppercase">YÊU CẦU BÁO GIÁ</h4>
    </header>

    <div className="row">
      <div className="col-md-8">
        <div
          className="card-banner banner-quote overlay-gradient"
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
          <div className="card-img-overlay white">
            <h3 className="card-title">
              Một yêu cầu, nhiều báo giá
            </h3>
            <p className="card-text" style={{ maxWidth: "400px" }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt.
            </p>
            <a href="" className="btn btn-primary rounded-pill mau">
              Learn more
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card card-body">
          <h4 className="title py-3">Một yêu cầu, nhiều báo giá</h4>
          <form>
            <div className="form-group">
              <input
                className="form-control"
                name=""
                placeholder="What are you looking for?"
                type="text"
              />
            </div>
            <div className="form-group">
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Quantity"
                  name=""
                  type="text"
                />

                <select className="custom-select form-control">
                  <option>Pieces</option>
                  <option>Litres</option>
                  <option>Tons</option>
                  <option>Gramms</option>
                </select>
              </div>
            </div>
            <div className="form-group text-muted">
              <p>Select template type:</p>
              <label className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="option1"
                />
                <div className="form-check-label">Request price</div>
              </label>
              <label className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="option2"
                />
                <div className="form-check-label">Request a sample</div>
              </label>
            </div>
            <div className="form-group">
              <button className="btn btn-warning mau">Request for quote</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
);

export default Request;
