import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { NotFound } from "../components/NotFound/NotFound";

export default function Error404() {
  return (
    <>
      <Header />
      <NotFound />
      <Footer />
    </>
  );
}
