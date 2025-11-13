import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

export const ViewDetails = ({ details }) => {
    const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        {/* Modal content */}
      </Modal>

      <Button variant="default" onClick={open}>
        View Details
      </Button>
    </>
  );
}