import { useState, useEffect, useCallback, useContext, createContext } from "react";
import {
    Alert,
    AlertTitle,
    Grow,
    Stack,
    Slide,
    Snackbar
} from "@mui/material";
import { uuidv4 } from '@/lib/utils';


const TIMEOUT = 300;
const DURATION = 3000;

const SnackStackContext = createContext({
    toastsPack: [],
    setToasts: (toasts) => { },
    addToast: (toast) => { },
    removeToast: (key) => { }
});

export const useSnackStack = () => useContext(SnackStackContext);

export const SnackStackProvider = ({ children }) => {
    const [toastsPack, setToastsPack] = useState([]);

    const addToast = (toast) => {
        const key = toast.key || uuidv4();

        setToastsPack((currentToasts) => {
            const rest = currentToasts.length < 3 ? currentToasts : currentToasts.slice(0, -1);
            return [...rest, { ...toast, key }]
        });
    };

    const setToasts = (toasts) => {
        toasts.forEach(t => {
            t.key = t.key || uuidv4();
        })

        setToastsPack(toasts);
    }

    const removeToast = (key) => {
        setToastsPack((prev) => prev.filter((toast) => toast.key !== key));
    };

    return (
        <SnackStackContext.Provider value={{ toastsPack, setToasts, addToast, removeToast }}>
            {children}
            <SnackbarStack />
        </SnackStackContext.Provider>
    );
};

export const SnackbarToast = ({ toast }) => {
    const [open, setOpen] = useState(true);
    const { removeToast } = useSnackStack();

    const close = useCallback(() => {
        setOpen(false);
        setTimeout(() => {
            removeToast(toast.key);
        }, TIMEOUT);
    }, [toast.key, removeToast]);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        if (toast?.onClose) toast.onClose();
        
        close();
    };

    useEffect(() => {
        if (toast.duration !== 0) {
            setTimeout(() => {
                close();
            }, toast.duration || DURATION);
        }
    }, [close, toast.duration]);

    return (
        <Grow in={open} timeout={TIMEOUT}>
            <Alert
                key={toast.key}
                severity={toast?.severity || "info"}
                onClose={handleClose}
                variant="filled"
                sx={{
                    minWidth: 280,
                    width: { xs: 1, md: "auto" },
                    mb: 1
                }}
            >
                {toast?.title && <AlertTitle>{toast.title}</AlertTitle>}
                {toast?.message}
                {toast?.children}
            </Alert>
        </Grow>
    );
};

//dummy transition, prevents console error
function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}

export const SnackbarStack = () => {
    const { toastsPack } = useSnackStack();
    const firstToast = toastsPack[0];

    return (
        <Snackbar
            TransitionComponent={TransitionRight} //dummy transition, prevents console error
            open={!!firstToast}
            autoHideDuration={null}
            transitionDuration={0}
            anchorOrigin={{
                vertical: firstToast?.position?.vertical || "top",
                horizontal: firstToast?.position?.horizontal || "right"
            }}
            // to change default top or bottom location
            // sx={{
            //     mt: "env(safe-area-inset-top)",
            //     mb: "env(safe-area-inset-bottom)"
            // }}
        >
            <Stack flexDirection="column" gap={1}>
                {toastsPack.map((toast) => (
                    <SnackbarToast key={toast.key} toast={toast} />
                ))}
            </Stack>
        </Snackbar>
    );
};
