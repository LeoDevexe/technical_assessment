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
public class CirculationCheckResponseDTO {

    private VehicleResponseDTO vehicle;
    private boolean canCirculate;
    private String message;
    private String lastDigitPlate;
    private String dayOfWeek;
    private LocalDateTime checkDateTime;
    private String restrictionDay;
}
