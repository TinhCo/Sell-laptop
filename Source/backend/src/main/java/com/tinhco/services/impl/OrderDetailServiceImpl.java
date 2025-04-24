package com.tinhco.services.impl;

import com.tinhco.dto.OrderDetailDTO;
import com.tinhco.model.Order;
import com.tinhco.model.OrderDetail;
import com.tinhco.model.Product;
import com.tinhco.repositories.OrderDetailRepository;
import com.tinhco.repositories.OrderRepository;
import com.tinhco.repositories.ProductRepository;
import com.tinhco.services.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    private final OrderDetailRepository orderDetailRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Autowired
    public OrderDetailServiceImpl(OrderDetailRepository orderDetailRepository,
                                  OrderRepository orderRepository,
                                  ProductRepository productRepository) {
        this.orderDetailRepository = orderDetailRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @Override
    public List<OrderDetail> getAllOrderDetails() {
        return orderDetailRepository.findAll();
    }

    @Override
    public OrderDetail getOrderDetailById(Long id) {
        return orderDetailRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public OrderDetail createOrderDetail(OrderDetailDTO orderDetailDTO) {
        OrderDetail orderDetail = convertToEntity(orderDetailDTO);
        return orderDetailRepository.save(orderDetail);
    }

    @Override
    @Transactional
    public OrderDetail updateOrderDetail(Long id, OrderDetailDTO orderDetailDTO) {
        OrderDetail existingOrderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OrderDetail not found"));
        updateOrderDetailFromDTO(existingOrderDetail, orderDetailDTO);
        return orderDetailRepository.save(existingOrderDetail);
    }

    @Override
    @Transactional
    public void deleteOrderDetail(Long id) {
        OrderDetail existingOrderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("OrderDetail not found"));
        orderDetailRepository.delete(existingOrderDetail);
    }

    @Override
    public List<OrderDetail> getOrderDetailsByOrderId(Long orderId) {
        return orderDetailRepository.findByOrderId(orderId);
    }

    private OrderDetail convertToEntity(OrderDetailDTO dto) {
        Order order = orderRepository.findById((long) dto.getOrderId().intValue()) // Convert Long to Integer
                .orElseThrow(() -> new RuntimeException("Order not found"));
        Product product = productRepository.findById(dto.getProductId().intValue()) // Convert Long to Integer
                .orElseThrow(() -> new RuntimeException("Product not found"));

        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setOrder(order);
        orderDetail.setProduct(product);
        orderDetail.setPrice((float) dto.getPrice()); // Convert double to float
        orderDetail.setQty(dto.getQty());
        orderDetail.setAmount((float) dto.getAmount()); // Convert double to float
        return orderDetail;
    }

    private void updateOrderDetailFromDTO(OrderDetail orderDetail, OrderDetailDTO orderDetailDTO) {
        orderDetail.setOrder(orderRepository.findById((long) orderDetailDTO.getOrderId().intValue()) // Convert Long to Integer
                .orElseThrow(() -> new RuntimeException("Order not found")));
        orderDetail.setProduct(productRepository.findById(orderDetailDTO.getProductId().intValue()) // Convert Long to Integer
                .orElseThrow(() -> new RuntimeException("Product not found")));
        orderDetail.setPrice((float) orderDetailDTO.getPrice()); // Convert double to float
        orderDetail.setQty(orderDetailDTO.getQty());
        orderDetail.setAmount((float) orderDetailDTO.getAmount()); // Convert double to float
    }


    public List<OrderDetail> getOrderDetailsByOrderIdAndProductId(Long orderId, Long productId) {
        return orderDetailRepository.findByOrderIdAndProductId(orderId, productId);
    }


}
