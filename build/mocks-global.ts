// global mock
const storageMock = () => {
	let storage = {};
	return {
		getItem: key => key in storage ? storage[key] : null,
		setItem: (key, value) => storage[key] = value || '',
		removeItem: key => delete storage[key],
		clear: () => storage = {},
	};
};

// localStorage
Object.defineProperty(global, 'localStorage', {
	value: storageMock()
});

Object.defineProperty(global, 'sessionStorage', {
	value: storageMock()
});
