package com.jobtrack.controller;

import com.jobtrack.dto.UserResponse;
import com.jobtrack.entity.User;
import com.jobtrack.security.JwtService;
import com.jobtrack.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> registerUser(@RequestBody User user) {

        User savedUser = userService.saveUser(user);

        UserResponse response = new UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.getPreferredJobRole(),
                savedUser.getSkills()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {

        Optional<User> loggedInUser =
                userService.loginUser(user.getEmail(), user.getPassword());

        if (loggedInUser.isPresent()) {

            User loggedUser = loggedInUser.get();

            String token = jwtService.generateToken(loggedUser.getEmail());

            UserResponse response = new UserResponse(
                    loggedUser.getId(),
                    loggedUser.getName(),
                    loggedUser.getEmail(),
                    loggedUser.getRole(),
                    loggedUser.getPreferredJobRole(),
                    loggedUser.getSkills()
            );

            return ResponseEntity.ok(
                    new LoginResponse(response, token)
            );
        }

        return ResponseEntity.status(401)
                .body("Invalid email or password");
    }
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(
            Authentication authentication) {

        String email = authentication.getName();

        Optional<User> user =
                userService.findByEmail(email);

        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        User loggedUser = user.get();

        UserResponse response = new UserResponse(
                loggedUser.getId(),
                loggedUser.getName(),
                loggedUser.getEmail(),
                loggedUser.getRole(),
                loggedUser.getPreferredJobRole(),
                loggedUser.getSkills()
        );

        return ResponseEntity.ok(response);
    }

    public static class LoginResponse {

        private UserResponse user;
        private String token;

        public LoginResponse(UserResponse user, String token) {
            this.user = user;
            this.token = token;
        }

        public UserResponse getUser() {
            return user;
        }

        public String getToken() {
            return token;
        }
    }
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            Authentication authentication,
            @RequestBody User updatedUser) {

        String email = authentication.getName();

        Optional<User> updatedProfile =
                userService.updateProfile(
                        email,
                        updatedUser
                );

        if (updatedProfile.isPresent()) {

            User user = updatedProfile.get();

            UserResponse response = new UserResponse(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getRole(),
                    user.getPreferredJobRole(),
                    user.getSkills()
            );

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.notFound().build();
    }

}