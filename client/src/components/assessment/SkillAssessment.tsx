import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AssessmentItem from './AssessmentItem';

// Define the form schema
const technicalAssessmentSchema = z.object({
  programmingExperience: z.string(),
  databaseKnowledge: z.string(),
  webDevelopment: z.string(),
  problemSolving: z.string(),
  algorithmKnowledge: z.string(),
  mathProficiency: z.string(),
  dataAnalysis: z.string(),
  softwareEngineering: z.string(),
  cloudComputing: z.string(),
  systemDesign: z.string(),
});

const softSkillsAssessmentSchema = z.object({
  communication: z.string(),
  teamwork: z.string(),
  leadership: z.string(),
  timeManagement: z.string(),
  adaptability: z.string(),
  criticalThinking: z.string(),
  creativity: z.string(),
  emotionalIntelligence: z.string(),
  conflictResolution: z.string(),
  presentationSkills: z.string(),
});

const careerPreferenceSchema = z.object({
  workEnvironment: z.string(),
  jobStability: z.string(),
  workLifeBalance: z.string(),
  salary: z.string(),
  careerGrowth: z.string(),
  location: z.string(),
  companySize: z.string(),
  teamSize: z.string(),
  industryPreference: z.string(),
  remoteWork: z.string(),
});

// Combined schema type
type AssessmentFormValues = 
  | z.infer<typeof technicalAssessmentSchema> 
  | z.infer<typeof softSkillsAssessmentSchema>
  | z.infer<typeof careerPreferenceSchema>;

interface SkillAssessmentProps {
  type: 'technical' | 'soft' | 'career';
  userId: number;
  onComplete?: (results: any) => void;
}

