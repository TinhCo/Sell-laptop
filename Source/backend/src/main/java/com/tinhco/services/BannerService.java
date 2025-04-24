package com.tinhco.services;

import com.tinhco.dto.BannerDto;

import java.util.List;

public interface BannerService {
    List<BannerDto> getAllBanners();
    BannerDto getBannerById(Long id);
    BannerDto createBanner(BannerDto bannerDto);
    BannerDto updateBanner(Long id, BannerDto bannerDto);
    void deleteBanner(Long id);
}
