package com.example.flightmanagementsystem.Repository;

import com.example.flightmanagementsystem.Entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Integer> {
}
