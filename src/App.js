import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row } from 'react-bootstrap';
import MainSection from "./components/MainSection";
import LanguageSelector from "./components/LanguageSelector";
import { lightTheme, darkTheme } from "./theme";
import { useEffect, useMemo, useState } from 'react';
import { GlobalStyles } from './global';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { enMessages, ptBrMessages } from "./i18n";

function App() {
  const languages = useMemo(() => {
    return {
      "en": enMessages,
      "pt-br": ptBrMessages
    }
  }, []);
  const DEFAULT_LANGUAGE = "en";
  const [ theme, setTheme ] = useState("light");
  const [ lang, setLang ] = useState(DEFAULT_LANGUAGE);
  const [ messages, setMessages ] = useState(enMessages);
  
  
  useEffect(() => {
    /** Setting application language */
    if(localStorage.getItem("lang") === undefined){
      const browserLanguage = (navigator.language || navigator.userLanguage).toLowerCase()

      if(Object.keys(languages).indexOf(browserLanguage) === -1){
        setLang(DEFAULT_LANGUAGE);
        setMessages(languages[DEFAULT_LANGUAGE])
      }else{
        setLang(browserLanguage);
        setMessages(languages[browserLanguage]);
      }
    }else{
      setLang(localStorage.getItem("lang"));
      setMessages(languages[localStorage.getItem("lang")]);
    }

    /* Setting theme of application if saved in localStorage */
    if(localStorage.getItem("theme") !== undefined){
      setTheme(localStorage.getItem("theme"));
    }
  }, [languages]);

  const toggleDarkTheme = () => {
    const usedTheme = theme==="light"?"dark":"light";
    setTheme(usedTheme);
    localStorage.setItem("theme", usedTheme);
  }

  const changeLang = (_, el) => {
    const value = el.target.dataset.country;
    setLang(value);
    localStorage.setItem("lang", value);
    setMessages(languages[value]);
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <IntlProvider defaultLocale={DEFAULT_LANGUAGE} locale={lang} messages={messages}>
        <GlobalStyles />
        <div className="App p-3">
          <Row className="d-flex mb-4">
            <Col md="11"><h2>Game Dev Tycoon Guide</h2></Col>
            <Col md="1" className='d-flex'>
              <Form.Check defaultChecked={theme !== "light"} type="switch" onClick={ toggleDarkTheme } />
              <LanguageSelector selectedLanguage={lang} onChangeLang={ changeLang } />
            </Col>
          </Row>
          <MainSection />
        </div>
        <footer>
            <p>Game Dev Tycoon Guide - 2023 - Version 0.3<br />
            Created by <a href="//github.com/milleo" rel="noreferrer" target="_blank">Rafael Milléo</a><br />
            Colaborate with this project on <a href="//github.com/Milleo/gameDevTycoonGuide" rel="noreferrer" target="_blank">Github</a></p>
        </footer>
      </IntlProvider>
    </ThemeProvider>
  );
}

export default App;