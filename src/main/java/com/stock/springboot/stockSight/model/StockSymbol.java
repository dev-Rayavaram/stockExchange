package com.stock.springboot.stockSight.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "stock_symbol")

public class StockSymbol {


	@Id
	@GeneratedValue
	@Column(name = "stock_symbol_id")
	private long id;


	private String symbol;

	@Column(name = "name")
	private String name;


	@Column(name = "price")
	private float price;
	public StockSymbol() {
		super();
	}

	public StockSymbol(String symbol, String name, float price) {
		super();
		this.symbol = symbol;
		this.price = price;
		
	}

	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


	public String getSymbol() {
		return symbol;
	}


	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public float getPrice() {
		return price;
	}


	public void setPrice(float price) {
		this.price = price;
	}
	


}
