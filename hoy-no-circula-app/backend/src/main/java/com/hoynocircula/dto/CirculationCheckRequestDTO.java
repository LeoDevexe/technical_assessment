package com.hoynocircula.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CirculationCheckRequestDTO {

    @NotBlank(message = "La placa es obligatoria")
    private String plate;

    @NotNull(message = "La fecha y hora es obligatoria")
    @FutureOrPresent(message = "La fecha y hora no puede ser anterior a la actual")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime checkDateTime;
}
