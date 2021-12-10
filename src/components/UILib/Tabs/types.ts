import React from 'react';

export interface TabOption {
  id: number;
  label: React.ReactNode;
  content?: React.ReactNode;
  disabled?: boolean;
}
