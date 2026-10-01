package com.jobtrack.controller;

import com.jobtrack.ai.SkillMatcher;
import com.jobtrack.dto.SkillMatchRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class SkillMatchController {

    private final SkillMatcher skillMatcher;

    public SkillMatchController(SkillMatcher skillMatcher) {
        this.skillMatcher = skillMatcher;
    }

    @PostMapping("/skill-match")
    public ResponseEntity<Map<String, Object>> analyzeSkills(
            @RequestBody SkillMatchRequest request) {

        Map<String, Object> result =
                skillMatcher.analyze(
                        request.getProfileSkills(),
                        request.getJobDescription()
                );

        return ResponseEntity.ok(result);
    }
}