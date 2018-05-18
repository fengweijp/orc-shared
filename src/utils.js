import Immutable from "immutable";

/* Gets values in the object without throwing errors.
   Returns undefined if not found. */
export const safeGet = (obj, step, ...path) =>
	typeof obj === "object" && typeof step === "string"
		? safeGet(obj[step], ...path)
		: obj;

const feedPropFunc = props => value =>
	typeof value === "function" ? value(props) : value;

/* Safely gets a (potentially nested) theme property, can run a function on the resulting value */
export const getThemeProp = (path, defaultValue, func = x => x) => props =>
	func(
		safeGet(props, "theme", ...path.map(feedPropFunc(props))) ||
			feedPropFunc(props)(defaultValue),
	);

/* Use in styled components to check if a prop has a truthy value and
   return values based on that. */
export const ifFlag = (name, thenVal, elseVal = "") => props =>
	props[name] ? feedPropFunc(props)(thenVal) : feedPropFunc(props)(elseVal);

/* Immutable values are unwrapped to JS objects/arrays.
   Non-immutable values are returned unchanged. */
export const unwrapImmutable = maybe =>
	Immutable.isImmutable(maybe) ? maybe.toJS() : maybe;

/* Logs a value and returns it, useful for debugging arrow
   functions without blocks. */
export const logPass =
	/* istanbul ignore next */
	x => {
		console.log(x);
		return x;
	};

export let normalizeForSearch;
/* istanbul ignore else */
if ("".normalize) {
	normalizeForSearch = str =>
		str
			.toLowerCase()
			// Strip accents by normalizing to letters + combining chars, then strip all combining chars.
			.normalize("NFKD")
			.replace(
				/[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f]/g,
				"",
			);
} else {
	// IE11 does not support string#normalize(). V. sad for IE users.
	normalizeForSearch = str => str.toLowerCase();
}