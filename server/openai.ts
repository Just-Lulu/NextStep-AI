import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface SkillAssessmentResult {
  skills: {
    name: string;
    level: number;
    recommendations: string[];
  }[];
  topCareerMatches: {
    title: string;
    matchPercentage: number;
    description: string;
    requiredSkills: string[];
    salaryRange: string;
    demandStatus: string;
  }[];
}

export async function generateCareerRecommendations(
  skills: string[],
  interests: string[],
  academicBackground: {
    courses: string[];
    projects: string[];
    achievements: string[];
  }
): Promise<SkillAssessmentResult> {
  try {
    const prompt = `
      I need career recommendations based on the following information about a student from Adeleke University:
      
      Skills: ${skills.join(", ")}
      Interests: ${interests.join(", ")}
      Academic Background:
        - Courses: ${academicBackground.courses.join(", ")}
        - Projects: ${academicBackground.projects.join(", ")}
        - Achievements: ${academicBackground.achievements.join(", ")}
      
      Based on this information, please provide:
      1. A skill assessment with skill levels (as percentages) and specific recommendations to improve each skill
      2. Top career matches with match percentages, descriptions, required skills, salary ranges (in Naira ₦), and demand status
      
      Return your analysis in the following JSON format:
      {
        "skills": [
          {
            "name": "skill name",
            "level": percentage (0-100),
            "recommendations": ["recommendation 1", "recommendation 2"]
          }
        ],
        "topCareerMatches": [
          {
            "title": "career title",
            "matchPercentage": percentage (0-100),
            "description": "brief job description",
            "requiredSkills": ["skill 1", "skill 2"],
            "salaryRange": "₦X.XM - ₦Y.YM",
            "demandStatus": "High/Growing/Stable"
          }
        ]
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content) as SkillAssessmentResult;
  } catch (error) {
    console.error("Error generating career recommendations:", error);
    throw new Error("Failed to generate career recommendations");
  }
}

export async function analyzeSkillGap(
  currentSkills: string[],
  targetCareer: string
): Promise<{
  skills: { name: string; level: number; importance: number }[];
  resources: { title: string; type: string; description: string; link: string }[];
}> {
  try {
    const prompt = `
      I need to analyze the skill gap between a student's current skills and their target career:
      
      Current Skills: ${currentSkills.join(", ")}
      Target Career: ${targetCareer}
      
      Please provide:
      1. A skill gap analysis showing the student's current level in key skills needed for this career (as percentages)
      2. The importance of each skill for the target career (as a number from 1-10)
      3. Recommended learning resources to improve each skill
      
      Return your analysis in the following JSON format:
      {
        "skills": [
          {
            "name": "skill name",
            "level": percentage (0-100),
            "importance": number (1-10)
          }
        ],
        "resources": [
          {
            "title": "resource title",
            "type": "course/book/tutorial",
            "description": "brief description of the resource",
            "link": "example.com/resource"
          }
        ]
      }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (error) {
    console.error("Error analyzing skill gap:", error);
    throw new Error("Failed to analyze skill gap");
  }
}
