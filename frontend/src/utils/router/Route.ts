import type React from "react";

export type Route = {
    path: string
    page: () => React.JSX.Element
};