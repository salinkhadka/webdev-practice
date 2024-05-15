package com.example.demo.exception;

import com.example.demo.pojo.GlobalApiResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler({Exception.class})
    public GlobalApiResponse<String> handleAll(final Exception ex,
                                               final WebRequest request) {
        GlobalApiResponse<String> response = new GlobalApiResponse<>();
        response.setMessage(ex.getMessage());
        response.setStatus(400);
        response.setData("request failed");
        return response;
    }
}
