import { SetStateAction } from 'react';

export interface TagInputProps {
  label: string;
  tags?: string[];
  setTags: React.Dispatch<SetStateAction<string[]>>;
}
