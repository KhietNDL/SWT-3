import Footer from "../../components/footer"
import GAD7FormPage from "../../components/SurveyForm/GAD7Form"
import Header from "../../components/header"

function GAD7Form() {
    return (
        <div>
            <header><Header /></header>
            <main><GAD7FormPage /></main>
            <footer><Footer /></footer>
        </div>
    )
}

export default GAD7Form