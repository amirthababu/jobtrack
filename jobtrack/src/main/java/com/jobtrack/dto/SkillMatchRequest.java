package com.jobtrack.dto;

public class SkillMatchRequest {

    private String profileSkills;
    private String jobDescription;

    public SkillMatchRequest() {
    }

    public String getProfileSkills() {
        return profileSkills;
    }

    public void setProfileSkills(String profileSkills) {
        this.profileSkills = profileSkills;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }
}