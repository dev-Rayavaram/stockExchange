package com.stock.springboot.stockSight.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "stock_symbol")

public class StockSymbol {


	@Id
	private String symbol;

	@OneToOne(targetEntity=Quote.class,cascade=CascadeType.ALL,fetch=FetchType.LAZY,orphanRemoval=true)
	@JoinColumn( name="symbol",referencedColumnName="symbol")
	private Quote quote;
	@Column(name = "name")
	private String name;
	
	@Column(name="customer_id")
	private String customer_id;
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

	public String getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(String customer_id) {
		this.customer_id = customer_id;
	}

	public Quote getQuote() {
		return quote;
	}

	public void setQuote(Quote quote) {
		this.quote = quote;
	}
	


}
