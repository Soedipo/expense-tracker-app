import { SideNav } from "../../components/SideNav";

export const Budget = () => {
  return (
    <>
      <div className="flex bg-zinc-900 min-h-screen">
        <SideNav />
        <div className="expense-tracker w-11/12 flex flex-col items-center gap-6 p-4 bg-zinc-700 min-h-screen text-white">
          <h1 className="text-3xl font-bold text-center mb-6 mt-6">Budget</h1>
        </div>
      </div>
    </>
  );
};
