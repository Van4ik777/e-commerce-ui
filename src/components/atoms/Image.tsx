// Remove this file

import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width = '100px',
  height = '100px',
  style = {},
}) => {
  return <img src={src} alt={alt} style={{ width, height, ...style }} />;
};
