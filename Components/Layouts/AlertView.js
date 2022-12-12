import React, { useEffect } from "react";
import {
  Stack,
  Alert,
  IconButton,
  HStack,
  VStack,
  CloseIcon,
  Text,
  Center,
} from "native-base";

const AlertView = ({status, title, close}) => {
  return (
    <Center>
      <Alert w="95%" status={status} mt="3" colorScheme={status} variant="top-accent">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" />
              <Text fontSize="sm" color="coolGray.600">
                {title}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Alert>
    </Center>
  );
};

export default AlertView;
