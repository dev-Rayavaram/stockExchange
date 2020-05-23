package com.stock.springboot.stockSight.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.stock.springboot.stockSight.exception.ResourceNotFoundException;
import com.stock.springboot.stockSight.model.Quote;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stock.springboot.stockSight.repository.QuoteRepository;


import javax.validation.Valid;

@RestController
@RequestMapping("stock_api/v1")
public class QuoteController {	
	@Autowired
	private QuoteRepository quoteRepository;
	
	@GetMapping("/stock_quote")
	public List<Quote>getAllQuotes(){
		return quoteRepository.findAll();
	}

}
