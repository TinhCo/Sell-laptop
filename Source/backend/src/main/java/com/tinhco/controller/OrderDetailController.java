package com.tinhco.controller;

import com.tinhco.dto.OrderDetailDTO;
import com.tinhco.model.OrderDetail;
import com.tinhco.services.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orderdetails")
public class OrderDetailController {

    private final OrderDetailService orderDetailService;

    @Autowired
    public OrderDetailController(OrderDetailService orderDetailService) {
        this.orderDetailService = orderDetailService;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<List<OrderDetail>> getOrderDetails(
            @RequestParam(required = false) Long orderId,
            @RequestParam(required = false) Long productId) {
        List<OrderDetail> orderDetails;
        if (orderId != null && productId != null) {
            orderDetails = orderDetailService.getOrderDetailsByOrderIdAndProductId(orderId, productId);
        } else if (orderId != null) {
            orderDetails = orderDetailService.getOrderDetailsByOrderId(orderId);
        } else {
            orderDetails = orderDetailService.getAllOrderDetails();
        }
        return ResponseEntity.ok(orderDetails);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<OrderDetail> getOrderDetailById(@PathVariable Long id) {
        OrderDetail orderDetail = orderDetailService.getOrderDetailById(id);
        return ResponseEntity.ok(orderDetail);
    }

    @PostMapping
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<OrderDetail> createOrderDetail(@RequestBody OrderDetailDTO orderDetailDTO) {
        OrderDetail createdOrderDetail = orderDetailService.createOrderDetail(orderDetailDTO);
        return new ResponseEntity<>(createdOrderDetail, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<OrderDetail> updateOrderDetail(@PathVariable Long id, @RequestBody OrderDetailDTO orderDetailDTO) { // Changed int to Long
        OrderDetail updatedOrderDetail = orderDetailService.updateOrderDetail(id, orderDetailDTO);
        return ResponseEntity.ok(updatedOrderDetail);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteOrderDetail(@PathVariable Long id) {
        orderDetailService.deleteOrderDetail(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/order/{orderId}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<List<OrderDetail>> getOrderDetailsByOrderId(@PathVariable Long orderId) { // Changed int to Long
        List<OrderDetail> orderDetails = orderDetailService.getOrderDetailsByOrderId(orderId);
        return ResponseEntity.ok(orderDetails);
    }
}
