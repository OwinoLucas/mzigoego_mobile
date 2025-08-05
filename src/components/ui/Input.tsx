import React, { forwardRef } from 'react';
import {
  TextInput,
  View,
  Text,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { cn } from '../../utils/classnames';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({ 
    label, 
    error, 
    leftIcon, 
    rightIcon, 
    onRightIconPress,
    className,
    ...props 
  }, ref) => {
    return (
      <View className="mb-4">
        {label && (
          <Text className="text-foreground font-medium mb-2 text-base">
            {label}
          </Text>
        )}
        <View className="relative">
          <TextInput
            ref={ref}
            className={cn(
              'input-field',
              'text-base',
              leftIcon ? 'pl-12' : 'pl-4',
              rightIcon ? 'pr-12' : 'pr-4',
              error ? 'border-red-500' : 'border-gray-300 focus:border-primary-500',
              className
            )}
            placeholderTextColor="#9CA3AF"
            {...props}
          />
          {leftIcon && (
            <View className="absolute left-3 top-1/2 -translate-y-1/2">
              {leftIcon}
            </View>
          )}
          {rightIcon && (
            <TouchableOpacity
              onPress={onRightIconPress}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              disabled={!onRightIconPress}
            >
              {rightIcon}
            </TouchableOpacity>
          )}
        </View>
        {error && (
          <Text className="text-red-500 text-sm mt-1">
            {error}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';
