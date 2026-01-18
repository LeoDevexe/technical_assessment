package com.hoynocircula.controller;

import com.hoynocircula.dto.CirculationCheckRequestDTO;
import com.hoynocircula.dto.CirculationCheckResponseDTO;
import com.hoynocircula.service.CirculationValidationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1/circulation")
@Tag(name = "Circulación", description = "Operaciones para validar la norma Hoy No Circula")
public class CirculationController {

    private final CirculationValidationService circulationValidationService;

    public CirculationController(CirculationValidationService circulationValidationService) {
        this.circulationValidationService = circulationValidationService;
    }

    @PostMapping("/check")
    @Operation(summary = "Validar circulación", description = "Verifica si un vehículo puede circular en la fecha y hora indicadas")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Validación completada",
                    content = @Content(schema = @Schema(implementation = CirculationCheckResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Error de validación o vehículo no existe"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<CirculationCheckResponseDTO> checkCirculation(
            @Valid @RequestBody CirculationCheckRequestDTO requestDTO) {

        log.info("POST /api/v1/circulation/check - Validando circulación para placa: {} en fecha: {}",
                requestDTO.getPlate(), requestDTO.getCheckDateTime());

        CirculationCheckResponseDTO response = circulationValidationService.validateCirculation(requestDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    @Operation(summary = "Health Check", description = "Verifica que el servicio esté disponible")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Circulation Service is running");
    }
}
