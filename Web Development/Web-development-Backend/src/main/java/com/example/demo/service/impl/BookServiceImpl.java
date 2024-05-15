package com.example.demo.service.impl;

import com.example.demo.entity.Book;
import com.example.demo.entity.Futsal;
import com.example.demo.entity.User;
import com.example.demo.pojo.BookPojo;
import com.example.demo.pojo.BookProjection;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.FutsalRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final FutsalRepository futsalRepository;

    @Override
    public Integer saveBook(BookPojo bookPojo) {
        Book book = new Book();

        book.setId(bookPojo.getId());
        book.setDate(bookPojo.getDate());

        User user = userRepository.findById(bookPojo.getUser_id()).get();
        book.setUser(user);

        Futsal futsal = futsalRepository.findById(bookPojo.getGround_id()).get();
        book.setFutsal(futsal);

        book=bookRepository.save(book);
        return book.getId();
    }

    @Override
    public List<BookProjection> findAll() {
        return bookRepository.findAllData();
    }

    @Override
    public List<Book> findAll2() {
        return bookRepository.findAll();
    }

    @Override
    public Book findById(Integer id) {
        return bookRepository.findById(id).get();
    }

    @Override
    public void deleteById(Integer id) {
        bookRepository.deleteById(id);
    }
}
