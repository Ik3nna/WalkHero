import React from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { IconProps } from '../../types';

const getIconFont = (type: any) => {
  switch (type) {
    case "ionicons":
      return Ionicons;
    case "fa":
      return FontAwesome;
    default:
      return FontAwesome;
  }
};

const Icon = ({type, ...props}: IconProps) => {
  const FontICon = getIconFont(type);

  return <FontICon {...props} />;
};

export default Icon;