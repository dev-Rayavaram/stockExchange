package com.stock.springboot.stockSight.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stock.springboot.stockSight.model.Quote;
@Repository
public interface QuoteRepository extends JpaRepository<Quote, Long>{
	public Quote findBySymbol(String symbol);

}
