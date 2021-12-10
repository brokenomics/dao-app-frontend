export interface AccordionProps {
  header: string;
  isOpen?: boolean;
  className?: string;
}

export interface AccordionBaseProps extends AccordionProps {
  bodyClassName?: string;
  arrowClassName?: string;
  headerClassName?: string;
  animated?: boolean;
  tabIndex?: number;
  animationDuration?: number;
}
