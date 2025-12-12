import Link from 'next/link';
import clsx from 'clsx';

export default function Button({
  href,
  children,
  color = 'primary',
  size = 'md',
  outline = false,
  className = '',
  ...props
}) {
  const styles = clsx(
    'btn',
    `btn-${color}`,
    size !== 'md' && `btn-${size}`,
    outline && 'btn-outline',
    className
  );

  return (
    <Link href={href} className={styles} {...props}>
      {children}
    </Link>
  );
}
