package com.hoynocircula;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class HoyNocirculaApplication {

    public static void main(String[] args) {
        SpringApplication.run(HoyNocirculaApplication.class, args);
    }

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Hoy No Circula API")
                        .version("1.0.0")
                        .description("REST API para validación de circulación de vehículos")
                        .contact(new Contact()
                                .name("Technical Assessment")
                                .url("https://github.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0.html")));
    }
}
