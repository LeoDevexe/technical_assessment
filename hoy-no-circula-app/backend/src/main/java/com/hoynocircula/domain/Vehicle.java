package com.hoynocircula.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "vehicles", uniqueConstraints = {@UniqueConstraint(columnNames = "plate")})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "La placa es obligatoria")
    @Column(nullable = false, unique = true, length = 20)
    private String plate;

    @NotBlank(message = "El color es obligatorio")
    @Column(nullable = false, length = 50)
    private String color;

    @NotBlank(message = "El modelo es obligatorio")
    @Column(nullable = false, length = 50)
    private String model;

    @NotBlank(message = "El chasis es obligatorio")
    @Column(nullable = false, unique = true, length = 50)
    private String chassis;

    @Column(length = 50)
    private String brand;

    @Column
    private Integer year;

    @Column(length = 50)
    private String type;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
