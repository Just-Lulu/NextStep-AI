const OpenAI = require("openai");

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Generate career recommendations based on skills, interests, and academic background
async function generateCareerRecommendations(skills, interests, academicBackground) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `You are a career advisor specializing in helping university students identify suitable career paths. 
          Analyze the student's skills, interests, and academic background to suggest the top 5 career matches.
          Format your response as JSON with the following structure:
          {
            "topCareerMatches": [
              {
                "title": "Career Title",
                "matchPercentage": 85,
                "description": "Brief description of the career",
                "requiredSkills": ["Skill 1", "Skill 2", "Skill 3"],
                "salaryRange": "Salary range in USD",
                "demandStatus": "High demand / Growing / Stable / Declining"
              }
            ]
          }`
        },
        {
          role: "user",
          content: `Please suggest career paths based on the following information:
          Skills: ${Array.isArray(skills) ? skills.join(", ") : skills}
          Interests: ${Array.isArray(interests) ? interests.join(", ") : interests}
          Academic Background: ${typeof academicBackground === 'object' ? JSON.stringify(academicBackground) : academicBackground}`
        }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the JSON response
    const result = JSON.parse(response.choices[0].message.content);
    
    // Sort career matches by match percentage in descending order
    result.topCareerMatches = result.topCareerMatches.sort((a, b) => 
      b.matchPercentage - a.matchPercentage
    );
    
    return result;
  } catch (error) {
    console.error("Error generating career recommendations:", error);
    throw new Error("Failed to generate career recommendations. Please try again later.");
  }
}

// Analyze the skill gap between current skills and target career
async function analyzeSkillGap(currentSkills, targetCareer) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: `You are a career development advisor specializing in identifying skill gaps for specific careers.
          Analyze the student's current skills and the target career to identify missing skills and provide recommendations.
          Format your response as JSON with the following structure:
          {
            "targetCareer": "Career Title",
            "missingSkills": [
              {
                "skill": "Skill Name",
                "importanceLevel": "High/Medium/Low",
                "recommendedResources": [
                  {
                    "type": "Course/Book/Website/Tool",
                    "title": "Resource Title",
                    "link": "URL or reference"
                  }
                ]
              }
            ],
            "timeEstimate": "Estimated time to acquire missing skills",
            "additionalAdvice": "General advice for pursuing this career"
          }`
        },
        {
          role: "user",
          content: `Please analyze the skill gap for the following:
          Current Skills: ${Array.isArray(currentSkills) ? currentSkills.join(", ") : currentSkills}
          Target Career: ${targetCareer}`
        }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the JSON response
    const result = JSON.parse(response.choices[0].message.content);
    
    // Sort missing skills by importance level (High > Medium > Low)
    const importancePriority = { "High": 3, "Medium": 2, "Low": 1 };
    result.missingSkills = result.missingSkills.sort((a, b) => 
      importancePriority[b.importanceLevel] - importancePriority[a.importanceLevel]
    );
    
    return result;
  } catch (error) {
    console.error("Error analyzing skill gap:", error);
    throw new Error("Failed to analyze skill gap. Please try again later.");
  }
}

module.exports = {
  generateCareerRecommendations,
  analyzeSkillGap
};