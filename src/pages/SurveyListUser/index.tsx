import Header from "../../components/header"
import Footer from "../../components/footer"
import AssessmentList from "../../components/SurveyListUser/AssessmentList"


function SurveyOption() {
    return (
        <div>
            <header><Header /></header>
            <main><AssessmentList /></main>
            <footer><Footer /></footer>
        </div>
    )
}

export default SurveyOption