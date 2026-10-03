package com.umc.week3springboot.controller;

import com.umc.week3springboot.service.RentalsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/rentals")
@RequiredArgsConstructor
public class RentalsController {
    private final RentalsService rentalsService;

    @PostMapping
    public String rentBook(@RequestBody Map<String, Object> body){
        rentalsService.rentBook(body);
        return "정상적으로 대여했습니다.";
    }

    @PatchMapping("/{rentalID}/return")
    public String returnBook(@PathVariable("rentalID") Long rentalID) {
        rentalsService.returnBook(rentalID);
        return "정상적으로 반납했습니다.";
    }
}