import React from 'react';
import { Control } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Option {
  value: string;
  label: string;
}

interface AssessmentItemProps {
  id: string;
  question: string;
  options: Option[];
  control: Control<any>;
}

const AssessmentItem: React.FC<AssessmentItemProps> = ({
  id,
  question,
  options,
  control
}) => {
  return (
    <FormField
      control={control}
      name={id}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-base font-medium">{question}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="space-y-2"
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={option.value} id={`${id}-${option.value}`} />
                  <label
                    htmlFor={`${id}-${option.value}`}
                    className="flex flex-1 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AssessmentItem;
