package com.example.flightmanagementsystem.Repository;

import com.example.flightmanagementsystem.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    @Query(nativeQuery = true,value = "select * from user_table where username=?2 and password=?1")
    Integer gtUserIDFromPwordANdUname(String pword,String uname);

}
