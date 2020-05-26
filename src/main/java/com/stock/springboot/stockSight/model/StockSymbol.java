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
	@GeneratedValue
	@Column(name = "stock_id")
	private long id;
	private String symbol;
	@Column(name = "name")
	private String name;
	
	@Column(name="customer_id")
	private String customer_id;
	@Column(name = "price")
	private float price;
	public StockSymbol() {
		super();
	}

	public StockSymbol(String customer_id, String name,String symbol, float price) {
		super();
		this.symbol = symbol;
		this.name = name;
		this.customer_id=customer_id;
		this.price=price;
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

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	
	


}
