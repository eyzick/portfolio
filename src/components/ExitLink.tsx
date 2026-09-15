import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { useExperience } from '../context/useExperience';

interface ExitLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
}

const ExitLink = ({ href, onClick, ...props }: ExitLinkProps) => {
  const { beginExit } = useExperience();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    beginExit(href);
  };

  return <a {...props} href={href} onClick={handleClick} />;
};

export default ExitLink;
