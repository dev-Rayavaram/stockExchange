package com.stock.springboot.stockSight.service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import com.stock.springboot.stockSight.exception.ResourceNotFoundException;

import com.stock.springboot.stockSight.model.Quote;
import com.stock.springboot.stockSight.repository.QuoteRepository;

@Service

public class QuoteService {
	@Autowired
	private QuoteRepository quoteRepository;
	public List<Quote>getAllStocksList(){
		return quoteRepository.findAll();
	}
	public Quote createQuoteItem(@Valid @RequestBody Quote quoteItem)
	{
		return quoteRepository.save(quoteItem);
	}
	

	public Map<String,Boolean>deleteQuoteItem(@PathVariable(value="symbol") String stockSymbol)
			throws ResourceNotFoundException {
		Quote quoteItem = quoteRepository.findById(stockSymbol).
				orElseThrow(() -> new ResourceNotFoundException("stockListItem notfound" + stockSymbol));
				quoteRepository.delete(quoteItem);
		Map<String,Boolean>response = new HashMap<>();
		response.put("deleted stockItem",Boolean.TRUE);
		return response;

	}


}
