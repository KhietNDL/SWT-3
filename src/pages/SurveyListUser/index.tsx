<<<<<<< HEAD:src/pages/SurveyListUser/index.tsx
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import AssessmentList from "../../components/SurveyListUser/AssessmentList"

=======
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AssessmentList from "../../components/AssessmentList/AssessmentList";
>>>>>>> develop:src/pages/AssessmentList/index.tsx

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
