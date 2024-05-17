import React, { FC } from "react";
import * as Styled from "./styled";
import { useTranslation } from "react-i18next";

import { FaGlobe } from "react-icons/fa6";

type LanguageSwitcherProps = {};

const LanguageSwitcher: FC<LanguageSwitcherProps> = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    console.log("Changing language to:", lng);
    i18n
      .changeLanguage(lng)
      .then(() => {
        console.log("Language changed successfully to:", lng);
      })
      .catch((error) => {
        console.error("Error changing language:", error);
      });
  };

  return (
    <Styled.Container>
      <Styled.GlobeIcon size={20} />
      {/* <button onClick={() => changeLanguage("pt")}>PORTUGUES</button>
      <button onClick={() => changeLanguage("en")}>ENGLISH</button> */}
    </Styled.Container>
  );
};

export default LanguageSwitcher;