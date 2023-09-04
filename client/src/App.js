import {Provider} from "react-redux";
import {setupStore} from "./store";
import {Routes} from "./ui/Routes";
import {memo} from "react";
import {
    BrowserRouter as Router,
} from "react-router-dom";
import {SnackbarProvider} from "notistack";

export const App = memo(() => {
    const store = setupStore()
    return <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
            <Router>
                <Routes/>
            </Router>
        </SnackbarProvider>
    </Provider>
})

