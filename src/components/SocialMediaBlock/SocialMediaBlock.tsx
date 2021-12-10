import React from 'react';
import cn from 'classnames';

import icons from 'icons';
import { Icon } from '../UILib/Icon';

import s from './SocialMediaBlock.module.scss';

export interface SocialMediaBlockProps {
  className?: string;
}

interface SocialLink {
  icon: keyof typeof icons;
  url: string;
}

const socialLinks: SocialLink[] = [
  { url: 'https://twitter.com/neworderDAO', icon: 'twitter' },
  { url: 'https://t.me/NewOrderAnnouncement', icon: 'telegram' },
  { url: 'https://discord.com/invite/TUaSK6RA9S', icon: 'discord' },
  {
    url: 'https://mirror.xyz/0x13c5432CfC12bA1f32B6090d1a09cf0Efe9C95Bd',
    icon: 'mirror',
  },
  {
    url: 'https://github.com/new-order-network',
    icon: 'github',
  },
];

const SocialMediaBlock: React.FC<SocialMediaBlockProps> = ({
  className,
}: SocialMediaBlockProps) => (
  <div className={cn(s.container, className)}>
    {socialLinks.map(({ icon, url }) => (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={s.mediaLink}
        key={icon}
      >
        <Icon name={icon} className={s.mediaImg} />
      </a>
    ))}
  </div>
);

export default SocialMediaBlock;
