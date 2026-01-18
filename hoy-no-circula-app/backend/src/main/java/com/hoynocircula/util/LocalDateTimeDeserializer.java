package com.hoynocircula.util;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;

public class LocalDateTimeDeserializer extends JsonDeserializer<LocalDateTime> {

    private static final DateTimeFormatter[] FORMATTERS = {
            DateTimeFormatter.ISO_DATE_TIME,  
            DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"), 
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")   
    };

    @Override
    public LocalDateTime deserialize(JsonParser jsonParser, DeserializationContext ctxt)
            throws IOException {
        String date = jsonParser.getText();
        
        for (DateTimeFormatter formatter : FORMATTERS) {
            try {
                TemporalAccessor ta = formatter.parseBest(date, LocalDateTime::from, java.time.Instant::from);
                if (ta instanceof LocalDateTime) {
                    return (LocalDateTime) ta;
                } else if (ta instanceof java.time.Instant) {
                    return ((java.time.Instant) ta).atZone(java.time.ZoneId.of("America/Guayaquil")).toLocalDateTime();
                }
            } catch (Exception e) {
                
            }
        }
        
        throw new com.fasterxml.jackson.databind.exc.InvalidFormatException(
                jsonParser, 
                "Formato de fecha inválido. Use: yyyy-MM-dd'T'HH:mm:ss o yyyy-MM-dd HH:mm:ss",
                date,
                LocalDateTime.class
        );
    }
}
