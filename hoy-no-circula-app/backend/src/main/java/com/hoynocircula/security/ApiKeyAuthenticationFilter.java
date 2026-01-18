package com.hoynocircula.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.io.IOException;

public class ApiKeyAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private static final String API_KEY_HEADER = "X-API-Key";
    private final ApiKeyProvider apiKeyProvider;

    public ApiKeyAuthenticationFilter(ApiKeyProvider apiKeyProvider) {
        super(new AntPathRequestMatcher("/api/**"));
        this.apiKeyProvider = apiKeyProvider;
        setAuthenticationManager(new AuthenticationManager() {
            @Override
            public Authentication authenticate(Authentication authentication) {
                return authentication;
            }
        });
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String apiKey = request.getHeader(API_KEY_HEADER);
        
        if (apiKey == null || apiKey.isEmpty()) {
            throw new ApiKeyException("API Key no proporcionada en el header X-API-Key");
        }
        
        if (!apiKeyProvider.isValidApiKey(apiKey)) {
            throw new ApiKeyException("API Key inválida o expirada");
        }
        
        return new UsernamePasswordAuthenticationToken(
            apiKey, 
            null, 
            java.util.Collections.emptyList()
        );
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest request, 
            HttpServletResponse response, 
            FilterChain chain, 
            Authentication authResult) throws IOException, ServletException {
        
        SecurityContextHolder.getContext().setAuthentication(authResult);
        chain.doFilter(request, response);
    }

    @Override
    protected void unsuccessfulAuthentication(
            HttpServletRequest request, 
            HttpServletResponse response, 
            AuthenticationException failed) throws IOException, ServletException {
        
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"" + failed.getMessage() + "\"}");
    }
}
