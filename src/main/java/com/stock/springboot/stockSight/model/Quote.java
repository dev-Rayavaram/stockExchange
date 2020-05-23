package com.stock.springboot.stockSight.model;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "stock_quote")

public class Quote {

	@Id
	@GeneratedValue
	@Column(name = "stock_symbol_id")
	private long id;
	private String symbol;
	@Column(name = "exchange")
	private String exchange;
	@Column(name = "price")
	private float price;	
	@Column(name = "volume")
	private int volume;
	@Column(name = "market_cap")
	private double marketCap;
	@Column(name = "day_low")
	private float dayLow;
	@Column(name = "day_high")
	private float dayHign;
	public Quote() {
		super();
	}

	public Quote(String symbol, String exchange, float price,int volume,double marketCap, float low, float high) {
		super();
		this.symbol = symbol;
		this.exchange = exchange;
		this.price = price;
		this.volume = volume;
		this.marketCap = marketCap;
		this.dayLow = low;
		this.dayHign = high;
	}

}
