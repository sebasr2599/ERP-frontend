import React, { FC } from 'react';

interface InfoBarProps {
  children?: React.ReactNode;
  pageTitle: string;
}
const InfoBar: FC<InfoBarProps> = ({ children, pageTitle }) => {
  return (
    <div className="md:p-8 flex flex-col md:flex-row md:justify-between">
      <h1 className="font-bold text-3xl">{pageTitle}</h1>
      {/* note, might remove w-1/3 */}
      <div className="flex flex-col md:flex-row  gap-4">{children}</div>
    </div>
  );
};

export default InfoBar;
