package com.stock.springboot.stockSight.controller;

import java.util.List;

import com.stock.springboot.stockSight.model.Quote;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.stock.springboot.stockSight.service.QuoteService;

import javax.validation.Valid;


@RestController
@RequestMapping("/stock_watch_api/v1")
public class QuoteController {	
	@Autowired
	private QuoteService quoteService;
	
	@GetMapping("/quote")
	public List<Quote>getAllQuotes(){
		return quoteService.getAllQuotes();
	}
	@PostMapping("/quote/quote")
	public Quote addQuote(@Valid @RequestBody Quote quote)
	{
		return quoteService.createQuote(quote);
	}
	

//	@DeleteMapping("/quote/{id}")
//	public Map<String,Boolean> deleteQuoteById(@PathVariable String id)throws ResourceNotFoundException 
//	{
//		return quoteService.deleteQuoteById(id);
//		
//	}
//

}
