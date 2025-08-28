import Footer from "./footer";
import Header from "./header";
import Main from "./main";
import "./layoutDefault.scss";

const layoutDefault = () => {
  return (
    <>
      <div className="layout">
        <Header/>
        <Main/>
        <Footer/>
      </div>
    </>
  )
}

export default layoutDefault;