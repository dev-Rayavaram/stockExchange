package com.stock.springboot.stockSight.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stock.springboot.stockSight.model.StockSymbol;
@Repository
public interface StockSymbolRepository extends JpaRepository<StockSymbol, String>{

}


