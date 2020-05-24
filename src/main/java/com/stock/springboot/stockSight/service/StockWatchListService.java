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

import com.stock.springboot.stockSight.model.StockWatchList;
import com.stock.springboot.stockSight.repository.StockWatchListRepository;


@Service
public class StockWatchListService {
@Autowired
	private StockWatchListRepository stockWatchListRepo;
		public List<StockWatchList>getAllStockWatchList(){
			return stockWatchListRepo.findAll();
		}
		public StockWatchList createStockList(@Valid @RequestBody StockWatchList stockListItem)
		{
			return stockWatchListRepo.save(stockListItem);
		}
		public ResponseEntity<StockWatchList> updateStockListById(@PathVariable(value="id") Long customerId,@Valid @RequestBody StockWatchList stockListItemDetail)
				throws ResourceNotFoundException {
			StockWatchList listItem = stockWatchListRepo.findById(customerId).
			orElseThrow(() -> new ResourceNotFoundException("Stock Item notfound" + customerId));
			listItem.setListType(stockListItemDetail.getListType());
			listItem.setSymbol(stockListItemDetail.getSymbol());
			System.out.println("Syamala IS PRINTING"+listItem);
			final StockWatchList updatedListItem = stockWatchListRepo.save(listItem);
			return ResponseEntity.ok(updatedListItem);
		}

		public Map<String,Boolean>deleteStockListById(@PathVariable(value="id") Long customerId)
				throws ResourceNotFoundException {
			StockWatchList stockListItem = stockWatchListRepo.findById(customerId).
					orElseThrow(() -> new ResourceNotFoundException("stockListItem notfound" + customerId));
			stockWatchListRepo.delete(stockListItem);
			Map<String,Boolean>response = new HashMap<>();
			response.put("deleted stockListItem",Boolean.TRUE);
			return response;

		}

}
