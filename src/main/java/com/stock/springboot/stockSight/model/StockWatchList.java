package com.stock.springboot.stockSight.model;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;


@Entity
@Table(name = "stock_watch")
public class StockWatchList {
	@Column(name = "customer_id")
	private String id;
	private String symbol;
	
	@Column(name="list_type")
	private String listType;
	@OneToMany(targetEntity=StockSymbol.class,cascade=CascadeType.ALL,fetch=FetchType.LAZY,orphanRemoval=true)
	@JoinColumn( name="customer_id",referencedColumnName="id")
	private List <StockSymbol> stockSymbols;
	

	public StockWatchList() {
		super();
	}

	public StockWatchList(Long id,String symbol,String listType) {
		super();
		this.symbol = symbol;
	
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getListType() {
		return listType;
	}

	public void setListType(String listType) {
		this.listType = listType;
	}

	public List<StockSymbol> getStockSymbols() {
		return stockSymbols;
	}

	public void setStockSymbols(List<StockSymbol> stockSymbols) {
		this.stockSymbols = stockSymbols;
	}




}