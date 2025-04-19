import Navbar from './_components/Navbar';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar></Navbar>
      {children}
    </>
  );
};
export default layout;
