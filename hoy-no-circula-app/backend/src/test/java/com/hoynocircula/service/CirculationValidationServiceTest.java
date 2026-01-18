package com.hoynocircula.service;

import com.hoynocircula.dto.CirculationCheckRequestDTO;
import com.hoynocircula.dto.CirculationCheckResponseDTO;
import com.hoynocircula.dto.VehicleResponseDTO;
import com.hoynocircula.exception.BusinessException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CirculationValidationServiceTest {

    @Mock
    private VehicleService vehicleService;

    @InjectMocks
    private CirculationValidationService circulationValidationService;

    private VehicleResponseDTO testVehicle;

    @BeforeEach
    void setUp() {
        testVehicle = VehicleResponseDTO.builder()
                .id(1L)
                .plate("ABC123")
                .color("ROJO")
                .model("SEDAN")
                .chassis("CH123456")
                .build();
    }

    @Test
    void testCanCirculateOutsideRestrictionHours() {
        // Arrange - Viernes a las 23:00 (placa termina en 9, pero está fuera del horario)
        // 2 de enero de 2026 es viernes
        LocalDateTime dateTime = LocalDateTime.of(2026, 1, 2, 23, 0); // Friday 11 PM
        CirculationCheckRequestDTO request = CirculationCheckRequestDTO.builder()
                .plate("ABC129")
                .checkDateTime(dateTime)
                .build();

        when(vehicleService.getVehicleByPlate("ABC129")).thenReturn(testVehicle);

        // Act
        CirculationCheckResponseDTO response = circulationValidationService.validateCirculation(request);

        // Assert
        assertTrue(response.isCanCirculate());
        assertTrue(response.getMessage().contains("fuera del horario"));
    }

    @Test
    void testCannotCirculateMondayWithRestrictionPlate() {
        // Arrange - Lunes a las 09:00 (placa termina en 1)
        // 5 de enero de 2026 es lunes
        LocalDateTime dateTime = LocalDateTime.of(2026, 1, 5, 9, 0); // Monday 9 AM
        CirculationCheckRequestDTO request = CirculationCheckRequestDTO.builder()
                .plate("ABC121")
                .checkDateTime(dateTime)
                .build();

        when(vehicleService.getVehicleByPlate("ABC121")).thenReturn(testVehicle);

        // Act
        CirculationCheckResponseDTO response = circulationValidationService.validateCirculation(request);

        // Assert
        assertFalse(response.isCanCirculate());
        assertTrue(response.getMessage().contains("No puedes circular"));
    }

    @Test
    void testCanCirculateOnWeekend() {
        // Arrange - Sábado a las 09:00
        // 4 de enero de 2026 es sábado
        LocalDateTime dateTime = LocalDateTime.of(2026, 1, 4, 9, 0); // Saturday 9 AM
        CirculationCheckRequestDTO request = CirculationCheckRequestDTO.builder()
                .plate("ABC121")
                .checkDateTime(dateTime)
                .build();

        when(vehicleService.getVehicleByPlate("ABC121")).thenReturn(testVehicle);

        // Act
        CirculationCheckResponseDTO response = circulationValidationService.validateCirculation(request);

        // Assert
        assertTrue(response.isCanCirculate());
        assertTrue(response.getMessage().contains("fin de semana"));
    }

    @Test
    void testVehicleNotFoundThrowsException() {
        // Arrange
        CirculationCheckRequestDTO request = CirculationCheckRequestDTO.builder()
                .plate("XYZ999")
                .checkDateTime(LocalDateTime.now().plusHours(1))
                .build();

        when(vehicleService.getVehicleByPlate("XYZ999"))
                .thenThrow(new BusinessException("VEHICLE_NOT_FOUND", "Vehículo no encontrado"));

        // Act & Assert
        assertThrows(BusinessException.class, () -> circulationValidationService.validateCirculation(request));
    }
}
