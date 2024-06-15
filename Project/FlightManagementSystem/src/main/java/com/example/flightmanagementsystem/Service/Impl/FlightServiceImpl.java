package com.example.flightmanagementsystem.Service.Impl;

import com.example.flightmanagementsystem.Entity.Flight;
import com.example.flightmanagementsystem.Repository.FlightRepository;
import com.example.flightmanagementsystem.Service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlightServiceImpl implements FlightService {

    @Autowired
    private FlightRepository flightRepository;

    @Override
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    @Override
    public Flight getFlightById(Integer id) {
        return flightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flight not found"));
    }



    @Override
    public Flight createFlight(Flight flight) {
        return flightRepository.save(flight);
    }

    @Override
    public Flight updateFlight(Integer id, Flight flight) {
        Flight existingFlight = flightRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        existingFlight.setAirline(flight.getAirline());
        existingFlight.setFlightNumber(flight.getFlightNumber());
        existingFlight.setDepartureTime(flight.getDepartureTime());
        existingFlight.setArrivalTime(flight.getArrivalTime());
        existingFlight.setOrigin(flight.getOrigin());
        existingFlight.setDestination(flight.getDestination());
        existingFlight.setPrice(flight.getPrice());

        return flightRepository.save(existingFlight);
    }

    @Override
    public void deleteFlight(Integer id) {
        flightRepository.deleteById(id);
    }
}
