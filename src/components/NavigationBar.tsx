import MetamaskButton from "./MetamaskButton";

const NavigationBar = () => {
  return (
    <div className="py-2 px-2 bg-background roboto-regular shadow-xl sticky top-0 z-50 border-b border-accent">
      <div className="flex flex-col md:flex-row mx-auto container justify-between items-center drop-shadow-current">
        <p className="text-white text-2xl">dOrg</p>
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <MetamaskButton />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
