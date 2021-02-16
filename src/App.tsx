import Menu from './components/Menu';
import Page from './pages/Page';
import FirstPage from './pages/FirstPage';
import React, {useState} from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Router } from 'react-router-dom';
import { personCircle, search, refresh, helpCircle, star, create, ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import { IonButtons, IonButton, IonIcon, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import {  NavLink } from 'react-router-dom';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const [state, setstate] = useState({
		name: '',
		score: 0,
  })
	const stateHandler = (newstate: any) => {
		setstate((state) => {
			return {
				...state,
				...newstate,
			}
    })
  }  

	const restart = () => {
		setstate((state) => {
			return {
				...state,
				name: '',
				score: 0,
			}
    })
	}
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonRouterOutlet id="main">
          <IonPage>
              <IonHeader>
                <IonToolbar>    
                  {state.name ? 
                  <IonButtons slot="primary">
                  <NavLink to="/page/landing">
      <IonButton onClick={restart}>
        <IonIcon slot="icon-only" icon={refresh} />
                      </IonButton>
                      </NavLink>
    </IonButtons>
                  : null}
                  
    <IonTitle>Truexam</IonTitle>
  </IonToolbar>
      </IonHeader>
              <IonContent fullscreen>

      <Route path="/quiz" component={() => <Page name={state.name} handler={stateHandler}  />} exact />
          <Route path="/page/landing" component={() => <FirstPage setName={stateHandler} />} exact />
          <Redirect from="/" to="/page/landing" exact />
      </IonContent>
    </IonPage>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
