import Navbar from "@/components/Navbar";
import Sidebar from "../../components/Sidebar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" h-full w-full flex flex-col">
      <Navbar />
      <div className="hidden md:flex mt-16  w-20 flex-col fixed inset-y-0">
        <Sidebar />
      </div>
      <main className="h-full pt-16 md:pl-20">{children}</main>
    </div>
  );
};

export default RootLayout;
