package com.stock.springboot.stockSight.service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import com.stock.springboot.stockSight.exception.ResourceNotFoundException;

import com.stock.springboot.stockSight.model.StockSymbol;
import com.stock.springboot.stockSight.repository.StockSymbolRepository;

@Service

public class StockSymbolService {
	@Autowired
	private StockSymbolRepository stockSymbolRepo;
	public List<StockSymbol>getAllStocksList(){
		return stockSymbolRepo.findAll();
	}
	public StockSymbol createStockItem(@Valid @RequestBody StockSymbol stockItem)
	{
		return stockSymbolRepo.save(stockItem);
	}
	

	public Map<String,Boolean>deleteStockItem(@PathVariable(value="id") Long customerId)
			throws ResourceNotFoundException {
		StockSymbol stockItem = stockSymbolRepo.findById(customerId).
				orElseThrow(() -> new ResourceNotFoundException("stockListItem notfound" + customerId));
		stockSymbolRepo.delete(stockItem);
		Map<String,Boolean>response = new HashMap<>();
		response.put("deleted stockItem",Boolean.TRUE);
		return response;

	}

}
