import { Button } from '@/components/ui/button';

interface Props {
  buttonText: string;
  className?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';
}

export function ButtonOutline({
  buttonText,
  className,
  variant = 'outline',
  size = 'default',
}: Props) {
  return (
    <Button variant={variant} size={size} className={className}>
      {buttonText}
    </Button>
  );
}
