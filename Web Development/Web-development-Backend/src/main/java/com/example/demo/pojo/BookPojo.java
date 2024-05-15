package com.example.demo.pojo;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BookPojo {

    private Integer id;

    @NotEmpty(message = "date is required")
    private String date;

    @NotNull(message = "ground is required")
    private Integer ground_id;

    @NotNull(message = "user id required")
    private Integer user_id;

}
