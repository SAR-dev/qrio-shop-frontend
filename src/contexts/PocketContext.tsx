import {
    createContext,
    useContext,
    useCallback,
    useState,
    useEffect,
    useMemo,
    ReactNode,
} from "react";
import PocketBase from "pocketbase";
import { useInterval } from "usehooks-ts";
import { jwtDecode } from "jwt-decode";
import { Collections, TypedPocketBase, UsersResponse } from "../types/pocketbase-types";

interface DecodedToken {
    exp: number;
}

const oneMinInMs = 60000;

interface PocketContextType {
    pb: TypedPocketBase;
    refresh: number;
    incRefresh: () => void;
    login: ({ email, password, asAdmin }: { email: string; password: string, asAdmin?: boolean }) => Promise<void>;
    oAuthLogin: () => Promise<void>;
    logout: () => void;
    user: UsersResponse | null;
    token: string | null;
}

const PocketContext = createContext<PocketContextType | undefined>(undefined);

export const PocketProvider = ({ children }: { children: ReactNode }) => {
    const pb = useMemo(() => new PocketBase(import.meta.env.VITE_API_URL) as TypedPocketBase, []);
    const [refresh, setRefresh] = useState(1)
    const [token, setToken] = useState<string | null>(pb.authStore.token);
    const [user, setUser] = useState(pb.authStore.record as unknown as UsersResponse);

    useEffect(() => {
        console.log(user)
        if (!pb.authStore.isValid) logout()
    }, [])

    useEffect(() => {
        pb.authStore.onChange((newToken, model) => {
            setToken(newToken);
            setUser(model as unknown as UsersResponse);
        });
    }, [pb]);

    const incRefresh = () => setRefresh(refresh + 1)

    const login = useCallback(async ({ email, password }: { email: string; password: string }) => {
        await pb.collection(Collections.Users).authWithPassword(email, password);
    }, [pb]);

    const oAuthLogin = useCallback(async () => {
        await pb.collection(Collections.Users).authWithOAuth2({ provider: 'google' });
    }, [pb]);

    const logout = useCallback(() => {
        localStorage.clear()
        pb.authStore.clear();
    }, [pb]);

    const refreshSession = useCallback(async () => {
        if (!pb.authStore.isValid) return;
        const decoded = jwtDecode<DecodedToken>(token!);
        const tokenExpiration = decoded.exp ?? 0;
        const expirationWithBuffer = (tokenExpiration + 5 * oneMinInMs) / 1000;
        if (Date.now() / 1000 < expirationWithBuffer) {
            await pb.collection(Collections.Users).authRefresh();
        }
    }, [pb, token]);

    useInterval(refreshSession, token ? 2 * oneMinInMs : null);

    return (
        <PocketContext.Provider value={{
            pb,
            refresh,
            incRefresh,
            login,
            oAuthLogin,
            logout,
            user,
            token
        }}>
            {children}
        </PocketContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePocket = () => {
    const context = useContext(PocketContext);
    if (!context) throw new Error();
    return context;
};