package com.tinhco.services.impl;

import com.tinhco.dto.BannerDto;
import com.tinhco.model.Banner;
import com.tinhco.repositories.BannerRepository;
import com.tinhco.services.BannerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BannerServiceImpl implements BannerService {

    private final BannerRepository bannerRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public BannerServiceImpl(BannerRepository bannerRepository, ModelMapper modelMapper) {
        this.bannerRepository = bannerRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<BannerDto> getAllBanners() {
        return bannerRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public BannerDto getBannerById(Long id) {
        Optional<Banner> bannerOptional = bannerRepository.findById(id);
        return bannerOptional.map(this::convertToDto).orElse(null);
    }

    @Override
    public BannerDto createBanner(BannerDto bannerDto) {
        Banner banner = convertToEntity(bannerDto);
        Banner savedBanner = bannerRepository.save(banner);
        return convertToDto(savedBanner);
    }

    @Override
    public BannerDto updateBanner(Long id, BannerDto bannerDto) {
        Optional<Banner> bannerOptional = bannerRepository.findById(id);
        if (bannerOptional.isPresent()) {
            Banner existingBanner = bannerOptional.get();
            existingBanner.setName(bannerDto.getName());
            existingBanner.setLink(bannerDto.getLink());
            existingBanner.setSortOrder(bannerDto.getSortOrder());
            existingBanner.setPosition(bannerDto.getPosition());
            existingBanner.setDescription(bannerDto.getDescription());
            existingBanner.setStatus(bannerDto.getStatus());

            Banner updatedBanner = bannerRepository.save(existingBanner);
            return convertToDto(updatedBanner);
        }
        return null;
    }

    @Override
    public void deleteBanner(Long id) {
        bannerRepository.deleteById(id);
    }

    private BannerDto convertToDto(Banner banner) {
        return modelMapper.map(banner, BannerDto.class);
    }

    private Banner convertToEntity(BannerDto bannerDto) {
        return modelMapper.map(bannerDto, Banner.class);
    }
}
