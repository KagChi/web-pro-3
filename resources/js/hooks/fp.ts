import FingerprintJS from "@fingerprintjs/fingerprintjs";

const getFingerprint = async (): Promise<string | null> => {
    try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        return result.visitorId;
    } catch {
        return null;
    }
};

export const useFingerprint = (): { getFingerprint(): Promise<string | null>; } => ({ getFingerprint });
