package com.hoynocircula.controller;

import com.hoynocircula.dto.VehicleRequestDTO;
import com.hoynocircula.dto.VehicleResponseDTO;
import com.hoynocircula.service.VehicleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/vehicles")
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(name = "Vehículos", description = "Operaciones para gestionar vehículos")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @PostMapping("/register")
    @Operation(summary = "Registrar un nuevo vehículo", description = "Crea un nuevo registro de vehículo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Vehículo registrado exitosamente",
                    content = @Content(schema = @Schema(implementation = VehicleResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Error de validación o vehículo ya existe"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<VehicleResponseDTO> registerVehicle(
            @Valid @RequestBody VehicleRequestDTO requestDTO) {

        log.info("POST /api/v1/vehicles/register - Registrando vehículo con placa: {}", requestDTO.getPlate());
        VehicleResponseDTO response = vehicleService.registerVehicle(requestDTO);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{plate}")
    @Operation(summary = "Obtener vehículo por placa", description = "Retorna los datos de un vehículo específico")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Vehículo encontrado",
                    content = @Content(schema = @Schema(implementation = VehicleResponseDTO.class))),
            @ApiResponse(responseCode = "404", description = "Vehículo no encontrado"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<VehicleResponseDTO> getVehicleByPlate(
            @PathVariable String plate) {

        log.debug("GET /api/v1/vehicles/{} - Obteniendo vehículo", plate);
        VehicleResponseDTO response = vehicleService.getVehicleByPlate(plate);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    @Operation(summary = "Listar todos los vehículos", description = "Retorna una lista de todos los vehículos registrados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de vehículos",
                    content = @Content(schema = @Schema(implementation = VehicleResponseDTO.class))),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    public ResponseEntity<List<VehicleResponseDTO>> getAllVehicles() {
        log.debug("GET /api/v1/vehicles - Obteniendo todos los vehículos");
        List<VehicleResponseDTO> response = vehicleService.getAllVehicles();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    @Operation(summary = "Health Check", description = "Verifica que el servicio esté disponible")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Vehicle Service is running");
    }
}
