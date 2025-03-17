import Footer from "../../components/Footer"
"../../components/TakeSurvey/TakeSurvey"
import Header from "../../components/Header"
import TakeSurvey from "../../components/TakeSurvey/TakeSurvey";

function TakeSurveyPage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <TakeSurvey />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default TakeSurveyPage;
