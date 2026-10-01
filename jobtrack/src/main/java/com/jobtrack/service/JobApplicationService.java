package com.jobtrack.service;

import com.jobtrack.entity.JobApplication;
import com.jobtrack.entity.User;
import com.jobtrack.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;

    public JobApplicationService(
            JobApplicationRepository jobApplicationRepository) {

        this.jobApplicationRepository = jobApplicationRepository;
    }

    public JobApplication saveJobApplication(
            JobApplication jobApplication,
            User user) {

        jobApplication.setUser(user);

        return jobApplicationRepository.save(jobApplication);
    }

    public List<JobApplication> getAllJobApplications(
            User user) {

        return jobApplicationRepository.findByUser(user);
    }

    public Optional<JobApplication> getJobApplicationById(
            Long id,
            User user) {

        return jobApplicationRepository
                .findByIdAndUser(id, user);
    }

    public JobApplication updateJobApplication(
            Long id,
            JobApplication updatedJobApplication,
            User user) {

        Optional<JobApplication> existingApplication =
                jobApplicationRepository
                        .findByIdAndUser(id, user);

        if (existingApplication.isPresent()) {

            JobApplication application =
                    existingApplication.get();

            application.setCompanyName(
                    updatedJobApplication.getCompanyName());

            application.setJobTitle(
                    updatedJobApplication.getJobTitle());

            application.setJobType(
                    updatedJobApplication.getJobType());

            application.setLocation(
                    updatedJobApplication.getLocation());

            application.setAppliedDate(
                    updatedJobApplication.getAppliedDate());

            application.setJobUrl(
                    updatedJobApplication.getJobUrl());

            application.setStatus(
                    updatedJobApplication.getStatus());

            application.setNotes(
                    updatedJobApplication.getNotes());

            application.setInterviewDate(
                    updatedJobApplication.getInterviewDate());

            application.setInterviewTime(
                    updatedJobApplication.getInterviewTime());

            application.setInterviewRound(
                    updatedJobApplication.getInterviewRound());

            application.setInterviewer(
                    updatedJobApplication.getInterviewer());

            application.setInterviewNotes(
                    updatedJobApplication.getInterviewNotes());

            return jobApplicationRepository.save(application);
        }

        return null;
    }

    public void deleteJobApplication(
            Long id,
            User user) {

        Optional<JobApplication> application =
                jobApplicationRepository
                        .findByIdAndUser(id, user);

        if (application.isPresent()) {
            jobApplicationRepository.delete(application.get());
        }
    }
}