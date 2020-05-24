package com.stock.springboot.stockSight.controller;


import java.util.List;
import java.util.Map;

import com.stock.springboot.stockSight.exception.ResourceNotFoundException;
import com.stock.springboot.stockSight.model.StockWatchList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.stock.springboot.stockSight.service.StockWatchListService;

import javax.validation.Valid;

@RestController
@RequestMapping("stock_watch_api/v1")

public class StockWatchListController {
	@Autowired
	private StockWatchListService stockWatchListService;
	
	@GetMapping("/")
	public List<StockWatchList>getAllStockWatchList(){
		return stockWatchListService.getAllStockWatchList();
	}
	@PostMapping("/stocks")
	public StockWatchList addStockWatchList(@Valid @RequestBody StockWatchList stocklistItem)
	{
		return stockWatchListService.createStockList(stocklistItem);
	}
	@PutMapping("/stock/{id}")
	public StockWatchList updateStockListById(@PathVariable Long id ,@Valid @RequestBody StockWatchList stocklistItem)
	{
		 return stockWatchListService.createStockList(stocklistItem);
	}

	@DeleteMapping("/stocks/{id}")
	public Map<String,Boolean> deleteStockListById(@PathVariable Long id)throws ResourceNotFoundException 
	{
		return stockWatchListService.deleteStockListById(id);
		
	}

	

}
