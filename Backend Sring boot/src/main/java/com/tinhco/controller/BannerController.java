package com.tinhco.controller;

import com.tinhco.dto.BannerDto;
import com.tinhco.services.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/banners")
public class BannerController {

    private final BannerService bannerService;

    @Autowired
    public BannerController(BannerService bannerService) {
        this.bannerService = bannerService;
    }

    @GetMapping
    public ResponseEntity<List<BannerDto>> getAllBanners() {
        List<BannerDto> banners = bannerService.getAllBanners();
        return ResponseEntity.ok(banners);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BannerDto> getBannerById(@PathVariable Long id) {
        BannerDto banner = bannerService.getBannerById(id);
        if (banner == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(banner);
    }

    @PostMapping
    public ResponseEntity<BannerDto> createBanner(@RequestBody BannerDto bannerDto) {
        BannerDto createdBanner = bannerService.createBanner(bannerDto);
        return new ResponseEntity<>(createdBanner, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BannerDto> updateBanner(@PathVariable Long id, @RequestBody BannerDto bannerDto) {
        BannerDto updatedBanner = bannerService.updateBanner(id, bannerDto);
        if (updatedBanner == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedBanner);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBanner(@PathVariable Long id) {
        bannerService.deleteBanner(id);
        return ResponseEntity.noContent().build();
    }
}
