const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-200">
      {children}
    </div>
  );
};

export default AuthLayout;
