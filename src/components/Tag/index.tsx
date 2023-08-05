import React from 'react';
import localStyles from './tag.less';

interface ITagProps {
  value: string,
}

export const Tag = ({ value } : ITagProps) => (
  <span className={localStyles.base}>
    #{value}
  </span>
);