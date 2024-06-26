package com.team9.manosarthi_backend.Entities;

import com.team9.manosarthi_backend.Config.AesEncryptor;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "abha_id")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class NotRefAbhaId {
    @Convert(converter = AesEncryptor.class)
    @Id
    @Column(name = "aabha_id")
    @NotBlank(message = "aabhaId cannot be blank")
    @Pattern(regexp="[0-9]+", message="Only numbers are allowed")
    private String aabha_id;

    @ManyToOne
    @JoinColumn(name = "villagecode")
    private Village villagecode;

    @ManyToOne
    @JoinColumn(name="id")
    private Worker workerid;

    @Column(name = "registered_date")
    private Date RegisteredDate;
}
