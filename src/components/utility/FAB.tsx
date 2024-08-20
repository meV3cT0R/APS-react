import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

export const FAB : React.FC<{ style: string, icon: IconDefinition, to: string }> = ({ style, icon, to }) => {
    const navigate = useNavigate();
    return (
        <>
            <button
                className={`fixed rounded-[50%] bg-primary text-2xl shadow-xl w-[50px] h-[50px] text-white text-center ${style}`}
                onClick={() => navigate(to)}
            >
                <FontAwesomeIcon icon={icon} />
            </button>
        </>
    )
}

