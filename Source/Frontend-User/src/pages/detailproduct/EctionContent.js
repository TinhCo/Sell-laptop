import React from "react";
const EctionContent = () => (
    <section class="section-content bg-white padding-y">
<div class="container">
	<div class="row">
		<aside class="col-md-6">
<div class="card">
<article class="gallery-wrap"> 
	<div class="img-big-wrap">
	  <div> <a href="#"><img src={require("../../assets/images/items/gm.jpg")}/></a></div>
	</div>
	<div class="thumbs-wrap">
	  <a href="#" class="item-thumb"> <img src={require("../../assets/images/items/gm_1.jpg")}/></a>
	  <a href="#" class="item-thumb"> <img src={require("../../assets/images/items/gm_2.jpg")}/></a>
	  <a href="#" class="item-thumb"> <img src={require("../../assets/images/items/gm_3.jpg")}/></a>
	  <a href="#" class="item-thumb"> <img src={require("../../assets/images/items/gm_4.jpg")}/></a>
	</div>
</article>
</div>
		</aside>
		<main class="col-md-6">
<article class="product-info-aside">

<h2 class="title mt-3">Macbook 13 pro 2023 (Core i5-13500H, 16GB, 512GB, RTX 4050 6GB, 16" FHD+ IPS 165Hz) </h2>

<div class="rating-wrap my-3">
	<ul class="rating-stars">
		<li style={{width:"80%"}} class="stars-active"> 
			<i class="fa fa-star"></i> <i class="fa fa-star"></i> 
			<i class="fa fa-star"></i> <i class="fa fa-star"></i> 
			<i class="fa fa-star"></i> 
		</li>
		<li>
			<i class="fa fa-star"></i> <i class="fa fa-star"></i> 
			<i class="fa fa-star"></i> <i class="fa fa-star"></i> 
			<i class="fa fa-star"></i> 
		</li>
	</ul>
	<small class="label-rating text-muted">132 reviews</small>
	<small class="label-rating text-success"> <i class="fa fa-clipboard-check"></i> 154 orders </small>
</div>

<div class="mb-3"> 
	<var class="price h4 do">Deal: 25.990.000</var> 
	<span class="text-muted khai"> 30.990.000</span> 
</div>

<p>Macbook 16 2023 là một chiếc laptop chơi game ấn tượng với thiết kế cấu trúc gaming từ bên ngoài cho đến vỏ hộp. Thiết kế này tạo nên một phong cách mạnh mẽ, độc đáo và tinh tế. Máy tính còn được điểm xuyết bởi các viền neon tinh tế, tạo sự hòa hợp và thu hút mọi ánh nhìn đến từ góc “setup” của game thủ. </p>


<dl class="row">
  <dt class="col-sm-3">Nhà xản xuất:</dt>
  <dd class="col-sm-9"><a href="#">LapTop Minh Hưng.</a></dd>

  <dt class="col-sm-3">Số bài viết:</dt>
  <dd class="col-sm-9">596</dd>

  <dt class="col-sm-3">Bảo hành</dt>
  <dd class="col-sm-9">1 năm</dd>

  <dt class="col-sm-3">Thời gian giao hàng</dt>
  <dd class="col-sm-9">3-4 ngày</dd>

  <dt class="col-sm-3">Tình trạng:</dt>
  <dd class="col-sm-9">Còn hàng</dd>
</dl>

	<div class="form-row  mt-4">
		<div class="form-group col-md flex-grow-0">
			<div class="input-group mb-3 input-spinner">
			  <div class="input-group-prepend">
			    <button class="btn btn-light" type="button" id="button-plus"> + </button>
			  </div>
			  <input type="text" class="form-control" value="1"/>
			  <div class="input-group-append">
			    <button class="btn btn-light" type="button" id="button-minus"> &minus; </button>
			  </div>
			</div>
		</div>
		<div class="form-group col-md">
			<a href="#"  class="btn  btn-primary mau"> 
				<i class="fas fa-shopping-cart"></i> <span class="text">Thêm vào giỏ hàng</span> 
			</a>
			<a href="#" class="btn btn-light">
        <i class="fas fa-envelope"></i> <span class="text">Liên hệ với nhà cung cấp</span> 
			</a>
		</div>
	</div>

</article>
		</main>
	</div>


</div>
</section>
);
export default EctionContent