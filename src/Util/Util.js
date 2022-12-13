export const convertInternationalPhoneNumber = (hpNo) =>
	'+82-' + hpNo.slice(1, 3) + '-' + hpNo.slice(3, 7) + '-' + hpNo.slice(7);

export const axiosErrorHandler = (error) => alert(error.response.data.message);
