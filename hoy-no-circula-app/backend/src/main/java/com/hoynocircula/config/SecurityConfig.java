package com.hoynocircula.config;

import com.hoynocircula.security.ApiKeyAuthenticationFilter;
import com.hoynocircula.security.ApiKeyProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

//Configuración de seguridad con API Key
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    private final ApiKeyProvider apiKeyProvider;
    
    public SecurityConfig(ApiKeyProvider apiKeyProvider) {
        this.apiKeyProvider = apiKeyProvider;
    }
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {}) // CORS ya está configurado en CorsConfig
            .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/swagger-ui.html",
                    "/swagger-ui/**",
                    "/v3/api-docs/**",
                    "/v3/api-docs.yaml",
                    "/api-docs/**"
                ).permitAll()
                // Health check sin autenticación
                .requestMatchers("/api/v1/info/health").permitAll()
                // H2 Console (solo desarrollo)
                .requestMatchers("/h2-console", "/h2-console/**").permitAll()
                // LUEGO las rutas generales - Requerir API Key para todas las rutas /api/**
                .requestMatchers("/api/**").authenticated()
                // El resto requiere autenticación
                .anyRequest().authenticated()
            )
            .addFilterBefore(
                new ApiKeyAuthenticationFilter(apiKeyProvider),
                UsernamePasswordAuthenticationFilter.class
            );
        
        return http.build();
    }
}
