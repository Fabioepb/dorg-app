const MissingConnectionBanner = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full py-10 bg-container mt-5 rounded-lg border border-container-border w-full max-w-xl">
      <div className="flex flex-col items-center py-10 px-4 rounded-lg gap-2">
        <img src="/metamask.svg" alt="Metamask" className="w-30 h-30" />
        <p className="text-white text-center text-2xl">Connect your wallet to get started</p>
  
        <p className="text-slate-400 text-center text-md">Metamask is the recommended wallet to use for this dApp.</p>
  
        <p className="text-slate-400 text-center text-md italic text-xs opacity-50">I did not test it with other wallets, but it should work with most browser injected wallets.</p>
      </div>
    </div>
    );
  };

export default MissingConnectionBanner;