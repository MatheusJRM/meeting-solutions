import { useCallback, useState } from "react";

export const useWarningModal = () => {
  const [warningModalIsVisible, setWarningModalIsVisible] = useState(false);

  const handleShowModal = useCallback(
    () => setWarningModalIsVisible(true),
    [warningModalIsVisible]
  );

  const handleCloseModal = useCallback(
    () => setWarningModalIsVisible(false),
    [warningModalIsVisible]
  );

  return { warningModalIsVisible, handleShowModal, handleCloseModal };
};
