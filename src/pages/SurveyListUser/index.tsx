import Header from "../../components/Header"
import Footer from "../../components/Footer"
import UserSurveyList from "../../components/SurveyListUser/UserSurveyList"


function SurveyListPage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <UserSurveyList />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default SurveyListPage;
