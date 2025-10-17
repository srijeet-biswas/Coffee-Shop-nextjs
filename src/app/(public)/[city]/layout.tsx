import SubHeader from "@/src/components/layouts/SubHeader";
import React from "react";

export default function CityLayout({ children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <React.Fragment>
            <SubHeader />
            {children}
        </React.Fragment>
    );
}