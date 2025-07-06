import FingerprintJS from "@fingerprintjs/fingerprintjs";

const STORAGE_KEY = "persistent_fingerprint";

const createFingerprint = async (): Promise<string> => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
};

export const useFingerprint = () => {
    const getFingerprint = async (): Promise<string> => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;

        const newId = await createFingerprint();
        localStorage.setItem(STORAGE_KEY, newId);
        return newId;
    };

    return { getFingerprint };
};
