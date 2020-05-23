package com.stock.springboot.stockSight.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.stock.springboot.stockSight.exception.ResourceNotFoundException;
import com.stock.springboot.stockSight.model.StockWatchList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stock.springboot.stockSight.repository.StockWatchListRepository;
import javax.validation.Valid;

@RestController
@RequestMapping("stock_watch_api/v1")

public class StockWatchListController {
	@Autowired
	private StockWatchListRepository stockWatchListRepository;
	
	@GetMapping("/stock_watch_list")
	public List<StockWatchList>getAllStockWatchList(){
		return stockWatchListRepository.findAll();
	}

}
