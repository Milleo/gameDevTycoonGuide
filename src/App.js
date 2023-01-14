import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import PlatformsSection from "./components/PlatformsSection";
import TopicsSection from "./components/TopicsSection";
import BestMatchesSection from "./components/BestMatchesSection";
import LanguageSelector from "./components/LanguageSelector";
import { lightTheme, darkTheme } from "./theme";
import { useEffect, useState } from 'react';
import { GlobalStyles } from './global';
import { ThemeProvider } from 'styled-components';
import { IntlProvider } from 'react-intl';
import { enMessages, ptBrMessages } from "./i18n";

function App() {
  const [ theme, setTheme ] = useState("light");
  const [ lang, setLang ] = useState("en");
  const [ messages, setMessages ] = useState(enMessages);
  
  useEffect(() => {
    if(localStorage.getItem("lang") == undefined){
      const browserLanguage = (navigator.language || navigator.userLanguage).toLowerCase()
      setLang(browserLanguage);
      if(browserLanguage != "pt-br"){
        setMessages(enMessages);
      }else{
        setMessages(ptBrMessages);
      }
    }else{
      setLang(localStorage.getItem("lang"));
    }
    setTheme(localStorage.getItem("theme"));
  }, []);

  const toggleDarkTheme = () => {
    const usedTheme = theme=="light"?"dark":"light";
    setTheme(usedTheme);
    localStorage.setItem("theme", usedTheme);
  }

  const changeLang = (_, el) => {
    setLang(el.target.dataset.country);
    localStorage.setItem("lang", el.target.dataset.country);
    if(el.target.dataset.country != "pt-br"){
      setMessages(enMessages);
    }else{
      setMessages(ptBrMessages);
    }
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <IntlProvider defaultLocale='en' locale={lang} messages={messages}>
        <GlobalStyles />
        <div className="App p-3">
          <Row className="d-flex mb-4">
            <Col md="11"><h2>Game Dev Tycoon Guide</h2></Col>
            <Col md="1" className='d-flex'>
              <Form.Check defaultChecked={theme !== "light"} type="switch" onClick={ toggleDarkTheme } />
              <LanguageSelector selectedLanguage={lang} onChangeLang={ changeLang } />
            </Col>
          </Row>
          <Tabs defaultacitvekey="best">
            <Tab eventKey="best" title="Find best matches">
              <BestMatchesSection />
            </Tab>
            <Tab eventKey="topics" title="Topics">
              <TopicsSection />
            </Tab>
            <Tab eventKey="platforms" title="Platforms">
              <PlatformsSection />
            </Tab>
            
          </Tabs>
        </div>
      </IntlProvider>
    </ThemeProvider>
  );
}

export default App;