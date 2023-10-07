export default class InvalidVersionError extends Error {
    constructor(message: string);
    static forCurrentVersion(): InvalidVersionError;
    static forMinRecommendedVersion(): InvalidVersionError;
    static forMinSupportedVersion(): InvalidVersionError;
}
