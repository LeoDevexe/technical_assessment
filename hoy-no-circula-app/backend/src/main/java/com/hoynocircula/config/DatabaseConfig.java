package com.hoynocircula.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;

@Configuration
@Profile("prod")
public class DatabaseConfig {

    @Bean
    @Primary
    public DataSource dataSource() {
        // Obtener DATABASE_URL de Render (puede tener formato postgresql:// o jdbc:postgresql://)
        String databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl == null || databaseUrl.isEmpty()) {
            databaseUrl = System.getenv("SPRING_DATASOURCE_URL");
        }

        if (databaseUrl != null && !databaseUrl.isEmpty()) {
            // Normalizar: agregar jdbc: si no está
            if (!databaseUrl.startsWith("jdbc:")) {
                databaseUrl = "jdbc:" + databaseUrl;
            }
            
            // Si la URL contiene credenciales embebidas, extraerlas
            // Formato: jdbc:postgresql://user:password@host:port/database
            if (databaseUrl.contains("@") && databaseUrl.startsWith("jdbc:postgresql://")) {
                try {
                    String urlWithoutJdbc = databaseUrl.substring("jdbc:postgresql://".length());
                    
                    if (urlWithoutJdbc.contains("@")) {
                        String[] parts = urlWithoutJdbc.split("@", 2);
                        String credentials = parts[0];
                        String hostAndDb = parts[1];
                        
                        if (credentials.contains(":")) {
                            String[] creds = credentials.split(":", 2);
                            String username = creds[0];
                            String password = creds.length > 1 ? creds[1] : "";
                            
                            // Construir URL limpia sin credenciales
                            String cleanUrl = "jdbc:postgresql://" + hostAndDb;
                            
                            return DataSourceBuilder.create()
                                    .url(cleanUrl)
                                    .username(username)
                                    .password(password)
                                    .driverClassName("org.postgresql.Driver")
                                    .build();
                        }
                    }
                } catch (Exception e) {
                    // Si falla, continuar con variables separadas
                }
            }
            
            // Usar variables de entorno separadas si no hay credenciales embebidas
            String username = System.getenv("SPRING_DATASOURCE_USERNAME");
            if (username == null || username.isEmpty()) {
                username = System.getenv("DATABASE_USERNAME");
            }
            
            String password = System.getenv("SPRING_DATASOURCE_PASSWORD");
            if (password == null || password.isEmpty()) {
                password = System.getenv("DATABASE_PASSWORD");
            }
            
            return DataSourceBuilder.create()
                    .url(databaseUrl)
                    .username(username != null ? username : "postgres")
                    .password(password != null ? password : "postgres")
                    .driverClassName("org.postgresql.Driver")
                    .build();
        }
        
        // Fallback a valores por defecto
        String username = System.getenv("SPRING_DATASOURCE_USERNAME");
        String password = System.getenv("SPRING_DATASOURCE_PASSWORD");
        
        return DataSourceBuilder.create()
                .url("jdbc:postgresql://localhost:5432/hoy_no_circula")
                .username(username != null ? username : "postgres")
                .password(password != null ? password : "postgres")
                .driverClassName("org.postgresql.Driver")
                .build();
    }
}
