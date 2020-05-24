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
	@Id
	@GeneratedValue
	private long id;
	private String symbol;
	
	@Column(name="list_type")
	private String listType;

	

	public StockWatchList() {
		super();
	}

	public StockWatchList(String symbol,String listType) {
		super();
		this.symbol = symbol;

		this.listType = listType;
	
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

	public String getListType() {
		return listType;
	}

	public void setListType(String listType) {
		this.listType = listType;
	}

	


}