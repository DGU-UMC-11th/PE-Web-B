package com.umc.week3springboot.service;

import com.umc.week3springboot.repository.RentalsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RentalsService {
    private final RentalsRepository rentalsRepository;

    public void rentBook(Map<String, Object> body){
        rentalsRepository.rentBook(body);
    }

    public void returnBook(Long rentalID) {
        rentalsRepository.returnBook(rentalID);
    }
}