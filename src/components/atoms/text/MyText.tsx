import React from 'react';
import { Text as MantineText } from '@mantine/core';

interface TextProps {
  content: string;
}

export const MyText: React.FC<TextProps> = ({ content }) => {
  return <MantineText>{content}</MantineText>;
};