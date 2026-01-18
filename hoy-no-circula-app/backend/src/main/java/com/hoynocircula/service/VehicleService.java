package com.hoynocircula.service;

import com.hoynocircula.domain.Vehicle;
import com.hoynocircula.dto.VehicleRequestDTO;
import com.hoynocircula.dto.VehicleResponseDTO;
import com.hoynocircula.exception.BusinessException;
import com.hoynocircula.repository.VehicleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @Transactional
    public VehicleResponseDTO registerVehicle(VehicleRequestDTO requestDTO) {
        log.info("Registrando vehículo con placa: {}", requestDTO.getPlate());

        // Validar que no exista un vehículo con la misma placa
        if (vehicleRepository.findByPlate(requestDTO.getPlate()).isPresent()) {
            throw new BusinessException("VEHICLE_EXISTS", "Ya existe un vehículo registrado con esta placa");
        }

        // Validar que no exista un vehículo con el mismo chasis
        Vehicle existingByChassis = vehicleRepository.findAll()
                .stream()
                .filter(v -> v.getChassis().equals(requestDTO.getChassis()))
                .findFirst()
                .orElse(null);

        if (existingByChassis != null) {
            throw new BusinessException("CHASSIS_EXISTS", "Ya existe un vehículo registrado con este chasis");
        }

        Vehicle vehicle = Vehicle.builder()
                .plate(requestDTO.getPlate().toUpperCase())
                .color(requestDTO.getColor())
                .model(requestDTO.getModel())
                .chassis(requestDTO.getChassis().toUpperCase())
                .brand(requestDTO.getBrand())
                .year(requestDTO.getYear())
                .type(requestDTO.getType())
                .build();

        Vehicle savedVehicle = vehicleRepository.save(vehicle);
        log.info("Vehículo registrado exitosamente: {}", savedVehicle.getId());

        return mapToResponseDTO(savedVehicle);
    }

    @Transactional(readOnly = true)
    public VehicleResponseDTO getVehicleByPlate(String plate) {
        log.debug("Obteniendo vehículo con placa: {}", plate);

        Vehicle vehicle = vehicleRepository.findByPlate(plate.toUpperCase())
                .orElseThrow(() -> new BusinessException("VEHICLE_NOT_FOUND", "Vehículo no encontrado"));

        return mapToResponseDTO(vehicle);
    }

    @Transactional(readOnly = true)
    public List<VehicleResponseDTO> getAllVehicles() {
        log.debug("Obteniendo todos los vehículos");

        return vehicleRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    private VehicleResponseDTO mapToResponseDTO(Vehicle vehicle) {
        return VehicleResponseDTO.builder()
                .id(vehicle.getId())
                .plate(vehicle.getPlate())
                .color(vehicle.getColor())
                .model(vehicle.getModel())
                .chassis(vehicle.getChassis())
                .brand(vehicle.getBrand())
                .year(vehicle.getYear())
                .type(vehicle.getType())
                .createdAt(vehicle.getCreatedAt())
                .updatedAt(vehicle.getUpdatedAt())
                .build();
    }
}
