package com.stock.springboot.stockSight.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.stock.springboot.stockSight.exception.ResourceNotFoundException;
import com.stock.springboot.stockSight.model.StockSymbol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stock.springboot.stockSight.repository.StockSymbolRepository;
import javax.validation.Valid;

@RestController
@RequestMapping("stock_symbol_api/v1")
public class StockSymbolController {
	@Autowired
	private StockSymbolRepository stockSymbolRepository;
	
	@GetMapping("/stock_symbol")
	public List<StockSymbol>getAllQuotes(){
		return stockSymbolRepository.findAll();
	}

}
