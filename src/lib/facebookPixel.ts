import ReactPixel from "react-facebook-pixel";

const PIXEL_ID = "25985735157727349";

export const initFacebookPixel = () => {
	ReactPixel.init(PIXEL_ID);
	ReactPixel.pageView();
};

export const trackPageView = () => {
	ReactPixel.pageView();
};

export const trackPurchase = (value: number, currency: string = "MYR") => {
	ReactPixel.track("Purchase", { value, currency });
};

export const trackLead = () => {
	ReactPixel.track("Lead");
};

export const trackCustomEvent = (
	eventName: string,
	data?: Record<string, any>,
) => {
	ReactPixel.trackCustom(eventName, data);
};

export default ReactPixel;
