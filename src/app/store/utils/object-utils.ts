/* eslint-disable */
/***
 * File is very technical one and uses low-level tricks so all the linter messages are disabled.
 * It covered with unit tests instead.
 */
const nameIdxExtractor = /(\S+)\[(\d+)]/;

export function hasField(obj: unknown, path: string): boolean {
	const pathParts = (path || '').split('.');

	for (let i = 0; i < pathParts.length; i++) {
		const propName = pathParts[i];
		if (propName.indexOf('[') !== -1) {
			// array access, extract index and name
			const matcher = nameIdxExtractor.exec(propName);
			const arrayPropName = matcher?.[1];
			const idx = matcher?.[2];

			if (!obj || !obj[arrayPropName] || typeof obj[arrayPropName][idx] === 'undefined') {
				return false;
			}

			obj = obj[arrayPropName][idx];
		} else {
			// property name
			if (!obj || !obj.hasOwnProperty(propName)) {
				return false;
			}
			obj = obj[propName];
		}
	}
	return true;
}

function stringToPath(path: any): Array<string> {
	if (typeof path !== 'string') {
		return path;
	}
	const output = [];
	path.split('.').forEach(item => {
		item.split(/\[([^}]+)]/g).forEach(key => {
			if (key.length > 0) {
				output.push(key);
			}
		});
	});
	return output;
}

export function getNestedObject(obj: unknown, path: string, defaultValue?: unknown): unknown {
	const pathArray = stringToPath(path);
	let current = obj;

	// eslint-disable-next-line @typescript-eslint/prefer-for-of
	for (let i = 0; i < pathArray.length; i++) {
		// eslint-disable-next-line no-prototype-builtins
		if (!current.hasOwnProperty(pathArray[i])) {
			return defaultValue;
		}
		current = current[pathArray[i]];
	}
	return current;
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function setObjectField(obj: unknown, path: string, value: unknown): any {
	if (!path || typeof path !== 'string') {
		return obj;
	}
	const preKeys = path.split('.');
	const keys = [];
	for (let i = 0; i < preKeys.length; i++) {
		let prop = preKeys[i];
		while (prop && prop.slice(-1) === '\\' && preKeys[i + 1]) {
			prop = prop.slice(0, -1) + '.' + preKeys[++i];
		}
		keys.push(prop);
	}

	let currentStep = obj;
	let idx;
	let lastKeyIsArray;
	const keyLength = keys.length;
	let currentKey = keys[keyLength - 1];

	if (!obj || keyLength === 0) {
		return obj;
	}

	if (typeof obj !== 'object' || Array.isArray(obj)) {
		return obj;
	}

	for (let i = 0; i < keyLength; i++) {
		const key = keys[i];
		const isLastKey = i === keyLength - 1;
		idx = -1;
		lastKeyIsArray = false;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (key.indexOf('[') !== -1) {
			// index in array
			const match = /(\S+)\[(\d+)]/.exec(key);
			if (!match || match.length !== 3) {
				throw new Error(`Invalid array accessor "${key}"!`);
			}
			const keyName = match[1];
			idx = match[2];

			if (!currentStep.hasOwnProperty(keyName)) {
				throw new Error(`Field "${keyName}" is absent in object!`);
			}

			// dirty check against MobX observables
			if (!Array.isArray(currentStep[keyName]) && !currentStep[keyName].$mobx) {
				throw new Error(`Field "${keyName}" is not Array!`);
			}

			const shallowCopy = currentStep[keyName].slice();

			if (shallowCopy.length === 0 || idx >= shallowCopy.length || idx < 0) {
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				throw new Error(`Index is out of bounds: "${keyName}[${idx}]"!`);
			}

			if (!isLastKey) {
				currentStep = shallowCopy[idx];
			}
			currentKey = keyName;
			lastKeyIsArray = isLastKey;
		} else {
			if (!currentStep.hasOwnProperty(key)) {
				throw new Error(`Field "${key}" is absent in object!`);
			}
			if (!isLastKey) {
				currentStep = currentStep[key];
			}
			currentKey = key;
		}
	}

	if (lastKeyIsArray) {
		currentStep[currentKey][idx] = value;
	} else {
		currentStep[currentKey] = value;
	}
	return obj;
}
