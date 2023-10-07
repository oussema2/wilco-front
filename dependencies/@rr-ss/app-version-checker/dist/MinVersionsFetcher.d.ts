interface MinVersionsFetcher {
    fetch(): Promise<void>;
    get minSupportedVersion(): string;
    get minRecommendedVersion(): string;
}
export default MinVersionsFetcher;
