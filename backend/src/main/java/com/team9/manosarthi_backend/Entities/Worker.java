package com.team9.manosarthi_backend.Entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

//import javax.validation.constraints.NotNull;
import java.sql.Date;

@Entity
@Table(name = "worker")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

public class Worker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @NotBlank(message = "first_name cannot be blank")
    @Pattern(regexp="[a-zA-Z]+", message="Only characters are allowed")
    @Column(name = "first_name")
    private String firstname;

    @NotBlank(message = "last_name cannot be blank")
    @Pattern(regexp="[a-zA-Z]+", message="Only characters are allowed")
    @Column(name = "last_name")
    private String lastname;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Enter valid email")
    @Column(name = "email", unique = true)
    private String email;

    @OneToOne
    @JoinColumn(name = "username")
    private User user;

    @OneToOne
    @JoinColumn(name = "villagecode")
    private Village villagecode;

    @Column(name = "patient_count")
    private int patient_count=0;

    @Column(name = "gender")
    private String gender;

    @NotNull(message = "DOB cannot be null")
    @Column(name = "dob")
    private Date dob;

    @Column(name = "active")
    private boolean active=true;

}
