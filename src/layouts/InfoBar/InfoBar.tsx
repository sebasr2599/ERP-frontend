import React, { FC } from 'react';

interface InfoBarProps {
  children?: React.ReactNode;
  pageTitle: string;
}
// TODO: Fix responsive design, make it fold or row for sm
const InfoBar: FC<InfoBarProps> = ({ children, pageTitle }) => {
  return (
    <div className="p-8 flex justify-between">
      <h1 className="font-bold text-3xl">{pageTitle}</h1>
      {/* note, might remove w-1/3 */}
      <div className="flex flex-row  gap-4">{children}</div>
    </div>
  );
};

export default InfoBar;
