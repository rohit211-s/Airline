import CustomNavbar from "../CustomNavbar/CustomNavbar";

const PageTemplate = (props) => {
  return (
    <>
      <CustomNavbar /> {props.children}
    </>
  );
};
export default PageTemplate;
