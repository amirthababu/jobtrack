package com.jobtrack.controller;

import com.jobtrack.entity.JobApplication;
import com.jobtrack.entity.User;
import com.jobtrack.service.JobApplicationService;
import com.jobtrack.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import jakarta.validation.Valid;
@RestController
@RequestMapping("/api/jobs")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;
    private final UserService userService;

    public JobApplicationController(
            JobApplicationService jobApplicationService,
            UserService userService) {

        this.jobApplicationService = jobApplicationService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> createJobApplication(
            Authentication authentication,
            @RequestBody @Valid JobApplication jobApplication) {


        String email = authentication.getName();

        Optional<User> user =
                userService.findByEmail(email);

        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        JobApplication savedApplication =
                jobApplicationService.saveJobApplication(
                        jobApplication,
                        user.get()
                );

        return ResponseEntity.ok(savedApplication);
    }

    @GetMapping
    public ResponseEntity<?> getAllJobApplications(
            Authentication authentication) {

        String email = authentication.getName();

        Optional<User> user =
                userService.findByEmail(email);

        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<JobApplication> applications =
                jobApplicationService.getAllJobApplications(
                        user.get()
                );

        return ResponseEntity.ok(applications);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJobApplicationById(
            Authentication authentication,
            @PathVariable Long id) {

        String email = authentication.getName();

        Optional<User> user =
                userService.findByEmail(email);

        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Optional<JobApplication> application =
                jobApplicationService.getJobApplicationById(
                        id,
                        user.get()
                );

        if (application.isPresent()) {
            return ResponseEntity.ok(application.get());
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateJobApplication(
            Authentication authentication,
            @PathVariable Long id,
            @RequestBody @Valid JobApplication jobApplication) {

        String email = authentication.getName();

        Optional<User> user =
                userService.findByEmail(email);

        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        JobApplication updatedApplication =
                jobApplicationService.updateJobApplication(
                        id,
                        jobApplication,
                        user.get()
                );

        if (updatedApplication != null) {
            return ResponseEntity.ok(updatedApplication);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJobApplication(
            Authentication authentication,
            @PathVariable Long id) {

        String email = authentication.getName();

        Optional<User> user =
                userService.findByEmail(email);

        if (user.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Optional<JobApplication> application =
                jobApplicationService.getJobApplicationById(
                        id,
                        user.get()
                );

        if (application.isPresent()) {

            jobApplicationService.deleteJobApplication(
                    id,
                    user.get()
            );

            return ResponseEntity.ok(
                    "Job application deleted successfully"
            );
        }

        return ResponseEntity.notFound().build();
    }
}