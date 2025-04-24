import Header from "./layouts/Header";
import "./assets/sass/app.scss";
import Footer from "./layouts/Footer";
import Main from "./layouts/Main";
import CheckOut from "./layouts/CheckOut";

function App() {
  return (
    <div>
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}
export default App;
