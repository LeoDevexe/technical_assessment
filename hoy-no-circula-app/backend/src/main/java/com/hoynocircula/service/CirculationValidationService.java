package com.hoynocircula.service;

import com.hoynocircula.dto.CirculationCheckRequestDTO;
import com.hoynocircula.dto.CirculationCheckResponseDTO;
import com.hoynocircula.dto.VehicleResponseDTO;
import com.hoynocircula.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.time.DayOfWeek;
import java.time.LocalDateTime;


@Slf4j
@Service
public class CirculationValidationService {

    private final VehicleService vehicleService;

    public CirculationValidationService(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    public CirculationCheckResponseDTO validateCirculation(CirculationCheckRequestDTO requestDTO) {
        log.info("Validando circulación para placa: {} en fecha: {}",
                requestDTO.getPlate(), requestDTO.getCheckDateTime());

        // Obtener vehículo
        VehicleResponseDTO vehicle = vehicleService.getVehicleByPlate(requestDTO.getPlate());

        // Obtener último dígito de la placa
        String lastDigit = getLastDigitFromPlate(requestDTO.getPlate());

        // Obtener día de la semana
        DayOfWeek dayOfWeek = requestDTO.getCheckDateTime().getDayOfWeek();

        // Validar circulación
        boolean canCirculate = validateCanCirculate(lastDigit, dayOfWeek, requestDTO.getCheckDateTime());

        String restrictionDay = getRestrictionDayForLastDigit(lastDigit);
        String message = buildMessage(canCirculate, restrictionDay, requestDTO.getCheckDateTime());

        return CirculationCheckResponseDTO.builder()
                .vehicle(vehicle)
                .canCirculate(canCirculate)
                .message(message)
                .lastDigitPlate(lastDigit)
                .dayOfWeek(dayOfWeek.toString())
                .restrictionDay(restrictionDay)
                .checkDateTime(requestDTO.getCheckDateTime())
                .build();
    }

    private boolean validateCanCirculate(String lastDigit, DayOfWeek dayOfWeek, LocalDateTime dateTime) {
        // Validar que no sea fin de semana
        if (dayOfWeek == DayOfWeek.SATURDAY || dayOfWeek == DayOfWeek.SUNDAY) {
            return true;
        }

        // Validar horario (6:00 AM - 10:00 PM)
        int hour = dateTime.getHour();
        if (hour < 6 || hour >= 22) {
            return true;
        }

        // Validar restricción del día
        return !isRestrictionDay(lastDigit, dayOfWeek);
    }

    private boolean isRestrictionDay(String lastDigit, DayOfWeek dayOfWeek) {
        return switch (dayOfWeek) {
            case MONDAY -> lastDigit.matches("[12]");
            case TUESDAY -> lastDigit.matches("[34]");
            case WEDNESDAY -> lastDigit.matches("[56]");
            case THURSDAY -> lastDigit.matches("[78]");
            case FRIDAY -> lastDigit.matches("[90]");
            default -> false;
        };
    }

    private String getRestrictionDayForLastDigit(String lastDigit) {
        return switch (lastDigit) {
            case "1", "2" -> "LUNES";
            case "3", "4" -> "MARTES";
            case "5", "6" -> "MIÉRCOLES";
            case "7", "8" -> "JUEVES";
            case "9", "0" -> "VIERNES";
            default -> "DESCONOCIDO";
        };
    }

    private String buildMessage(boolean canCirculate, String restrictionDay, LocalDateTime dateTime) {
        if (canCirculate) {
            int hour = dateTime.getHour();
            if (hour < 6 || hour >= 22) {
                return "Puedes circular. Está fuera del horario de restricción (después de las 22:00 o antes de las 06:00)";
            }
            if (dateTime.getDayOfWeek() == DayOfWeek.SATURDAY || dateTime.getDayOfWeek() == DayOfWeek.SUNDAY) {
                return "Puedes circular. No hay restricción en fin de semana";
            }
            return "Puedes circular sin problemas";
        } else {
            return "No puedes circular. Hoy no circula para placas que terminan en: " + getLastDigitFromNumber(restrictionDay);
        }
    }

    private String getLastDigitFromNumber(String restrictionDay) {
        return switch (restrictionDay) {
            case "LUNES" -> "1 y 2";
            case "MARTES" -> "3 y 4";
            case "MIÉRCOLES" -> "5 y 6";
            case "JUEVES" -> "7 y 8";
            case "VIERNES" -> "9 y 0";
            default -> "desconocido";
        };
    }

    private String getLastDigitFromPlate(String plate) {
        String cleanPlate = plate.replaceAll("[^0-9]", "");
        if (cleanPlate.isEmpty()) {
            throw new BusinessException("INVALID_PLATE", "La placa no contiene dígitos válidos");
        }
        return cleanPlate.substring(cleanPlate.length() - 1);
    }
}
