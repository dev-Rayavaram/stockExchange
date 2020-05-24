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


	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getExchange() {
		return exchange;
	}

	public void setExchange(String exchange) {
		this.exchange = exchange;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getVolume() {
		return volume;
	}

	public void setVolume(int volume) {
		this.volume = volume;
	}

	public double getMarketCap() {
		return marketCap;
	}

	public void setMarketCap(double marketCap) {
		this.marketCap = marketCap;
	}

	public float getDayLow() {
		return dayLow;
	}

	public void setDayLow(float dayLow) {
		this.dayLow = dayLow;
	}

	public float getDayHign() {
		return dayHign;
	}

	public void setDayHign(float dayHign) {
		this.dayHign = dayHign;
	}

}
