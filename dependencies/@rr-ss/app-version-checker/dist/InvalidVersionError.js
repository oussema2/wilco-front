export default class InvalidVersionError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidVersionError';
    }
    static forCurrentVersion() {
        return new InvalidVersionError('Current version is not valid.');
    }
    static forMinRecommendedVersion() {
        return new InvalidVersionError('Min recommended version is not valid.');
    }
    static forMinSupportedVersion() {
        return new InvalidVersionError('Min supported version is not valid.');
    }
}
