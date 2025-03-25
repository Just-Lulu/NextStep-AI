import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '@/layouts/DashboardLayout';
import ProfileForm from '@/components/profile/ProfileForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { User } from '@shared/schema';

const Profile: React.FC = () => {
  // In a real application, we would get the current user ID from authentication
  // For now, we'll use a hardcoded ID
  const userId = 1;

  const { data: user, isLoading } = useQuery<User>({
    queryKey: [`/api/users/${userId}`],
  });

  return (
    <DashboardLayout title="My Profile" userName={isLoading || !user ? "Olivia Davis" : user.fullName}>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>
              Complete your profile to get more accurate career recommendations.
              The more information you provide, the better we can tailor our
              guidance to your specific needs and goals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-96 flex items-center justify-center">
                <p className="text-gray-500">Loading your profile...</p>
              </div>
            ) : (
              <ProfileForm 
                userId={userId} 
                defaultValues={user ? {
                  fullName: user.fullName,
                  email: user.email || '',
                  department: user.department || '',
                  level: user.level || '',
                  skills: user.skills || [],
                  interests: user.interests || [],
                  academicBackground: user.academicBackground || {
                    courses: [],
                    projects: [],
                    achievements: []
                  }
                } : undefined}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
