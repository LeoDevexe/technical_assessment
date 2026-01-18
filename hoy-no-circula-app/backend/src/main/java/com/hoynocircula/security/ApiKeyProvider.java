package com.hoynocircula.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.HashSet;
import java.util.Set;

@Component
public class ApiKeyProvider {
    
    @Value("${app.api.keys:dev-api-key-12345,prod-api-key-secure-key,mobile-app-key-2024,frontend-web-key-2024}")
    private String apiKeysConfig;
    
    private Set<String> validApiKeys;
    
    private Set<String> getValidApiKeys() {
        if (validApiKeys == null) {
            validApiKeys = new HashSet<>();
            String[] keys = apiKeysConfig.split(",");
            for (String key : keys) {
                validApiKeys.add(key.trim());
            }
        }
        return validApiKeys;
    }
    
    public boolean isValidApiKey(String apiKey) {
        return apiKey != null && getValidApiKeys().contains(apiKey.trim());
    }
    
    public Set<String> getValidApiKeysSet() {
        return new HashSet<>(getValidApiKeys());
    }
}