const SkillAssessment: React.FC<SkillAssessmentProps> = ({ 
  type,
  userId,
  onComplete
}) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(10);

  // Get the correct schema based on assessment type
  const getSchema = () => {
    switch (type) {
      case 'technical':
        return technicalAssessmentSchema;
      case 'soft':
        return softSkillsAssessmentSchema;
      case 'career':
        return careerPreferenceSchema;
      default:
        return technicalAssessmentSchema;
    }
  };

  // Get title and description based on assessment type
  const getDetails = () => {
    switch (type) {
      case 'technical':
        return {
          title: 'Technical Skills Assessment',
          description: 'Evaluate your technical skills to help us recommend suitable career paths.'
        };
      case 'soft':
        return {
          title: 'Soft Skills Assessment',
          description: 'Evaluate your interpersonal and communication skills for career recommendations.'
        };
      case 'career':
        return {
          title: 'Career Preference Assessment',
          description: 'Help us understand your work preferences to match you with suitable career options.'
        };
      default:
        return {
          title: 'Skills Assessment',
          description: 'Complete this assessment to receive personalized career recommendations.'
        };
    }
  };

  // Initialize the form with default values
  const form = useForm<AssessmentFormValues>({
    resolver: zodResolver(getSchema()),
    defaultValues: {},
  });

  // Setup mutation for submitting assessment
  const mutation = useMutation({
    mutationFn: async (values: AssessmentFormValues) => {
      // First record the assessment
      await apiRequest('POST', '/api/assessments', {
        userId,
        title: getDetails().title,
        type,
        description: getDetails().description,
        date: new Date().toISOString(),
        duration: 30,
        status: 'completed'
      });
      
      // Then get AI-powered recommendations based on assessment
      const response = await apiRequest('POST', '/api/ai/career-recommendations', {
        skills: Object.entries(values).map(([skill, level]) => skill),
        interests: [],
        academicBackground: {
          courses: [],
          projects: [],
          achievements: []
        }
      });
      
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Assessment Completed",
        description: "Your assessment has been successfully submitted.",
        variant: "default",
      });
      
      // Call the onComplete callback with the results if provided
      if (onComplete) {
        onComplete(data);
      }
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your assessment.",
        variant: "destructive",
      });
    },
  });

  // Get questions based on assessment type
  const getQuestions = () => {
    switch (type) {
      case 'technical':
        return [
          {
            id: 'programmingExperience',
            question: 'How would you rate your programming experience?',
            options: [
              { value: '1', label: 'No experience' },
              { value: '2', label: 'Beginner' },
              { value: '3', label: 'Intermediate' },
              { value: '4', label: 'Advanced' },
              { value: '5', label: 'Expert' },
            ]
          },
          {
            id: 'databaseKnowledge',
            question: 'How familiar are you with database systems?',
            options: [
              { value: '1', label: 'No knowledge' },
              { value: '2', label: 'Basic understanding' },
              { value: '3', label: 'Moderate experience' },
              { value: '4', label: 'Advanced knowledge' },
              { value: '5', label: 'Expert level' },
            ]
          },
          {
            id: 'webDevelopment',
            question: 'Rate your web development skills:',
            options: [
              { value: '1', label: 'No experience' },
              { value: '2', label: 'Basic HTML/CSS' },
              { value: '3', label: 'Frontend frameworks' },
              { value: '4', label: 'Full-stack development' },
              { value: '5', label: 'Advanced full-stack with DevOps' },
            ]
          },
          {
            id: 'problemSolving',
            question: 'How would you rate your problem-solving abilities?',
            options: [
              { value: '1', label: 'Basic' },
              { value: '2', label: 'Developing' },
              { value: '3', label: 'Good' },
              { value: '4', label: 'Very good' },
              { value: '5', label: 'Excellent' },
            ]
          },
          {
            id: 'algorithmKnowledge',
            question: 'How well do you understand algorithms and data structures?',
            options: [
              { value: '1', label: 'Minimal understanding' },
              { value: '2', label: 'Basic concepts' },
              { value: '3', label: 'Good understanding' },
              { value: '4', label: 'Advanced knowledge' },
              { value: '5', label: 'Expert level' },
            ]
          },
          {
            id: 'mathProficiency',
            question: 'Rate your proficiency in mathematics:',
            options: [
              { value: '1', label: 'Basic' },
              { value: '2', label: 'Intermediate' },
              { value: '3', label: 'Advanced' },
              { value: '4', label: 'Very advanced' },
              { value: '5', label: 'Expert' },
            ]
          },
          {
            id: 'dataAnalysis',
            question: 'How experienced are you with data analysis?',
            options: [
              { value: '1', label: 'No experience' },
              { value: '2', label: 'Basic data handling' },
              { value: '3', label: 'Moderate experience' },
              { value: '4', label: 'Advanced analysis techniques' },
              { value: '5', label: 'Expert data scientist' },
            ]
          },
          {
            id: 'softwareEngineering',
            question: 'How familiar are you with software engineering principles?',
            options: [
              { value: '1', label: 'Not familiar' },
              { value: '2', label: 'Basic understanding' },
              { value: '3', label: 'Moderate knowledge' },
              { value: '4', label: 'Well-versed' },
              { value: '5', label: 'Expert knowledge' },
            ]
          },
          {
            id: 'cloudComputing',
            question: 'Rate your experience with cloud computing:',
            options: [
              { value: '1', label: 'No experience' },
              { value: '2', label: 'Basic understanding' },
              { value: '3', label: 'Some practical experience' },
              { value: '4', label: 'Advanced knowledge' },
              { value: '5', label: 'Expert level' },
            ]
          },
          {
            id: 'systemDesign',
            question: 'How would you rate your system design abilities?',
            options: [
              { value: '1', label: 'Minimal' },
              { value: '2', label: 'Basic' },
              { value: '3', label: 'Moderate' },
              { value: '4', label: 'Advanced' },
              { value: '5', label: 'Expert' },
            ]
          }
        ];
      case 'soft':
        return [
          {
            id: 'communication',
            question: 'How would you rate your communication skills?',
            options: [
              { value: '1', label: 'Poor' },
              { value: '2', label: 'Fair' },
              { value: '3', label: 'Good' },
              { value: '4', label: 'Very good' },
              { value: '5', label: 'Excellent' },
            ]
          },
          {
            id: 'teamwork',
            question: 'How well do you work in teams?',
            options: [
              { value: '1', label: 'Prefer working alone' },
              { value: '2', label: 'Can work in teams if needed' },
              { value: '3', label: 'Comfortable in teams' },
              { value: '4', label: 'Enjoy collaborative work' },
              { value: '5', label: 'Thrive in team environments' },
            ]
          },
          {
            id: 'leadership',
            question: 'How would you rate your leadership abilities?',
            options: [
              { value: '1', label: 'Not a leader' },
              { value: '2', label: 'Developing leadership skills' },
              { value: '3', label: 'Comfortable leading small teams' },
              { value: '4', label: 'Strong leader' },
              { value: '5', label: 'Natural leader in all situations' },
            ]
          },
          {
            id: 'timeManagement',
            question: 'How well do you manage your time?',
            options: [
              { value: '1', label: 'Often miss deadlines' },
              { value: '2', label: 'Occasionally miss deadlines' },
              { value: '3', label: 'Usually meet deadlines' },
              { value: '4', label: 'Good at prioritizing tasks' },
              { value: '5', label: 'Excellent time management' },
            ]
          },
          {
            id: 'adaptability',
            question: 'How adaptable are you to change?',
            options: [
              { value: '1', label: 'Resist change' },
              { value: '2', label: 'Accept change with difficulty' },
              { value: '3', label: 'Moderately adaptable' },
              { value: '4', label: 'Adapt well to change' },
              { value: '5', label: 'Embrace and thrive on change' },
            ]
          },
          {
            id: 'criticalThinking',
            question: 'How would you rate your critical thinking skills?',
            options: [
              { value: '1', label: 'Basic' },
              { value: '2', label: 'Developing' },
              { value: '3', label: 'Good' },
              { value: '4', label: 'Very good' },
              { value: '5', label: 'Excellent' },
            ]
          },
          {
            id: 'creativity',
            question: 'How creative do you consider yourself?',
            options: [
              { value: '1', label: 'Not creative' },
              { value: '2', label: 'Somewhat creative' },
              { value: '3', label: 'Moderately creative' },
              { value: '4', label: 'Very creative' },
              { value: '5', label: 'Extremely creative' },
            ]
          },
          {
            id: 'emotionalIntelligence',
            question: 'How would you rate your emotional intelligence?',
            options: [
              { value: '1', label: 'Low awareness' },
              { value: '2', label: 'Basic awareness' },
              { value: '3', label: 'Moderate EQ' },
              { value: '4', label: 'High EQ' },
              { value: '5', label: 'Exceptional EQ' },
            ]
          },
          {
            id: 'conflictResolution',
            question: 'How well do you handle conflicts?',
            options: [
              { value: '1', label: 'Avoid conflicts' },
              { value: '2', label: 'Struggle with conflicts' },
              { value: '3', label: 'Can manage basic conflicts' },
              { value: '4', label: 'Good at resolving conflicts' },
              { value: '5', label: 'Excel at conflict resolution' },
            ]
          },
          {
            id: 'presentationSkills',
            question: 'How comfortable are you with public speaking and presentations?',
            options: [
              { value: '1', label: 'Very uncomfortable' },
              { value: '2', label: 'Uncomfortable but can do it' },
              { value: '3', label: 'Moderately comfortable' },
              { value: '4', label: 'Comfortable' },
              { value: '5', label: 'Very comfortable and skilled' },
            ]
          }
        ];
      case 'career':
        return [
          {
            id: 'workEnvironment',
            question: 'What type of work environment do you prefer?',
            options: [
              { value: 'structured', label: 'Highly structured' },
              { value: 'somewhat-structured', label: 'Somewhat structured' },
              { value: 'balanced', label: 'Balance of structure and flexibility' },
              { value: 'somewhat-flexible', label: 'Somewhat flexible' },
              { value: 'flexible', label: 'Highly flexible' },
            ]
          },
          {
            id: 'jobStability',
            question: 'How important is job stability to you?',
            options: [
              { value: 'not-important', label: 'Not important' },
              { value: 'slightly-important', label: 'Slightly important' },
              { value: 'moderately-important', label: 'Moderately important' },
              { value: 'very-important', label: 'Very important' },
              { value: 'essential', label: 'Essential' },
            ]
          },
          {
            id: 'workLifeBalance',
            question: 'How important is work-life balance to you?',
            options: [
              { value: 'not-important', label: 'Not important' },
              { value: 'slightly-important', label: 'Slightly important' },
              { value: 'moderately-important', label: 'Moderately important' },
              { value: 'very-important', label: 'Very important' },
              { value: 'essential', label: 'Essential' },
            ]
          },
          {
            id: 'salary',
            question: 'How important is a high salary to you?',
            options: [
              { value: 'not-important', label: 'Not important' },
              { value: 'slightly-important', label: 'Slightly important' },
              { value: 'moderately-important', label: 'Moderately important' },
              { value: 'very-important', label: 'Very important' },
              { value: 'essential', label: 'Essential' },
            ]
          },
          {
            id: 'careerGrowth',
            question: 'How important are career growth opportunities to you?',
            options: [
              { value: 'not-important', label: 'Not important' },
              { value: 'slightly-important', label: 'Slightly important' },
              { value: 'moderately-important', label: 'Moderately important' },
              { value: 'very-important', label: 'Very important' },
              { value: 'essential', label: 'Essential' },
            ]
          },
          {
            id: 'location',
            question: 'How important is job location to you?',
            options: [
              { value: 'not-important', label: 'Not important' },
              { value: 'slightly-important', label: 'Slightly important' },
              { value: 'moderately-important', label: 'Moderately important' },
              { value: 'very-important', label: 'Very important' },
              { value: 'essential', label: 'Essential' },
            ]
          },
          {
            id: 'companySize',
            question: 'What size of company do you prefer to work for?',
            options: [
              { value: 'startup', label: 'Startup' },
              { value: 'small', label: 'Small business' },
              { value: 'medium', label: 'Medium-sized company' },
              { value: 'large', label: 'Large corporation' },
              { value: 'no-preference', label: 'No preference' },
            ]
          },
          {
            id: 'teamSize',
            question: 'What size of team do you prefer to work in?',
            options: [
              { value: 'individual', label: 'Individual work' },
              { value: 'small-team', label: 'Small team (2-5 people)' },
              { value: 'medium-team', label: 'Medium team (6-15 people)' },
              { value: 'large-team', label: 'Large team (15+ people)' },
              { value: 'no-preference', label: 'No preference' },
            ]
          },
          {
            id: 'industryPreference',
            question: 'Which industry would you prefer to work in?',
            options: [
              { value: 'technology', label: 'Technology' },
              { value: 'healthcare', label: 'Healthcare' },
              { value: 'finance', label: 'Finance' },
              { value: 'education', label: 'Education' },
              { value: 'multiple', label: 'Open to multiple industries' },
            ]
          },
          {
            id: 'remoteWork',
            question: 'How do you feel about remote work?',
            options: [
              { value: 'prefer-office', label: 'Prefer working in an office' },
              { value: 'mostly-office', label: 'Mostly office with some remote' },
              { value: 'hybrid', label: 'Prefer a hybrid approach' },
              { value: 'mostly-remote', label: 'Mostly remote with occasional office' },
              { value: 'fully-remote', label: 'Prefer fully remote' },
            ]
          }
        ];
      default:
        return [];
    }
  };

  // Get all questions for the assessment
  const questions = getQuestions();
  
  // Get the current question based on step
  const currentQuestion = questions[currentStep - 1];

  // Form submission handler
  const onSubmit = (values: AssessmentFormValues) => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      mutation.mutate(values);
    }
  };

  // Handle navigation to previous question
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{getDetails().title}</CardTitle>
        <CardDescription>{getDetails().description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{currentStep} of {totalSteps}</span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {currentQuestion && (
              <AssessmentItem
                key={currentQuestion.id}
                id={currentQuestion.id}
                question={currentQuestion.question}
                options={currentQuestion.options}
                control={form.control}
              />
            )}

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1 || mutation.isPending}
              >
                Previous
              </Button>
              <Button 
                type="submit"
                disabled={mutation.isPending}
              >
                {currentStep === totalSteps ? (mutation.isPending ? "Submitting..." : "Submit") : "Next"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-xs text-gray-500">
          Your answers help us provide personalized career recommendations.
        </p>
      </CardFooter>
    </Card>
  );
};

export default SkillAssessment;
