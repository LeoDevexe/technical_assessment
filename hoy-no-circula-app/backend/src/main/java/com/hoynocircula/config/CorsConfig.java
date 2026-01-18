package com.hoynocircula.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                // URLs de desarrollo
                .allowedOrigins(
                    "http://localhost:3000",
                    "http://localhost:3001",
                    "http://localhost:4200",
                    "http://localhost:5173",
                    // URLs de producción
                    "https://technical-assessment-1-m4g7.onrender.com"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
