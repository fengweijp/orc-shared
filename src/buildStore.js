import { createStore, applyMiddleware, compose } from "redux";
import { apiMiddleware } from "redux-api-middleware";
import Immutable from "immutable";
import { immutableRouterForBrowser } from "redux-little-router/lib/immutable";
import { combineReducers } from "redux-immutable";
import addLocales from "./addLocales";
import localeFactory from "./reducers/localeFactory";
import viewReducer from "./reducers/view";

export let buildReducer;

const buildStore = (routes, reducers) => {
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const {
		reducer: routeReducer,
		middleware: routeMiddleware,
		enhancer: routeEnhancer,
	} = immutableRouterForBrowser({
		routes,
	});

	const supportedLocales = SUPPORTED_LOCALES || ["en"];
	// Set supported languages
	const supportedLanguageTags = supportedLocales // Only the initial language tag
		.map(locale => locale.replace(/-\w+/g, ""))
		.filter((item, index, langs) => langs.indexOf(item) === index);
	addLocales(...supportedLanguageTags);
	const localeReducer = localeFactory(supportedLocales);

	buildReducer = reducers =>
		combineReducers({
			...reducers,
			locale: localeReducer,
			router: routeReducer,
			view: viewReducer,
		});
	const rootReducer = buildReducer(reducers);

	const middleware = [routeMiddleware, apiMiddleware];

	const initialState = Immutable.Map();
	const store = createStore(
		rootReducer,
		initialState,
		composeEnhancers(routeEnhancer, applyMiddleware(...middleware)),
	);

	return store;
};

export default buildStore;
