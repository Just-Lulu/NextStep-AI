import React from 'react';

// This component provides a wrapper around Remix icons to use them in the application
// It ensures consistent styling and allows for easier icon management

interface IconProps {
  name: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  xs: 'text-sm',
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
  xl: 'text-2xl',
};

export const Icon: React.FC<IconProps> = ({ name, className = '', size = 'md' }) => {
  const sizeClass = sizeMap[size] || sizeMap.md;
  return (
    <i className={`ri-${name} ${sizeClass} ${className}`}></i>
  );
};

// Shorthand wrappers for commonly used icons
export const DashboardIcon = (props: Omit<IconProps, 'name'>) => <Icon name="dashboard-line" {...props} />;
export const UserIcon = (props: Omit<IconProps, 'name'>) => <Icon name="user-line" {...props} />;
export const ChartIcon = (props: Omit<IconProps, 'name'>) => <Icon name="bar-chart-line" {...props} />;
export const BriefcaseIcon = (props: Omit<IconProps, 'name'>) => <Icon name="briefcase-line" {...props} />;
export const GraduationCapIcon = (props: Omit<IconProps, 'name'>) => <Icon name="graduation-cap-line" {...props} />;
export const MessageIcon = (props: Omit<IconProps, 'name'>) => <Icon name="message-2-line" {...props} />;
export const BookIcon = (props: Omit<IconProps, 'name'>) => <Icon name="book-open-line" {...props} />;
export const QuestionIcon = (props: Omit<IconProps, 'name'>) => <Icon name="question-line" {...props} />;
export const SettingsIcon = (props: Omit<IconProps, 'name'>) => <Icon name="settings-4-line" {...props} />;
export const LogoutIcon = (props: Omit<IconProps, 'name'>) => <Icon name="logout-box-line" {...props} />;
export const MenuIcon = (props: Omit<IconProps, 'name'>) => <Icon name="menu-line" {...props} />;
export const NotificationIcon = (props: Omit<IconProps, 'name'>) => <Icon name="notification-3-line" {...props} />;
export const SearchIcon = (props: Omit<IconProps, 'name'>) => <Icon name="search-line" {...props} />;
export const ArrowRightIcon = (props: Omit<IconProps, 'name'>) => <Icon name="arrow-right-line" {...props} />;
export const ArrowDownIcon = (props: Omit<IconProps, 'name'>) => <Icon name="arrow-down-s-line" {...props} />;
export const PresentationIcon = (props: Omit<IconProps, 'name'>) => <Icon name="presentation-line" {...props} />;
export const FileListIcon = (props: Omit<IconProps, 'name'>) => <Icon name="file-list-3-line" {...props} />;
export const UserHeartIcon = (props: Omit<IconProps, 'name'>) => <Icon name="user-heart-line" {...props} />;
export const SurveyIcon = (props: Omit<IconProps, 'name'>) => <Icon name="survey-line" {...props} />;
export const ProfileIcon = (props: Omit<IconProps, 'name'>) => <Icon name="profile-line" {...props} />;
export const BookmarksIcon = (props: Omit<IconProps, 'name'>) => <Icon name="book-2-line" {...props} />;
export const LineChartIcon = (props: Omit<IconProps, 'name'>) => <Icon name="line-chart-line" {...props} />;
export const DatabaseIcon = (props: Omit<IconProps, 'name'>) => <Icon name="database-2-line" {...props} />;
export const RoadMapIcon = (props: Omit<IconProps, 'name'>) => <Icon name="road-map-line" {...props} />;
