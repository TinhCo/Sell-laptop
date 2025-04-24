package com.tinhco.services;

import com.tinhco.dto.OrderDetailDTO;
import com.tinhco.model.OrderDetail;

import java.util.List;

public interface OrderDetailService {

    List<OrderDetail> getAllOrderDetails();

    OrderDetail getOrderDetailById(Long id);

    OrderDetail createOrderDetail(OrderDetailDTO orderDetailDTO);

    OrderDetail updateOrderDetail(Long id, OrderDetailDTO orderDetailDTO);

    void deleteOrderDetail(Long id);

    List<OrderDetail> getOrderDetailsByOrderId(Long orderId);

    List<OrderDetail> getOrderDetailsByOrderIdAndProductId(Long orderId, Long productId);
}
