export interface BaseDropdownProps {
  isOpen?: boolean;
}

export interface OptionProps {
  id?: string | number;
  label: string | number;
  value: string | number;
}

export type onChangeType = (option: OptionProps) => void;
