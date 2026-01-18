package com.hoynocircula.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VehicleRequestDTO {

    @NotBlank(message = "La placa es obligatoria")
    private String plate;

    @NotBlank(message = "El color es obligatorio")
    private String color;

    @NotBlank(message = "El modelo es obligatorio")
    private String model;

    @NotBlank(message = "El chasis es obligatorio")
    private String chassis;

    private String brand;

    private Integer year;

    private String type;
}
