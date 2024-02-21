package com.team9.manosarthi_backend.Config;

import com.team9.manosarthi_backend.models.JwtRequest;
import com.team9.manosarthi_backend.models.JwtResponse;
import com.team9.manosarthi_backend.security.JwtHelper;
import com.team9.manosarthi_backend.security.TokenGenerationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalTime;
import java.util.stream.Collectors;


@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {


        @Autowired
        private UserDetailsServiceImpl userDetailsService;

        @Autowired
        private AuthenticationManager manager;


        @Autowired
        private JwtHelper helper;

        private Logger logger = LoggerFactory.getLogger(AuthController.class);


        @PostMapping("/login")
        public ResponseEntity<?> login(@RequestBody JwtRequest request) {

            this.doAuthenticate(request.getUsername(), request.getPassword());


            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
            //String token = this.helper.generateToken(userDetails);
            // Given time
            LocalTime givenTime = LocalTime.of(23, 59, 0); // 2:30 PM

            // Current system time
            LocalTime currentTime = LocalTime.now();

            // Calculate the time difference
            Duration difference = Duration.between(currentTime, givenTime);

            // Convert to milliseconds
            long milliseconds = difference.toMillis();
            //System.currentTimeMillis()-
            System.out.println(milliseconds);
            try {
                if (milliseconds < 0) {
                    System.out.println("Timeout!!!");
                    throw new TokenGenerationException("Timeout");
                } else {
                    String token = this.helper.generateToken(userDetails, milliseconds);

                    JwtResponse response = JwtResponse.builder()
                            .jwtToken(token)
                           .username(userDetails.getUsername()).role(userDetails.getAuthorities().toString()).build();

                    return new ResponseEntity<>(response, HttpStatus.OK);
                }
            }
            catch (TokenGenerationException e) {
                // Handle the exception and return an appropriate response
                return new ResponseEntity<>("Token generation failed: " + e.getMessage(), HttpStatus.BAD_REQUEST);
            }

        }

        private void doAuthenticate(String username, String password) {

            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, password);
            try {
                manager.authenticate(authentication);


            } catch (BadCredentialsException e) {
                throw new BadCredentialsException(" Invalid Username or Password  !!");
            }

        }

//        @ExceptionHandler(BadCredentialsException.class)
//        public String exceptionHandler() {
//            return "Credentials Invalid !!";
//        }
@ExceptionHandler(BadCredentialsException.class)
public ResponseEntity<?> exceptionHandler() {

            return new ResponseEntity<>("CREDENTIALS INVALID ! " , HttpStatus.BAD_REQUEST);
}



}