import { Button, Dialog, DialogPanel } from "@headlessui/react";

export default function MyModal({ dialogBtn, isOpen, setIsOpen, children }) {
  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>{dialogBtn}</Button>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setIsOpen(!isOpen)}
      >
        <div className="fixed inset-0 z-20 w-screen overflow-y-auto px-5">
          <div className="flex min-h-full items-center justify-center p-5 shadow">
            <DialogPanel
              transition
              className="w-full max-w-md rounded bg-white p-5 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {isOpen && (
        <p className="bg-black opacity-5 fixed -top-5 bottom-0 right-0 left-0 z-10 transition duration-300"></p>
      )}
    </>
  );
}
