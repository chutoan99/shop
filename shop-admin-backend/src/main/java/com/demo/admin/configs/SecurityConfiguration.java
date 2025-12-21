package com.demo.admin.configs;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class SecurityConfiguration {
        private final AuthenticationProvider _authenticationProvider;
        private final JwtAuthenticationFilter _jwtAuthenticationFilter;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http.csrf(AbstractHttpConfigurer::disable)
                                .authorizeHttpRequests(authz -> authz
                                        .requestMatchers("/auth/**", "/accounts-trial")
                                        .permitAll()
                                        .anyRequest()
                                        .authenticated()
                                )
                                .sessionManagement(session -> session
                                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                                )
                                .authenticationProvider(_authenticationProvider)
                                .addFilterBefore(_jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }
}
