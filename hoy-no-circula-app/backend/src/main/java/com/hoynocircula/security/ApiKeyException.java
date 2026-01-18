package com.hoynocircula.security;

public class ApiKeyException extends org.springframework.security.core.AuthenticationException {
    
    public ApiKeyException(String message) {
        super(message);
    }
    
    public ApiKeyException(String message, Throwable cause) {
        super(message, cause);
    }
}
