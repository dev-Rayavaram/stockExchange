package com.stock.springboot.stockSight.controller;



import java.util.List;

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
	
	@GetMapping("/symbol")
	public List<StockSymbol>getAllStockSymbols(){
		return stockSymbolService.getAllStockSymbols();
	}
	@PostMapping("/symbol/stocks")
	public StockSymbol addStockSymbol(@Valid @RequestBody StockSymbol stockSymbolItem)
	{
		return stockSymbolService.createStock(stockSymbolItem);
	}
	

//	@DeleteMapping("/symbol/{symbol}")
//	public Map<String,Boolean> deleteStockListById(@PathVariable String symbol)throws ResourceNotFoundException 
//	{
//		return stockSymbolService.deleteStockById(symbol);
//		
//	}

	

}




