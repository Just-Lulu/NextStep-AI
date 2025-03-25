import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define the form schema
const profileFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  department: z.string().min(2, {
    message: "Department must be at least 2 characters.",
  }),
  level: z.string().min(1, {
    message: "Level is required.",
  }),
  skills: z.array(z.string()).min(1, {
    message: "Please select at least one skill.",
  }),
  interests: z.array(z.string()).min(1, {
    message: "Please select at least one interest.",
  }),
  academicBackground: z.object({
    courses: z.array(z.string()),
    projects: z.array(z.string()),
    achievements: z.array(z.string()),
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  userId: number;
  defaultValues?: Partial<ProfileFormValues>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ userId, defaultValues }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Initialize the form with default values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: defaultValues || {
      fullName: '',
      email: '',
      department: '',
      level: '',
      skills: [],
      interests: [],
      academicBackground: {
        courses: [],
        projects: [],
        achievements: [],
      },
    },
  });

  // Setup mutation for updating profile
  const mutation = useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      const response = await apiRequest('PUT', `/api/users/${userId}`, {
        ...values,
        profileComplete: true,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
        variant: "default",
      });
      // Invalidate the user query to refetch the updated data
      queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}`] });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error.message || "There was an error updating your profile.",
        variant: "destructive",
      });
    },
  });

  // Form submission handler
  const onSubmit = (values: ProfileFormValues) => {
    mutation.mutate(values);
  };

  // Sample skills for checkboxes
  const skillOptions = [
    { id: "programming", label: "Programming" },
    { id: "data-analysis", label: "Data Analysis" },
    { id: "web-development", label: "Web Development" },
    { id: "design", label: "Design" },
    { id: "project-management", label: "Project Management" },
    { id: "communication", label: "Communication" },
    { id: "leadership", label: "Leadership" },
    { id: "problem-solving", label: "Problem Solving" },
  ];

  // Sample interests for checkboxes
  const interestOptions = [
    { id: "technology", label: "Technology" },
    { id: "healthcare", label: "Healthcare" },
    { id: "finance", label: "Finance" },
    { id: "education", label: "Education" },
    { id: "business", label: "Business" },
    { id: "arts", label: "Arts" },
    { id: "science", label: "Science" },
    { id: "engineering", label: "Engineering" },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@adeleke.edu.ng" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 300 Level" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="skills"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Skills</FormLabel>
                    <FormDescription>
                      Select the skills you currently possess.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {skillOptions.map((skill) => (
                      <FormField
                        key={skill.id}
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                          <FormItem
                            key={skill.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(skill.id)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...field.value, skill.id]
                                    : field.value?.filter((value) => value !== skill.id);
                                  field.onChange(updatedValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {skill.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Interests</FormLabel>
                    <FormDescription>
                      Select the areas you're interested in.
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {interestOptions.map((interest) => (
                      <FormField
                        key={interest.id}
                        control={form.control}
                        name="interests"
                        render={({ field }) => (
                          <FormItem
                            key={interest.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(interest.id)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...field.value, interest.id]
                                    : field.value?.filter((value) => value !== interest.id);
                                  field.onChange(updatedValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {interest.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel className="text-base">Academic Background</FormLabel>

              <FormField
                control={form.control}
                name="academicBackground.courses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relevant Courses</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your relevant courses, separated by commas"
                        className="min-h-[100px]"
                        onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))}
                        value={field.value.join(', ')}
                      />
                    </FormControl>
                    <FormDescription>
                      Example: Data Structures, Algorithms, Database Management
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="academicBackground.projects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Academic Projects</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your academic projects, separated by commas"
                        className="min-h-[100px]"
                        onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))}
                        value={field.value.join(', ')}
                      />
                    </FormControl>
                    <FormDescription>
                      Example: Web Development Portfolio, Data Analysis Project
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="academicBackground.achievements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Academic Achievements</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your academic achievements, separated by commas"
                        className="min-h-[100px]"
                        onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))}
                        value={field.value.join(', ')}
                      />
                    </FormControl>
                    <FormDescription>
                      Example: Dean's List, Hackathon Winner, Academic Scholarship
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full md:w-auto"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
