import React, { useRef, useState } from 'react';
import { AlertDialog, Button, Center, NativeBaseProvider } from "native-base"

const Alerts = ({ title, text, btn1, btn2, func }) => {
    const [isOpen, setIsOpen] = useState(true)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef(null)

    return (
        <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <AlertDialog.Content>
                <AlertDialog.CloseButton />
                <AlertDialog.Header>
                    { /* Title */ }
                    { title }
                </AlertDialog.Header>
                <AlertDialog.Body>
                    { /* Text */ }
                    { text }
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group space={2}>
                        <Button
                            variant="unstyled"
                            colorScheme="coolGray"
                            onPress={onClose}
                            ref={cancelRef}
                        >
                            { btn1 }
                        </Button>
                        <Button colorScheme="danger" onPress={() => { func() }}>
                            { btn2 }
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    );
}
export default Alerts;