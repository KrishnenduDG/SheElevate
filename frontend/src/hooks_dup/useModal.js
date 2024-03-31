import { useState } from "react";

const useModal = () => {
  const [isOpen, setOpen] = useState(false);

  function toggleModal() {
    setOpen((state) => !state);
  }

  return {
    isOpen,
    toggleModal
  }
}

export default useModal