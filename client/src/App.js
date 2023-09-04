import {Provider} from "react-redux";
import {store} from "./store";
import {Routes} from "./ui/Routes";
import {BrowserRouter as Router} from "react-router-dom";
import {SnackbarProvider} from "notistack";

export const App = () => {
    return <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
            <Router>
                <Routes/>
            </Router>
        </SnackbarProvider>
    </Provider>
}

