import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

const Button = ({
  href,
  children,
  color = 'primary',
  size = 'md',
  outline = false,
  className = '',
  onClick,
  ...props
}) => {
  const styles = clsx(
    'btn',
    `btn-${color}`,
    size !== 'md' && `btn-${size}`,
    outline && 'btn-outline',
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
