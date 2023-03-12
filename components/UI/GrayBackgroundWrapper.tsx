interface GrayBackgroundWrapper {
  children: React.ReactNode;
}

export const GrayBackgroundWrapper = ({ children }: GrayBackgroundWrapper) => {
  return <div className="bg-neutral-100 w-full my-6">{children}</div>;
};
