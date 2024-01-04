export type NavigatorUAData = {
    brands: { brand: string; version: string }[];
    mobile: boolean;
    platform: string;
};

/**
 *  Gets current platform.
 *  @returns {string} platform name.
 */
export const getPlatform = (): string => {
    let uaData = (navigator as AnyObject).userAgentData as NavigatorUAData | undefined;

    if (uaData?.platform) {
        return uaData.platform;
    }

    return navigator.platform;
};

/**
 *  Gets current userAgent.
 *  @returns {string} userAgent name.
 */
export const getUserAgent = (): string => {
    let uaData = (navigator as AnyObject).userAgentData as NavigatorUAData | undefined;

    if (uaData && Array.isArray(uaData.brands)) {
        return uaData.brands.map(({ brand, version }) => `${brand}/${version}`).join(" ");
    }

    return navigator.userAgent;
};
