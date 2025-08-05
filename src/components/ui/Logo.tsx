import React from 'react';
import { Image, ImageProps } from 'expo-image';
import { View, Text } from 'react-native';
import { cn } from '../../utils/classnames';

type LogoVariant = 'full' | 'shape' | 'text' | 'no-logomark' | 'fallback';

interface LogoProps extends Omit<ImageProps, 'source'> {
  variant?: LogoVariant;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const logoSources = {
  full: require('../../../assets/logos/Mzigoego Logo 1.png'),
  shape: require('../../../assets/logos/Mzigoego Logo Shape.png'),
  text: require('../../../assets/logos/Mzigoego Type Logo.png'),
  'no-logomark': require('../../../assets/logos/Mzigoego Logo No Logomark.png'),
};

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  className,
  ...props
}) => {
  const [imageError, setImageError] = React.useState(false);

  // Fallback component for when logo files aren't available or fail to load
  if (variant === 'fallback' || imageError) {
    return (
      <View className={cn(
        'bg-primary-500 rounded-full items-center justify-center',
        sizeClasses[size],
        className
      )}>
        <Text className="text-white font-bold text-xl">M</Text>
      </View>
    );
  }

  return (
    <Image
      source={logoSources[variant]}
      className={cn(sizeClasses[size], className)}
      contentFit="contain"
      onError={() => setImageError(true)}
      {...props}
    />
  );
};
