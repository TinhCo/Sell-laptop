import React from "react";



const Content = () => (


    <section class="section-content bg-white padding-y">
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <div class="card-banner overlay-gradient"
                    style={{minheight:"320px"}}>
                    <div class="card-img-overlay white">
                        <h3 class="card-title">Great Bundle only for 99$  It is hassle free </h3>
                        <p class="card-text" style={{ maxwidth: "400px" }}>Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit, sed do eiusmod
                            tempor incididunt.</p>
                        <a href="" class="btn btn-warning">Learn more</a>
                    </div>
                </div> 
            </div> 
            <div class="col-md-4">
                <div class="card-banner"
                    style={{ height:"320px " }}>
                    <article class="caption bottom">
                        <h5 class="card-title">Watches</h5>
                        <p>No matter how far along you are in your sophistication as an amateur.</p>
                    </article>
                </div>
            </div> 
        </div>

       
        <div class="row">
            <div class="col-md-3">
                <article class="card card-product-grid">
                    <div class="img-wrap">
                        <b class="badge badge-danger mr-1">SAVE %10</b>
                        <img src={require("../../assets/images/items/ln.jpg")}/>
                    </div>
                    <div class="info-wrap">
                        <a href="#" class="title">Great Smartwatch</a>
                        <div class="price-wrap my-2">
                            <span class="price">$45</span>
                            <del class="price-old">$90</del>
                        </div> 
                        <a href="#" class="btn btn-block btn-primary">Order now</a>
                    </div>
                </article>
            </div>
            <div class="col-md-3">
                <article class="card card-product-grid">
                    <div class="img-wrap">
                        <b class="badge badge-danger mr-1">SAVE %20</b>
                        <img src={require("../../assets/images/items/ln1.jpg")}/>
                    </div>
                    <div class="info-wrap">
                        <a href="#" class="title">Cheap and Best demo cloth</a>
                        <div class="price-wrap my-2">
                            <span class="price">$45</span>
                            <del class="price-old">$90</del>
                        </div> 
                        <a href="#" class="btn btn-block btn-primary">Order now</a>
                    </div>
                </article>
            </div> 
            <div class="col-md-3">
                <article class="card card-product-grid">
                    <div class="img-wrap">
                        <b class="badge badge-danger mr-1">SAVE %10</b>
                        <img src={require("../../assets/images/items/ln2.jpg")}/>
                    </div>
                    <div class="info-wrap">
                        <a href="#" class="title">Great book name</a>
                        <div class="price-wrap my-2">
                            <span class="price">$45</span>
                            <del class="price-old">$90</del>
                        </div> 
                        <a href="#" class="btn btn-block btn-primary">Order now</a>
                    </div>
                </article>
            </div> 
            <div class="col-md-3">
                <article class="card card-product-grid">
                    <div class="img-wrap">
                        <b class="badge badge-danger mr-1">SAVE %10</b>
                        <img src={require("../../assets/images/items/ln3.jpg")}/>
                    </div>
                    <div class="info-wrap">
                        <a href="#" class="title">Great book name</a>
                        <div class="price-wrap my-2">
                            <span class="price">$45</span>
                            <del class="price-old">$90</del>
                        </div>
                        <a href="#" class="btn btn-block btn-primary">Order now</a>
                    </div>
                </article>
            </div> 
            <div class="col-md-3">
                <article class="card card-product-grid">
                    <div class="img-wrap">
                        <b class="badge badge-danger mr-1">SAVE %10</b>
                        <img src={require("../../assets/images/items/ln4.jpg")}/>
                    </div>
                    <div class="info-wrap">
                        <a href="#" class="title">Great book name</a>
                        <div class="price-wrap my-2">
                            <span class="price">$45</span>
                            <del class="price-old">$90</del>
                        </div> 
                        <a href="#" class="btn btn-block btn-primary">Order now</a>
                    </div>
                </article>
            </div> 
            <div class="col-md-3">
                <article class="card card-product-grid">
                    <div class="img-wrap">
                        <b class="badge badge-danger mr-1">SAVE %10</b>
                        <img src={require("../../assets/images/items/ln5.jpg")}/>
                    </div>
                    <div class="info-wrap">
                        <a href="#" class="title">Great product name</a>
                        <div class="price-wrap my-2">
                            <span class="price">$65</span>
                            <del class="price-old">$190</del>
                        </div>
                        <a href="#" class="btn btn-block btn-primary">Order now</a>
                    </div>
                </article>
            </div>
            <div class="col-md-3">
                <article class="card card-product-grid">
                    <div class="img-wrap">
                        <b class="badge badge-danger mr-1">SAVE %10</b>
                        <img src={require("../../assets/images/items/ln6.jpg")}/>
                    </div>
                    <div class="info-wrap">
                        <a href="#" class="title">Great Headset stereo music</a>
                        <div class="price-wrap my-2">
                            <span class="price">$245</span>
                            <del class="price-old">$390</del>
                        </div> 
                        <a href="#" class="btn btn-block btn-primary">Order now</a>
                    </div>
                </article>
            </div> 
            <div class="col-md-3">
                <article class="card card-product-grid">
                    <div class="img-wrap">
                        <b class="badge badge-danger mr-1">SAVE %10</b>
                        <img src={require("../../assets/images/items/ln7.jpg")}/>
                    </div>
                    <div class="info-wrap">
                        <a href="#" class="title">Amazing Speaker</a>
                        <div class="price-wrap my-2">
                            <span class="price">$45</span>
                            <del class="price-old">$90</del>
                        </div> 
                        <a href="#" class="btn btn-block btn-primary">Order now</a>
                    </div>
                </article>
            </div> 
        </div> 
    </div> 

</section>
   
);

export default Content;