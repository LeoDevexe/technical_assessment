package com.hoynocircula.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VehicleResponseDTO {

    private Long id;
    private String plate;
    private String color;
    private String model;
    private String chassis;
    private String brand;
    private Integer year;
    private String type;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
