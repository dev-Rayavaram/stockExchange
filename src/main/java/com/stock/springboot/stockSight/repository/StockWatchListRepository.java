package com.stock.springboot.stockSight.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stock.springboot.stockSight.model.StockWatchList;
@Repository
public interface StockWatchListRepository extends JpaRepository<StockWatchList, Long>{

}

