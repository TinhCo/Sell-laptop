package com.tinhco.controller;

import com.tinhco.model.CartItem;
import com.tinhco.services.impl.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart-items")
public class CartItemController {

    private final CartItemService cartItemService;

    @Autowired
    public CartItemController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<CartItem> createCartItem(@RequestBody CartItem cartItem) {
        CartItem createdCartItem = cartItemService.createCartItem(cartItem);
        return new ResponseEntity<>(createdCartItem, HttpStatus.CREATED);
    }
    @PreAuthorize("hasAuthority('USER')")
    @GetMapping
    public ResponseEntity<List<CartItem>> getAllCartItems() {
        List<CartItem> cartItems = cartItemService.getAllCartItems();
        return ResponseEntity.ok(cartItems);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CartItem> getCartItemById(@PathVariable Long id) {
        CartItem cartItem = cartItemService.getCartItemById(id);
        if (cartItem != null) {
            return ResponseEntity.ok(cartItem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable Long id, @RequestBody CartItem cartItem) {
        cartItem.setId(id); // Ensure the correct ID is set for update
        CartItem updatedCartItem = cartItemService.updateCartItem(cartItem);
        return ResponseEntity.ok(updatedCartItem);
    }
    @PreAuthorize("hasAuthority('USER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long id) {
        cartItemService.deleteCartItem(id);
        return ResponseEntity.noContent().build();
    }
}
