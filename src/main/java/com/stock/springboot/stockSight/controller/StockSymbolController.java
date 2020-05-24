package com.stock.springboot.stockSight.controller;



import java.util.List;
import java.util.Map;

import com.stock.springboot.stockSight.exception.ResourceNotFoundException;
import com.stock.springboot.stockSight.model.StockSymbol;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.stock.springboot.stockSight.service.StockSymbolService;

import javax.validation.Valid;

@RestController
@RequestMapping("stock_watch_api/v1")

public class StockSymbolController {
	@Autowired
	private StockSymbolService stockSymbolService;
	
	@GetMapping("/stock")
	public List<StockSymbol>getAllStockWatchList(){
		return stockSymbolService.getAllStocksList();
	}
	@PostMapping("/stock/stocks")
	public StockSymbol addStockWatchList(@Valid @RequestBody StockSymbol stockSymbolItem)
	{
		return stockSymbolService.createStock(stockSymbolItem);
	}
	

	@DeleteMapping("/stock/{id}")
	public Map<String,Boolean> deleteStockListById(@PathVariable Long id)throws ResourceNotFoundException 
	{
		return stockSymbolService.deleteStockById(id);
		
	}

	

}




