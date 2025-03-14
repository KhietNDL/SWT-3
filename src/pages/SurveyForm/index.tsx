import Footer from "../../components/Footer"
import GAD7FormPage from "../../components/SurveyForm/GAD7Form"
import Header from "../../components/Header"

function GAD7Form() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <GAD7FormPage />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default GAD7Form;
