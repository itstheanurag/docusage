const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full border-b">    {/* full-width border */}
      <div className="container w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto border-l border-r">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Container;
