import BottomNavbar from '../_components/layout/BottomNavbar';
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <BottomNavbar></BottomNavbar>
    </>
  );
};
export default layout;
