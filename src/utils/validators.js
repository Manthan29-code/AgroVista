export const required = (v) => (!v ? 'Required' : '');
export const isNumber = (v) => (v === '' || isNaN(Number(v)) ? 'Must be a number' : '');
