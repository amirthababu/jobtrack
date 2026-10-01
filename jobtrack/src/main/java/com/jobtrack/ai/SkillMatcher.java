package com.jobtrack.ai;

import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class SkillMatcher {

    private final List<String> supportedSkills = Arrays.asList(
            "java",
            "spring",
            "spring boot",
            "springboot",
            "mysql",
            "mongodb",
            "react",
            "react.js",
            "javascript",
            "html",
            "css",
            "bootstrap",
            "python",
            "c",
            "c++",
            "git",
            "github",
            "docker",
            "kubernetes",
            "rest api",
            "rest",
            "microservices",
            "hibernate",
            "jpa",
            "sql",
            "aws",
            "azure",
            "machine learning",
            "artificial intelligence",
            "ai",
            "data structures",
            "oops"
    );

    public Map<String, Object> analyze(
            String profileSkills,
            String jobDescription) {

        Set<String> userSkills =
                extractSkills(profileSkills);

        Set<String> jobSkills =
                extractSkills(jobDescription);

        Set<String> matchedSkills =
                new LinkedHashSet<>(userSkills);

        matchedSkills.retainAll(jobSkills);

        Set<String> missingSkills =
                new LinkedHashSet<>(jobSkills);

        missingSkills.removeAll(userSkills);

        int totalRequiredSkills =
                jobSkills.size();

        int matchedCount =
                matchedSkills.size();

        int matchPercentage = 0;

        if (totalRequiredSkills > 0) {

            matchPercentage =
                    (matchedCount * 100)
                            / totalRequiredSkills;
        }

        Map<String, Object> result =
                new LinkedHashMap<>();

        result.put(
                "matchedSkills",
                matchedSkills
        );

        result.put(
                "missingSkills",
                missingSkills
        );

        result.put(
                "matchPercentage",
                matchPercentage
        );

        return result;
    }

    private Set<String> extractSkills(String text) {

        Set<String> skills =
                new LinkedHashSet<>();

        if (text == null ||
                text.trim().isEmpty()) {

            return skills;
        }

        String normalizedText =
                text.toLowerCase();

        for (String skill : supportedSkills) {

            if (normalizedText.contains(skill)) {

                skills.add(skill);
            }
        }

        return skills;
    }
}