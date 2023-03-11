export const PageTitle = () => {
  return (
    <section className="py-12 container mx-auto flex items-center flex-col gap-6 w-full text-justify px-6">
      <h1 className="text-center text-3xl font-bold">Custom Steering Wheels</h1>
      <p className="text-justify md:text-center text-sm md:text-base md:w-2/3  text-primary-dark dark:text-primary-darkMode tracking-wider">
        Upgrade your vehicle&apos;s interior with a custom steering wheel that
        reflects your personal style and enhances your driving experience. Our
        product list features a wide range of custom steering wheels designed to
        meet the <strong className="text-secondary">unique</strong> preferences
        of every driver. From classic leather-wrapped wheels to sleek carbon
        fiber designs, our collection offers something for{" "}
        <strong className="text-secondary">everyone.</strong>
      </p>
    </section>
  );
};
