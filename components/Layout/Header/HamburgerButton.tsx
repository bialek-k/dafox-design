const HamburgerButton = ({ setOpenMobileMenu }) => {
  return (
    <button
      className="space-y-2 md:hidden"
      onClick={() => setOpenMobileMenu((prevState) => !prevState)}>
      <div className="w-8 h-0.5 bg-white"></div>
      <div className="w-8 h-0.5 bg-white"></div>
      <div className="w-8 h-0.5 bg-white"></div>
    </button>
  );
};

export default HamburgerButton;
