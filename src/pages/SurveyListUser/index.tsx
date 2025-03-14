import Header from "../../components/Header"
import Footer from "../../components/Footer"
import AssessmentList from "../../components/SurveyListUser/AssessmentList"


function SurveyOption() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <AssessmentList />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default SurveyOption;
