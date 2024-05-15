package com.example.demo.repository;

import com.example.demo.entity.Book;
import com.example.demo.pojo.BookProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {


    @Query(nativeQuery = true, value = "select id, ground_id as groundId, user_id as userId,date from book_information")
    List<BookProjection> findAllData();
}
